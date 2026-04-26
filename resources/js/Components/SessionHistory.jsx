import React from "react";
import { router } from "@inertiajs/react";

export default function SessionHistory({ sessions = [], sessionId = null, onRemove }) {

    function displaySessions() {
        return sessions.map((session) => (
                        <li
                            key={session.id}
                            className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                                sessionId === session.id
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            <span
                                onClick={() =>
                                    router.visit(`/chat-bot/${session.id}`)
                                }
                                className="flex-1 truncate pr-4"
                            >
                                {session.message}
                            </span>
                            <button
                                onClick={() => onRemove(session.id)}
                                className="bg-red-300 hover:bg-red-700 text-white font-bold py-0.5 px-3 rounded ml-2"
                            >
                                -
                            </button>
                        </li>
                    ))
    }

    return (
        <div className="w-64 border bg-gray-100 flex flex-col rounded-lg mr-4 dark:bg-gray-800 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 font-semibold text-gray-700 border-b flex items-center justify-center dark:text-gray-300 dark:border-gray-700">
                Chat History
            </div>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                    {displaySessions()}
                </ul>
            </div>

            {/* New Chat */}
            <div className="p-4 border-t dark:border-gray-700">
                <button
                    onClick={() => router.visit('/chat-bot')}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                    + New Chat
                </button>
            </div>
        </div>
    );
}
