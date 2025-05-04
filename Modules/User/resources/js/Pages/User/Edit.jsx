import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password (Leave blank to keep current)</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Avatar */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                                    <div className="mt-1 flex items-center">
                                        {user.avatar && (
                                            <img 
                                                src={`/storage/${user.avatar}`} 
                                                className="w-16 h-16 rounded-full mr-4 object-cover"
                                                alt="Current avatar"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            onChange={(e) => setData('avatar', e.target.files[0])}
                                            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/20 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/30"
                                        />
                                    </div>
                                    {errors.avatar && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.avatar}</p>}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Updating...' : 'Update User'}
                                    </PrimaryButton>
                                    <a 
                                        href={route('users.index')} 
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-gray-800 dark:text-gray-200 uppercase tracking-widest hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}