import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { HiSearch, HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import Pagination from '@/Components/Pagination'; // assuming you have a shared Pagination component

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
            
            {/* Search + Add */}
            <div className="flex items-center justify-between mb-4">
              <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by class name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 w-full border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <PrimaryButton type="submit" className="hidden sm:inline-flex">
                  <HiSearch className="h-5 w-5" />
                </PrimaryButton>
              </form>

              <PrimaryButton as="a" href={route('lms.classes.create')} className="flex items-center gap-2">
                <HiPlus className="h-5 w-5" />
                <span className="hidden sm:inline">Add New Class</span>
              </PrimaryButton>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {classes.data.map(cls => (
                    <tr key={cls.id}>
                      <td className="px-6 py-4">
                        {cls.image
                          ? <img src={`/storage/${cls.image}`} className="h-10 w-10 rounded-md" alt="" />
                          : '—'}
                      </td>
                      <td className="px-6 py-4">{cls.name}</td>
                      <td className="px-6 py-4">{cls.content}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <PrimaryButton as="a" href={route('lms.classes.edit', cls.id)} className="px-3 py-2 text-sm" title="Edit">
                          <HiPencil className="h-5 w-5" />
                        </PrimaryButton>
                        <DangerButton onClick={() => handleDelete(cls.id)} className="px-3 py-2 text-sm" title="Delete">
                          <HiTrash className="h-5 w-5" />
                        </DangerButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination links={classes.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
