import React from 'react';

interface CaptionLengthSelectorProps {
  selectedLength: string;
  onLengthChange: (length: string) => void;
}

const lengths = [
  { id: 'Pendek', label: 'Pendek 📏' },
  { id: 'Panjang', label: 'Panjang 📝' },
];

export const CaptionLengthSelector: React.FC<CaptionLengthSelectorProps> = ({ selectedLength, onLengthChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2 text-center">Pilih Panjang Caption</label>
      <div className="flex justify-center items-center space-x-2 md:space-x-4 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-full p-1.5 shadow-inner">
        {lengths.map((length) => (
          <div key={length.id} className="flex-1">
            <input
              type="radio"
              id={length.id}
              name="length"
              value={length.id}
              checked={selectedLength === length.id}
              onChange={() => onLengthChange(length.id)}
              className="sr-only"
            />
            <label
              htmlFor={length.id}
              className={`w-full block text-center px-4 py-2 rounded-full cursor-pointer transition-all duration-300 text-sm md:text-base ${
                selectedLength === length.id
                  ? 'bg-teal-600 text-white shadow'
                  : 'bg-transparent text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-slate-600/50'
              }`}
            >
              {length.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};