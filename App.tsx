import React, { useState, useCallback, useEffect } from 'react';
import { generateCaption } from './services/geminiService';
import { GenerateButton } from './components/GenerateButton';
import { CaptionDisplay } from './components/CaptionDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CopyButton } from './components/CopyButton';
import { TipsSection } from './components/TipsSection';
import { ThemeSelector } from './components/ThemeSelector';
import { ImageUploader } from './components/ImageUploader';
import { FormInput } from './components/FormInput';
import { FormTextArea } from './components/FormTextArea';
import { CaptionTypeSelector } from './components/CaptionTypeSelector';
import { CaptionLengthSelector } from './components/CaptionLengthSelector';

type Theme = 'light' | 'dark';
type ImageData = { data: string; mimeType: string };

const App: React.FC = () => {
  // Form State
  const [image, setImage] = useState<ImageData | null>(null);
  const [hook, setHook] = useState<string>('');
  const [theme, setTheme] = useState<string>('Non formal');
  const [captionLength, setCaptionLength] = useState<string>('Panjang');
  const [content, setContent] = useState<string>('');
  const [captionType, setCaptionType] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [cta, setCta] = useState<string>('');

  // UI State
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uiTheme, setUiTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(uiTheme === 'light' ? 'dark' : 'light');
    root.classList.add(uiTheme);
    localStorage.setItem('theme', uiTheme);
  }, [uiTheme]);

  const handleGenerateClick = useCallback(async () => {
    if (!content.trim() && !image) {
      setError('Mohon isi kolom "Isi Captions" atau unggah gambar untuk memulai. ✍️🖼️');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCaption('');

    try {
      const caption = await generateCaption(
        image, 
        hook, 
        theme, 
        captionLength,
        content,
        captionType,
        period, 
        location, 
        cta
      );
      setGeneratedCaption(caption);
    } catch (err) {
      setError('😕 Maaf, terjadi kesalahan saat membuat caption. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [image, hook, theme, captionLength, content, captionType, period, location, cta]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCaption);
  };
  
  const toggleTheme = () => {
    setUiTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100 dark:bg-slate-900 text-stone-800 dark:text-stone-200 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-rose-50 to-amber-50 -z-10 dark:hidden"></div>
      <Header currentTheme={uiTheme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 border border-stone-200/50 dark:border-stone-700/50">
          <h2 className="text-2xl md:text-3xl font-light text-center text-teal-800 dark:text-teal-300 mb-2">
            Generator Caption GJN ✨
          </h2>
          <p className="text-center text-stone-500 dark:text-stone-400 mb-8">
            Lengkapi formulir di bawah ini untuk membuat caption yang menarik.
          </p>

          <div className="space-y-5">
            {/* 1. Image Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">
                Upload Gambar/Flyer (Opsional)
              </label>
              <ImageUploader 
                onImageUpload={(imageData) => setImage(imageData)}
                onImageRemove={() => setImage(null)}
              />
            </div>

            {/* 2. Hook (Improve AI) */}
            <FormInput 
              id="hook"
              label="HOOK (Pancingan)"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Tulis hook menarik atau biarkan kosong (Improve by AI)"
              helperText="Opsional: Biarkan kosong jika ingin AI membuat hook otomatis."
            />

            {/* 3. Theme Selector */}
            <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />

            {/* 4. Length Selector */}
            <CaptionLengthSelector selectedLength={captionLength} onLengthChange={setCaptionLength} />

            {/* 5. Isi Captions */}
            <FormTextArea 
              id="content"
              label="Isi Captions (Konteks Utama)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Jelaskan isi konten, promo, atau informasi yang ingin disampaikan..."
            />

            {/* 6. Jenis Caption */}
            <CaptionTypeSelector 
              value={captionType}
              onChange={(e) => setCaptionType(e.target.value)}
            />

            {/* 7. Periode (Optional) */}
            <FormInput 
              id="period"
              label="Periode (Opsional)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Contoh: 1-7 Agustus 2024"
            />

            {/* 8. Tempat/Area (Optional) */}
            <FormInput 
              id="location"
              label="Tempat/Area (Opsional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Area Fashion Lt. 2"
            />

            {/* 9. CTA (Improve AI) */}
            <FormInput 
              id="cta"
              label="CTA (Call to Action)"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="Tulis ajakan atau biarkan kosong (Improve by AI)"
              helperText="Opsional: Biarkan kosong jika ingin AI membuat ajakan otomatis."
            />

            <div className="pt-4">
              <GenerateButton onClick={handleGenerateClick} isLoading={isLoading} />
            </div>
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="mt-10">
            {isLoading && <LoadingSpinner />}
            {generatedCaption && (
              <div className="relative">
                <CaptionDisplay caption={generatedCaption} />
                <CopyButton onClick={handleCopy} />
              </div>
            )}
          </div>
        </div>

        <TipsSection />

      </main>
      <Footer />
    </div>
  );
};

export default App;