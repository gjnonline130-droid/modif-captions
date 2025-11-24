import React from 'react';

interface CaptionDisplayProps {
  caption: string;
}

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ caption }) => {
  // Split caption into main content and hashtags
  const parts = caption.split(/(\s*#\w+.*)/s);
  const mainText = parts[0];
  const hashtags = parts[1] || '';

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm transition-all duration-300">
      <p className="text-stone-700 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
        {mainText}
      </p>
      {hashtags && (
        <p className="text-teal-600 dark:text-teal-400 whitespace-pre-wrap mt-4">
          {hashtags}
        </p>
      )}
    </div>
  );
};