// Modules/LMS/resources/js/Pages/Rooms/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import ImagePreviewInput from '@/Components/ImagePreviewInput';
import PrimaryButton from '@/Components/PrimaryButton';
export default function Edit({ auth, room, classes }) {
  const { data, setData, put, processing, errors } = useForm({
    name: room.name,
    content: room.content,
    school_class_id: room.school_class_id,
    image: null,
  }, { forceFormData: true });

  const submit = e => {
    e.preventDefault();
    put(route('lms.rooms.update', room.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Room</h2>}
    >
      <Head title="Edit Room" />

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
                <InputLabel htmlFor="image" value="Change Image" />
                <ImagePreviewInput
                  current={room.image}
                  value={data.image}
                  onChange={file => setData('image', file)}
                  error={errors.image}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Saving...' : 'Save Changes'}
                </PrimaryButton>
                <Link
                  href={route('lms.rooms.index')}
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
