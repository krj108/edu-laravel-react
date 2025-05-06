// Modules/LMS/resources/js/Pages/Rooms/Show.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, room }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Room Details</h2>}
    >
      <Head title="Room Details" />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                {room.image ? (
                  <img src={`/storage/${room.image}`} className="mt-1 w-32 h-32 rounded-md object-cover" />
                ) : (
                  <div className="mt-1 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700">{room.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <p className="mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700">{room.content}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
                <p className="mt-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700">{room.school_class.name}</p>
              </div>

              <div className="flex justify-end space-x-4">
                <PrimaryButton as="a" href={route('lms.rooms.edit', room.id)}>
                  Edit Room
                </PrimaryButton>
                <Link
                  href={route('lms.rooms.index')}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200"
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
