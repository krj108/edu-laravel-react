import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import SearchAddBar from '@/Components/SearchAddBar';
import ImagePreviewInput from '@/Components/ImagePreviewInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { HiPencil, HiTrash } from 'react-icons/hi';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, classes, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this class?')) {
      router.delete(route('lms.classes.destroy', id));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('lms.classes.index'), { search }, { preserveState: true, replace: true });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Classes</h2>}
    >
      <Head title="Classes" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <SearchAddBar
              placeholder="Search by class name"
              search={search}
              onSearchChange={setSearch}
              onSearchSubmit={handleSearch}
              addLabel="Add New Class"
              addHref={route('lms.classes.create')}
            />

            <DataTable
              columns={[
                { label: 'Image' },
                { label: 'Name' },
                { label: 'Description' },
                { label: 'Actions', align: 'right' },
              ]}
            >
              {classes.data.map(cls => (
                <tr key={cls.id}>
                  <td className="px-6 py-4">
                    {cls.image ? <img src={`/storage/${cls.image}`} className="h-10 w-10 rounded-md" /> : '—'}
                  </td>
                  <td className="px-6 py-4">{cls.name}</td>
                  <td className="px-6 py-4">{cls.content}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <PrimaryButton as="a" href={route('lms.classes.edit', cls.id)} className="px-3 py-2 text-sm">
                      <HiPencil className="h-5 w-5" />
                    </PrimaryButton>
                    <DangerButton onClick={() => handleDelete(cls.id)} className="px-3 py-2 text-sm">
                      <HiTrash className="h-5 w-5" />
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </DataTable>

            <Pagination links={classes.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
