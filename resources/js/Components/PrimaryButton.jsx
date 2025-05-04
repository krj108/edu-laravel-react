export default function PrimaryButton({ className = '', disabled, children, as = 'button', ...props }) {
    const commonClasses = `inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
        disabled ? 'opacity-25 cursor-not-allowed' : ''
    } ${className}`;

    if (as === 'a') {
        return (
            <a {...props} className={commonClasses}>
                {children}
            </a>
        );
    }

    return (
        <button {...props} className={commonClasses} disabled={disabled}>
            {children}
        </button>
    );
}
