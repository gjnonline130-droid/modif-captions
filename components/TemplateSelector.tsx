import React from 'react';

interface TemplateSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const templates = [
  'tips/trick',
  'informasi acara',
  'Life Hacks',
  'After Recap acara',
  'story telling',
  'promosi',
  'bikin penasaran',
  'fungsi/manfaat',
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="template" className="sr-only">
        Pilih Template
      </label>
      <select
        id="template"
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 text-stone-700 dark:text-stone-200 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 1rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="">🎨 Pilih Template (Opsional)</option>
        {templates.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};