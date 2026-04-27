<?php

use App\Http\Controllers\AnalyticController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenAIController;

Route::middleware(['auth', 'subscribed'])->group(function () {
    Route::prefix('api')->group(function () {
        Route::post('/chatSend', [OpenAIController::class, 'chatSend'])->name('chatbot.chatSend');
        Route::post('/removeChat', [OpenAIController::class, 'removeChat'])->name('chat.remove');
        Route::post('/openAiUsage', [AnalyticController::class, 'openAiUsage'])->name('analytic.openAiUsage');
        Route::post('/monthlyCostUsage', [AnalyticController::class, 'monthlyCostUsage'])->name('analytic.monthlyCost');
    });
});
