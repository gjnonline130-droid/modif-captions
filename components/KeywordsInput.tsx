import React from 'react';

interface KeywordsInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KeywordsInput: React.FC<KeywordsInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="keywords" className="sr-only">
        Kata Kunci
      </label>
      <input
        id="keywords"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="misalnya: matahari terbenam 🌅, pantai 🏖️, ketenangan 🧘..."
        className="w-full px-5 py-4 text-stone-700 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-stone-400 dark:placeholder-stone-500 dark:text-stone-200"
      />
    </div>
  );
};