import { HiSearch, HiPlus } from 'react-icons/hi';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SearchAddBar({
  placeholder,
  search,
  onSearchChange,
  onSearchSubmit,
  addLabel,
  addHref,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <form onSubmit={onSearchSubmit} className="flex items-center space-x-2 flex-1 max-w-xl">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 pr-4 w-full border-gray-300 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <PrimaryButton type="submit" className="hidden sm:inline-flex">
          <HiSearch className="h-5 w-5" />
        </PrimaryButton>
      </form>
      <PrimaryButton as="a" href={addHref} className="flex items-center gap-2">
        <HiPlus className="h-5 w-5" />
        <span className="hidden sm:inline">{addLabel}</span>
      </PrimaryButton>
    </div>
  );
}
