import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ImagePreviewInput from '@/Components/ImagePreviewInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    avatar: null,
  }, { forceFormData: true });

  const submit = e => {
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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
            <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
              <div>
                <InputLabel htmlFor="name" value="Name" />
                <input
                  id="name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="email" value="Email" />
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="password" value="New Password (leave blank to keep current)" />
                <input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                <input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <InputLabel htmlFor="avatar" value="Avatar" />
                <ImagePreviewInput
                  current={user.avatar}
                  value={data.avatar}
                  onChange={file => setData('avatar', file)}
                  error={errors.avatar}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Saving...' : 'Save Changes'}
                </PrimaryButton>
                <Link
                  href={route('users.index')}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
