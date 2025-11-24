import React from 'react';

interface CaptionTypeSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const captionTypes = [
  { id: 'Informative', label: '1. Informative (Informasi Event/Promo/Produk)' },
  { id: 'Hard Selling', label: '2. Hard Selling (Ajak Beli Langsung)' },
  { id: 'Soft Selling', label: '3. Soft Selling (Storytelling & Manfaat)' },
  { id: 'Emotional', label: '4. Emotional / Sentimental (Nostalgia/Perasaan)' },
  { id: 'Engaging', label: '5. Engaging / Interactive (Interaksi Audience)' },
  { id: 'Humorous', label: '6. Humorous / Fun (Lucu & Santai)' },
  { id: 'Motivational', label: '7. Motivational / Inspirational (Semangat)' },
  { id: 'Announcement', label: '8. Announcement (Pengumuman Resmi)' },
  { id: 'Behind The Scenes', label: '9. Behind The Scenes (Sisi Manusiawi)' },
  { id: 'Question', label: '10. Question / Curiosity Hook (Pertanyaan Pancingan)' },
];

export const CaptionTypeSelector: React.FC<CaptionTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="captionType" className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">
        Jenis Caption (Opsional)
      </label>
      <div className="relative">
        <select
          id="captionType"
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 text-stone-700 dark:text-stone-200 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 appearance-none cursor-pointer"
        >
          <option value="">Pilih Jenis Caption (Default: Auto)</option>
          {captionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
       <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Pilih arah gaya penulisan caption agar lebih spesifik sesuai tujuan.</p>
    </div>
  );
};