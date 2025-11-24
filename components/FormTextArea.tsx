import React from 'react';

interface FormTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 text-stone-700 dark:text-stone-200 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 resize-y"
      />
    </div>
  );
};
