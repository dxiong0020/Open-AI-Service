import ChatBot from "@/Components/ChatBot";
import SessionHistory from "@/Components/SessionHistory";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";

export default function Chat({ msgs, chatId, chats }) {
    const [sessionId, setSessionId] = useState(chatId);
    const [sessions, setSessions] = useState(chats);

    function handleNewSession() {
        setSessionId(null);
        msgs = [];
    }

    async function handleRemoveSession(id) {
        try {
        const response = await fetch("/chat-bot/api/removeChat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({ chatId: id, chatHistory: sessions }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSessions(data.chatHistory); 
    } catch (error) {
        console.log('error: ', error);
    }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Chat
                </h2>
            }
        >
            <Head title="Chat" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex h-screen resize overflow-auto max-h-[700px] overflow-y-auto">
                                <SessionHistory
                                    sessions={sessions}
                                    sessionId={sessionId}
                                    onNew={handleNewSession}
                                    onRemove={handleRemoveSession}
                                />
                                <ChatBot
                                    msgs={msgs}
                                    sessionId={sessionId}
                                    setSessionId={setSessionId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
