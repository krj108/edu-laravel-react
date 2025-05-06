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
    content: '',
    image: null,
  }, { forceFormData: true });

  const submit = e => {
    e.preventDefault();
    post(route('lms.classes.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add New Class</h2>}
    >
      <Head title="Add Class" />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
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
                <InputLabel htmlFor="image" value="Image" />
                <ImagePreviewInput
                  current={null}
                  value={data.image}
                  onChange={file => setData('image', file)}
                  error={errors.image}
                />
              </div>

              <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Creating...' : 'Create Class'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
