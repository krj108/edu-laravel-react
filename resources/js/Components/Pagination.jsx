import { Link } from '@inertiajs/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function Pagination({ links }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      {links.map((link, idx) => {
        const isPrev = link.label.includes('Previous');
        const isNext = link.label.includes('Next');
        const disabled = !link.url;

        const baseClasses = 'flex h-10 w-10 items-center justify-center rounded-md border transition-colors';
        const activeClasses = 'border-transparent bg-indigo-600 text-white';
        const inactiveClasses = 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700';
        const disabledClasses = 'cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent';

        
        if (isPrev || isNext) {
          return (
            <Link
              key={idx}
              href={link.url || ''}
              className={`${baseClasses} ${link.active ? activeClasses : inactiveClasses} ${disabled ? disabledClasses : ''}`}
            >
              {isPrev
                ? <HiChevronLeft className="h-5 w-5" />
                : <HiChevronRight className="h-5 w-5" />
              }
            </Link>
          );
        }

       
        return (
          <Link
            key={idx}
            href={link.url || ''}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`${baseClasses} ${link.active ? activeClasses : inactiveClasses} ${disabled ? disabledClasses : ''}`}
          />
        );
      })}
    </div>
  );
}
