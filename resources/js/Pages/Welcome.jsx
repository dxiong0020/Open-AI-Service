import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head title="Welcome" />

            {/* Navbar */}
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    AI CHAT SERVICE
                </h1>

                <div className="space-x-4">
                    <Link
                        href={route('login')}
                        className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        Login
                    </Link>

                    <Link
                        href={route('register')}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700"
                    >
                        Register
                    </Link>
                </div>
            </div>

            {/* Hero Section (matches your dashboard tone) */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <div className="mb-10 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-2xl p-10 shadow-sm">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Welcome to Your AI Workspace
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Chat with AI, analyze data, and manage your subscription—all in one powerful platform.
                        </p>

                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                            >
                                Get Started
                            </Link>

                            <Link
                                href={route('login')}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Feature Preview (same cards style as dashboard) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Chat Preview */}
                        <div className="opacity-75 grayscale-[0.5] bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-2xl p-8">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                AI Chat Bot
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Ask questions, get coding help, and explore ideas.
                            </p>
                        </div>

                        {/* Analytics Preview */}
                        <div className="opacity-75 grayscale-[0.5] bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-2xl p-8">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Analytics
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Track usage, costs, and performance insights.
                            </p>
                        </div>

                        {/* Subscription Preview */}
                        <div className="opacity-75 grayscale-[0.5] bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 rounded-2xl p-8">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Subscription
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage your plan and unlock premium features.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
