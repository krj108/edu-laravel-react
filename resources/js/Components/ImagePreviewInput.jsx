import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function ImagePreviewInput({ current, value, onChange, error }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof current === 'string') {
      setPreview(`/storage/${current}`);
    }
  }, [current, value]);

  return (
    <div>
      <div className="mt-1 flex items-center space-x-4">
        {preview ? (
          <img src={preview} className="w-16 h-16 rounded-md object-cover" alt="" />
        ) : (
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => onChange(e.target.files[0])}
          className="block w-full text-sm text-gray-500 dark:text-gray-400"
        />
      </div>
      {error && <InputError message={error} className="mt-2" />}
    </div>
  );
}
