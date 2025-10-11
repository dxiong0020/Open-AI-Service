<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Chat;
use App\Models\User;
use Prism\Prism\Prism;
use App\Models\Message;
use Illuminate\Http\Request;
use Prism\Prism\Enums\Provider;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OpenAIController extends Controller
{
    public function chat($id = null)
    {
        $messages = [];
        $user = User::find(Auth::id());
        $chat = $user->chats->where('id', $id)->first();
        if ($id !== null && !$chat) {
            return redirect()->route('chatbot.index');
        }
        if ($chat) {
            $messages = isset($chat) ? $chat->messages()->select('id', 'role', 'message')
                ->orderBy('created_at', 'asc')
                ->limit(10)->get()->toArray() : [];  
        }
        $chats = $user->chats()->orderBy('created_at', 'desc')->select('id')->where('id', '!=', $id)->limit(14)->get();
        
        $chatHistory = [];
        foreach ($chats as $chat) {
            $message = $chat->messages()->first();
            if ($message !== null && $message->message !== '') {
                $chatHistory[] = ['id' => $chat->id, 'message' => $message->message ?? ''];
            }
        }

        return Inertia::render('Chat', [
            'msgs' => $messages,
            'chatId' => $id ?? '',
            'chats' => $chatHistory,
        ]);
    }

    public function chatSend(Request $request)
    {
        try {
            $user = User::find(Auth::id());
            $chatId = $request->chatId;
            if (!$chatId) {
                $chatId = $user->createChat()->id;
            }
            // save the user message
            $userMsg = $this->createMessage($chatId, 'user', $request->message);
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.5-flash')
                ->withPrompt($request->message)
                ->asText();    
            // save bot message
            $botMsg = $this->createMessage($chatId, 'bot', $response->text);
            $response = ['result' => 'success', 'chatId' => $chatId, 'user' => ['message_id' => $userMsg->id, 'message' => $userMsg->message], 'bot' => ['message_id' => $botMsg->id, 'message' => $botMsg->message]];
        } catch (Exception $ex) {
            Log::error($ex);
            $response = ['result' => 'failed', 'error_message' => 'sorry, we were not able to get a response'];
        }
        return response()->json($response, 200);
    }

    function getLatestGeminiModel($apiKey) {
            $modelResponse = Http::get(env('GEMINI_URL'), [
                'key' => env('GEMINI_API_KEY'),
            ])->throw();
            $models = $modelResponse->json();
            return $models[0];
    }

    public function createMessage($chatId, $role, $message): Message
    {
        return Message::create([
            'chat_id' => $chatId,
            'role' => $role, 
            'message' => $message
        ]);
    }

    public function removeChat(Request $request)
    {
        try {
            $chat = Chat::find($request->chatId);
            $deleted = $chat->delete();
            $chatHistory = $request->chatHistory ?? [];
            if ($deleted) {
                $chatHistory = array_filter($chatHistory, function ($chat) use ($request) {
                    return $chat['id'] !== $request->chatId;
                });
            }
        } catch (\Exception $ex) {
            Log::error($ex);
            return response()->json(['deleted' => false], 500);
        }
        return response()->json(['deleted' => $deleted, 'chatHistory' => $chatHistory], 200);
    }
}