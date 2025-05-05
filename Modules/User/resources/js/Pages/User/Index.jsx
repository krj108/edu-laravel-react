import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SearchAddBar from '@/Components/SearchAddBar';
import DataTable from '@/Components/DataTable';
import AvatarPreviewInput from '@/Components/ImagePreviewInput'; // إذا أردت استخدامه هنا، وإلا لديك AvatarPreview محلي
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, users, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', id));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('users.index'), { search }, { preserveState: true, replace: true });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>}
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

            <SearchAddBar
              placeholder="Search by name or email"
              search={search}
              onSearchChange={setSearch}
              onSearchSubmit={handleSearch}
              addLabel="Add New User"
              addHref={route('users.create')}
            />

            <DataTable
              columns={[
                { label: 'Avatar' },
                { label: 'Name' },
                { label: 'Email' },
                { label: 'Actions', align: 'right' },
              ]}
            >
              {users.data.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    {user.avatar
                      ? <img src={`/storage/${user.avatar}`} className="h-10 w-10 rounded-full" />
                      : '—'}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <SecondaryButton as="a" href={route('users.show', user.id)} className="px-3 py-2 text-sm">
                      <HiEye className="h-5 w-5" />
                    </SecondaryButton>
                    <PrimaryButton as="a" href={route('users.edit', user.id)} className="px-3 py-2 text-sm">
                      <HiPencil className="h-5 w-5" />
                    </PrimaryButton>
                    <DangerButton onClick={() => handleDelete(user.id)} className="px-3 py-2 text-sm">
                      <HiTrash className="h-5 w-5" />
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </DataTable>

            <Pagination links={users.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
