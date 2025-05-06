// Modules/LMS/resources/js/Pages/Rooms/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import SearchAddBar from '@/Components/SearchAddBar';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { HiPencil, HiTrash } from 'react-icons/hi';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, rooms, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this room?')) {
      router.delete(route('lms.rooms.destroy', id));
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    router.get(route('lms.rooms.index'), { search }, { preserveState: true, replace: true });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Rooms</h2>}
    >
      <Head title="Rooms" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

            <SearchAddBar
              placeholder="Search by room name"
              search={search}
              onSearchChange={setSearch}
              onSearchSubmit={handleSearch}
              addLabel="Add New Room"
              addHref={route('lms.rooms.create')}
            />

            <DataTable
              columns={[
                { label: 'Image' },
                { label: 'Name' },
                { label: 'Class' },
                { label: 'Actions', align: 'right' },
              ]}
            >
              {rooms.data.map(room => (
                <tr key={room.id}>
                  <td className="px-6 py-4">
                    {room.image
                      ? <img src={`/storage/${room.image}`} className="h-10 w-10 rounded-md" />
                      : '—'}
                  </td>
                  <td className="px-6 py-4">{room.name}</td>
                  <td className="px-6 py-4">{room.school_class.name}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <PrimaryButton as="a" href={route('lms.rooms.edit', room.id)} className="px-3 py-2 text-sm">
                      <HiPencil className="h-5 w-5" />
                    </PrimaryButton>
                    <DangerButton onClick={() => handleDelete(room.id)} className="px-3 py-2 text-sm">
                      <HiTrash className="h-5 w-5" />
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </DataTable>

            <Pagination links={rooms.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
