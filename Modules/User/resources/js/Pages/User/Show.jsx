import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User Details</h2>}
        >
            <Head title="User Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Avatar Section */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                                    <div className="mt-1">
                                        {user.avatar ? (
                                            <img 
                                                src={`/storage/${user.avatar}`} 
                                                className="w-32 h-32 rounded-full object-cover"
                                                alt="User avatar"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span className="text-gray-500 dark:text-gray-400">No Avatar</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                        <p className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent p-2">
                                            {user.name}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <p className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent p-2">
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Timestamps */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Created At</label>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Updated At</label>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(user.updated_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <PrimaryButton as="a" href={route('users.edit', user.id)}>
                                    Edit User
                                </PrimaryButton>
                                <Link 
                                    href={route('users.index')} 
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-gray-800 dark:text-gray-200 uppercase tracking-widest hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}