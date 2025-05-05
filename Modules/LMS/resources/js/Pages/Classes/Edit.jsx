import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, class: cls }) {
  const { data, setData, put, processing, errors } = useForm({
    name: cls.name,
    content: cls.content,
    image: null,
  }, { forceFormData: true });

  const submit = e => {
    e.preventDefault();
    put(route('lms.classes.update', cls.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Class</h2>}
    >
      <Head title="Edit Class" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                <InputLabel htmlFor="content" value="Description" />
                <textarea
                  id="content"
                  value={data.content}
                  onChange={e => setData('content', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <InputError message={errors.content} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="image" value="Change Image" />
                <input
                  id="image"
                  type="file"
                  onChange={e => setData('image', e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400"
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="flex justify-end space-x-4">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Saving...' : 'Save Changes'}
                </PrimaryButton>
                <Link
                  href={route('lms.classes.index')}
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
