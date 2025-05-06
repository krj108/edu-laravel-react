// Modules/LMS/resources/js/Pages/Rooms/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput'; // assume مكوّن عرض <select>
import ImagePreviewInput from '@/Components/ImagePreviewInput';
import PrimaryButton from '@/Components/PrimaryButton';
export default function Create({ auth, classes }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    content: '',
    school_class_id: '',
    image: null,
  }, { forceFormData: true });

  const submit = e => {
    e.preventDefault();
    post(route('lms.rooms.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add New Room</h2>}
    >
      <Head title="Add Room" />

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
                <InputLabel htmlFor="content" value="Content" />
                <textarea
                  id="content"
                  value={data.content}
                  onChange={e => setData('content', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <InputError message={errors.content} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="school_class_id" value="Class" />
                <SelectInput
                  id="school_class_id"
                  value={data.school_class_id}
                  onChange={e => setData('school_class_id', e.target.value)}
                  options={classes}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.school_class_id} className="mt-2" />
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
                  {processing ? 'Creating...' : 'Create Room'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
