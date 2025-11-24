import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-4 p-4 bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-700 rounded-lg text-center" role="alert">
      {message}
    </div>
  );
};