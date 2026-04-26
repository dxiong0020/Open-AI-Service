import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium mb-4">Welcome, {auth.user.name}!</h3>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 dark:bg-gray-700/50 dark:border-gray-700">
                                <h4 className="font-semibold mb-2">Subscription Overview</h4>
                                {auth.user.subscription ? (
                                    <p>Active Plan: <span className="font-bold">{auth.user.subscription.plan_type?.name}</span></p>
                                ) : (
                                    <p className="text-gray-500 italic dark:text-gray-400">No active subscription found. Head to the Subscription page to get started.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
