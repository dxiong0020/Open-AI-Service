import ChatBot from "@/Components/ChatBot";
import SessionHistory from "@/Components/SessionHistory";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { fetchData } from "@/Helpers/fetch";

export default function Chat({ msgs, chatId, chats }) {
    const [sessionId, setSessionId] = useState(chatId);
    const [sessions, setSessions] = useState(chats);

    async function handleRemoveSession(id) {
        const data = await fetchData("/api/removeChat", "POST", {
            chatId: id,
            chatHistory: sessions,
        });

        if (Array.isArray(data.chatHistory)) {
            setSessions(data.chatHistory);
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Chat
                </h2>
            }
        >
            <Head title="Chat" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700">
                        <div className="p-0 text-gray-900 dark:text-gray-100">
                            <div className="flex h-[700px] overflow-hidden">
                                <SessionHistory
                                    sessions={sessions}
                                    sessionId={sessionId}
                                    onRemove={handleRemoveSession}
                                />
                                <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0 bg-white dark:bg-gray-900/20">
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
            </div>
        </AuthenticatedLayout>
    );
}
