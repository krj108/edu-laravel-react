import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { HiSearch, HiPlus, HiEye, HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Pagination from '@/Components/Pagination'; // assuming you have a shared Pagination component

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-1 max-w-xl">
                                    <div className="relative flex-1">
                                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or email"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-10 pr-4 w-full border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <PrimaryButton type="submit" className="hidden sm:inline-flex">
                                        <HiSearch className="h-5 w-5" />
                                    </PrimaryButton>
                                </form>
                                <PrimaryButton as="a" href={route('users.create')} className="flex items-center gap-2">
                                    <HiPlus className="h-5 w-5" />
                                    <span className="hidden sm:inline">Add New User</span>
                                </PrimaryButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <TableHeader>Avatar</TableHeader>
                                            <TableHeader>Name</TableHeader>
                                            <TableHeader>Email</TableHeader>
                                            <TableHeader align="right">Actions</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <TableCell>
                                                    <AvatarPreview avatar={user.avatar} />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell align="right">
                                                    <div className="flex space-x-2 justify-end">
                                                        <SecondaryButton
                                                            as="a"
                                                            href={route('users.show', user.id)}
                                                            className="px-3 py-2 text-sm"
                                                            title="View"
                                                        >
                                                            <HiEye className="h-5 w-5" />
                                                        </SecondaryButton>
                                                        <PrimaryButton
                                                            as="a"
                                                            href={route('users.edit', user.id)}
                                                            className="px-3 py-2 text-sm"
                                                            title="Edit"
                                                        >
                                                            <HiPencil className="h-5 w-5" />
                                                        </PrimaryButton>
                                                        <DangerButton
                                                            onClick={() => handleDelete(user.id)}
                                                            className="px-3 py-2 text-sm"
                                                            title="Delete"
                                                        >
                                                            <HiTrash className="h-5 w-5" />
                                                        </DangerButton>
                                                    </div>
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Component */}
                            <Pagination links={users.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// // Pagination Component
// const Pagination = ({ links }) => {
//     return (
//         <div className="mt-4 flex items-center justify-center gap-1">
//             {links.map((link, index) => {
//                 const isPrevious = link.label.includes('Previous');
//                 const isNext = link.label.includes('Next');
//                 const isDisabled = !link.url;

//                 return (
//                     <Link
//                         key={index}
//                         href={link.url || ''}
//                         className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
//                             link.active
//                                 ? 'border-transparent bg-indigo-600 text-white'
//                                 : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
//                         } ${
//                             isDisabled
//                                 ? 'cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent'
//                                 : ''
//                         }`}
//                     >
//                         {isPrevious ? (
//                             <HiChevronLeft className="h-5 w-5" />
//                         ) : isNext ? (
//                             <HiChevronRight className="h-5 w-5" />
//                         ) : (
//                             <span 
//                                 className="text-sm"
//                                 dangerouslySetInnerHTML={{ __html: link.label }} 
//                             />
//                         )}
//                     </Link>
//                 );
//             })}
//         </div>
//     );
// };

// Helper Components
const TableHeader = ({ children, align = 'left' }) => (
    <th className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
        {children}
    </th>
);

const TableCell = ({ children, align = 'left' }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-${align} text-sm text-gray-900 dark:text-gray-100`}>
        {children}
    </td>
);

const AvatarPreview = ({ avatar }) => (
    <div className="flex-shrink-0 h-10 w-10">
        {avatar ? (
            <img 
                className="h-10 w-10 rounded-full" 
                src={`/storage/${avatar}`} 
                alt="Avatar"
                loading="lazy"
            />
        ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">N/A</span>
            </div>
        )}
    </div>
);