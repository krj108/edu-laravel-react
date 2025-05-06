import React from 'react';

export default function SelectInput({ id, value, onChange, options = [], className = '' }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    >
      <option value="">-- Select --</option>
      {Object.entries(options).map(([optValue, optLabel]) => (
        <option key={optValue} value={optValue}>
          {optLabel}
        </option>
      ))}
    </select>
  );
}
