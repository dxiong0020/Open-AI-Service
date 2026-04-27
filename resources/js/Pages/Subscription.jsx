import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function Subscription({ subscription, card, plans, flash }) {
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (flash?.error) {
            setErrorMessage(flash.error);
            const timer = setTimeout(() => setErrorMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        plan_id: subscription?.plan_type_id || '',
        card_number: card?.card_number || '',
        expiry: card ? `${card.expiry_month}/${card.expiry_year.toString().slice(-2)}` : '',
        cvc: card?.cvc || '',
        cardholder_name: card?.card_holder_name || '',
        card_brand: card?.card_brand || '',
    });

    const formatCardNumber = (value) => {
        const v = value.replace(/\D/g, '').substring(0, 16);
        const parts = v.match(/.{1,4}/g);
        return parts ? parts.join(' ') : v;
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        const formattedValue = formatCardNumber(value);
        setData('card_number', formattedValue.substring(0, 19));
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }

        setData('expiry', value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('subscription.store'), {
            onSuccess: () => {
                reset();
                setIsEditing(false);
            },
        });
    };

    const unsubscribe = () => {
        if (confirm('Are you sure you want to unsubscribe?')) {
            destroy(route('subscription.destroy'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Subscription
                </h2>
            }
        >
            <Head title="Subscription" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {errorMessage && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative dark:bg-red-900/30 dark:border-red-800 dark:text-red-400" role="alert">
                            <span className="block sm:inline">{errorMessage}</span>
                        </div>
                    )}
                    <div className="overflow-hidden bg-gray-100 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {subscription && (
                                <div className="mb-6 p-3 bg-indigo-50 border border-indigo-100 rounded-lg dark:bg-indigo-900/40 dark:border-indigo-800 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Current Subscription</h4>
                                        <div className="text-xs text-indigo-800 dark:text-indigo-400 flex gap-4">
                                            <p>Plan: <span className="font-medium">{subscription.plan_type?.name || 'Standard'}</span></p>
                                            <p>Status: <span className={`font-medium capitalize ${subscription.status === 'ACTIVE' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {subscription.status || 'Active'}
                                            </span></p>
                                        </div>
                                    </div>
                                    {card && (
                                        <div className="text-xs text-indigo-800 dark:text-indigo-400 text-right">
                                            <p>Payment: <span className="font-medium">{card.card_brand}</span> ending in {card.last_four}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                {subscription && !isEditing ? 'Your Subscription' : 'Subscribe to a Plan'}
                            </h3>
                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                {subscription && !isEditing
                                    ? 'You have an active subscription. You can update your payment method or plan below.'
                                    : 'Choose your plan and enter your payment details below.'}
                            </p>

                            {!isEditing && subscription && card ? (
                                <div className="max-w-2xl space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Plan</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{subscription.plan_type?.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                ${subscription.plan_type?.price} {subscription.plan_type?.slug === 'monthly' ? '/ month' : '/ use'}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{card.card_brand} ending in {card.last_four}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Expires {card.expiry_month}/{card.expiry_year}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <PrimaryButton onClick={() => setIsEditing(true)}>
                                            {subscription.status === 'ACTIVE' ? 'Edit Subscription' : 'Re-activate'}
                                        </PrimaryButton>
                                        {subscription.status === 'ACTIVE' && (
                                            <DangerButton onClick={unsubscribe}>
                                                Unsubscribe
                                            </DangerButton>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="max-w-2xl">
                                    <div className="mb-4">
                                        <InputLabel htmlFor="plan_id" value="Select Plan" />
                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {plans.map((plan) => (
                                                <label
                                                    key={plan.id}
                                                    className={`relative flex cursor-pointer rounded-lg border p-3 shadow-sm focus:outline-none ${
                                                        data.plan_id == plan.id
                                                            ? 'border-indigo-500 ring-2 ring-indigo-500 dark:border-indigo-400 dark:ring-indigo-400'
                                                            : 'border-gray-300 dark:border-gray-700'
                                                    } dark:bg-gray-900`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="plan_id"
                                                        value={plan.id}
                                                        className="sr-only"
                                                        onChange={(e) => setData('plan_id', e.target.value)}
                                                        required
                                                    />
                                                    <span className="flex flex-1">
                                                        <span className="flex flex-col">
                                                            <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {plan.name}
                                                            </span>
                                                            <span className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                                {plan.description}
                                                            </span>
                                                            <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                ${plan.price} {plan.slug === 'monthly' ? '/ month' : plan.slug === 'pay-per-use' ? '/ use' : ''}
                                                            </span>
                                                        </span>
                                                    </span>
                                                    {data.plan_id == plan.id && (
                                                        <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                        <InputError message={errors.plan_id} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <InputLabel htmlFor="cardholder_name" value="Cardholder Name" />
                                            <TextInput
                                                id="cardholder_name"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.cardholder_name}
                                                onChange={(e) => setData('cardholder_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.cardholder_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="card_brand" value="Card Brand" />
                                            <select
                                                id="card_brand"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                                value={data.card_brand}
                                                onChange={(e) => setData('card_brand', e.target.value)}
                                                required
                                            >
                                                <option value="">Select Brand</option>
                                                <option value="Visa">Visa</option>
                                                <option value="MasterCard">MasterCard</option>
                                                <option value="American Express">American Express</option>
                                                <option value="Discover">Discover</option>
                                            </select>
                                            <InputError message={errors.card_brand} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="md:col-span-1">
                                            <InputLabel htmlFor="card_number" value="Card Number" />
                                            <TextInput
                                                id="card_number"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.card_number}
                                                onChange={handleCardNumberChange}
                                                placeholder="1234 5678 1234 5678"
                                                required
                                            />
                                            <InputError message={errors.card_number} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="expiry" value="Expiry Date" />
                                            <TextInput
                                                id="expiry"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.expiry}
                                                onChange={handleExpiryChange}
                                                placeholder="MM/YY"
                                                required
                                            />
                                            <InputError message={errors.expiry} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="cvc" value="CVC" />
                                            <TextInput
                                                id="cvc"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.cvc}
                                                onChange={(e) => setData('cvc', e.target.value)}
                                                placeholder="123"
                                                required
                                            />
                                            <InputError message={errors.cvc} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            {subscription ? 'Update Subscription' : 'Subscribe Now'}
                                        </PrimaryButton>

                                        {isEditing && (
                                            <SecondaryButton onClick={() => setIsEditing(false)}>
                                                Cancel
                                            </SecondaryButton>
                                        )}
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
