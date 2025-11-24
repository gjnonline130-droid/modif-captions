import React from 'react';

export const TipsSection: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mt-10 bg-teal-50/60 dark:bg-teal-900/30 border border-teal-200/50 dark:border-teal-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <h3 className="flex items-center text-lg font-medium text-teal-800 dark:text-teal-200 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Tips Ekstra untuk Caption yang Sempurna
            </h3>
            <ul className="space-y-3 list-none text-stone-600 dark:text-stone-300">
                <li className="flex items-start">
                    <span className="text-teal-500 dark:text-teal-400 font-bold mr-2 mt-1">✓</span>
                    <div><strong>Gunakan Hook Kuat di Awal:</strong> Selalu mulai dengan kalimat yang menarik perhatian dalam 1-2 baris pertama. 🎣</div>
                </li>
                <li className="flex items-start">
                    <span className="text-teal-500 dark:text-teal-400 font-bold mr-2 mt-1">✓</span>
                    <div><strong>Manfaatkan Emoji:</strong> Emoji berfungsi sebagai pemisah visual dan dapat menambah sentuhan emosi pada tulisan Anda. 😊</div>
                </li>
                <li className="flex items-start">
                    <span className="text-teal-500 dark:text-teal-400 font-bold mr-2 mt-1">✓</span>
                    <div><strong>Call to Action (CTA) Jelas:</strong> Akhiri caption dengan ajakan seperti Komen, Simpan, Bagikan, atau Tag Teman. 👇</div>
                </li>
            </ul>
        </div>
    );
};