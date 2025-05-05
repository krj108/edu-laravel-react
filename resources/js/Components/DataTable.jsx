export default function DataTable({ columns, children }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map(({ label, align = 'left' }, i) => (
                <th
                  key={i}
                  className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {children}
          </tbody>
        </table>
      </div>
    );
  }
  