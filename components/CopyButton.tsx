import React, { useState } from 'react';

interface CopyButtonProps {
    onClick: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        onClick();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopyClick}
            className="absolute top-3 right-3 p-2 bg-stone-200/50 dark:bg-slate-700/50 rounded-full hover:bg-teal-100/70 dark:hover:bg-teal-800/70 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            aria-label="Copy caption"
        >
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )}
        </button>
    );
};