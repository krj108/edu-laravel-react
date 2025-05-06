import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ImagePreviewInput from '@/Components/ImagePreviewInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  }, { forceFormData: true });

  const submit = e => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add New User</h2>}
    >
      <Head title="Add User" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
            <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
              <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="mt-1 block w-full"
                  isFocused
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <InputLabel htmlFor="avatar" value="Avatar" />
                <ImagePreviewInput
                  current={null}
                  value={data.avatar}
                  onChange={file => setData('avatar', file)}
                  error={errors.avatar}
                />
              </div>

              <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Creating...' : 'Create User'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
