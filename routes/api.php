<?php

use App\Http\Controllers\GraphController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenAIController;

Route::middleware('auth')->group(function () {
    Route::prefix('api')->group(function () {
        Route::post('/chatSend', [OpenAIController::class, 'chatSend'])->name('chatbot.chatSend');
        Route::post('/removeChat', [OpenAIController::class, 'removeChat'])->name('chat.remove');
        Route::post('/openAiUsage', [GraphController::class, 'openAiUsage'])->name('graph.openAiUsage');
        Route::post('/monthlyCostUsage', [GraphController::class, 'monthlyCostUsage'])->name('graph.monthlyCost');
    });
});