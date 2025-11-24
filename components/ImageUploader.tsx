import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageData: { data: string; mimeType: string }) => void;
  onImageRemove: () => void;
}

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    };
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onImageRemove }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
      const imageData = await fileToGenerativePart(file);
      onImageUpload(imageData);
    }
  }, [onImageUpload]);

  const handleRemoveImage = () => {
    if(imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    onImageRemove();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  return (
    <div className="w-full">
      {imagePreview ? (
        <div className="relative group">
          <img src={imagePreview} alt="Flyer preview" className="w-full h-auto max-h-64 object-contain rounded-lg border border-stone-300 dark:border-stone-600" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer bg-white/80 dark:bg-slate-700/80 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors duration-300
          ${isDragging ? 'border-teal-500' : 'border-stone-300 dark:border-stone-600'}`}
        >
          <input id="image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-stone-500 dark:text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-stone-500 dark:text-stone-400"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">PNG, JPG, atau WEBP</p>
          </div>
        </label>
      )}
    </div>
  );
};
