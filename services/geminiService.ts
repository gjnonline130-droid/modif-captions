import { GoogleGenAI } from "@google/genai";

type ImageData = { data: string; mimeType: string };

export const generateCaption = async (
  image: ImageData | null,
  hook: string,
  theme: string,
  length: string,
  content: string,
  captionType: string,
  period: string,
  location: string,
  cta: string
): Promise<string> => {
  // Robust API Key Retrieval for Vercel + Vite environments
  let apiKey = '';
  
  // Priority 1: Vite Environment Variable (Standard for Vercel Vite deployments)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    apiKey = import.meta.env.VITE_API_KEY;
  }

  // Priority 2: Process Env (Fallback for local or customized builds)
  if (!apiKey) {
    try {
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
      }
    } catch (e) {
      // Ignore
    }
  }

  if (!apiKey) {
    throw new Error("⚠️ API Key tidak ditemukan! Di Dashboard Vercel (Settings > Environment Variables), pastikan Key bernama 'VITE_API_KEY' (bukan hanya 'API_KEY').");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    let themeInstruction = '';
    let temperature = 0.7; // Default temperature

    switch (theme) {
      case 'Formal':
        themeInstruction = 'Gunakan gaya bahasa yang formal, profesional, baku, dan terstruktur rapi. Hindari bahasa gaul, singkatan, atau emoji yang berlebihan. Fokus pada kejelasan informasi dan kredibilitas.';
        temperature = 0.5; // Lower temperature for consistent, formal output
        break;
      case 'Gen Z':
        themeInstruction = `
Gunakan gaya bahasa Gen Z / "Anak Jaksel" yang sangat cair, trendi, dan TIDAK MONOTON.
- Kosa Kata: Gunakan campuran Bahasa Indonesia dan Inggris (code-switching) secara natural.
- Slang Wajib (Gunakan variasi): jujurly, vibes, slay, spill, bestie, fomo, gas, red flag/green flag, salty, no debat, kece badai, menyala abangku, tipis-tipis, valid no debat, starboy, skena.
- Penulisan: Gunakan singkatan teks percakapan (bgt, bkn, yg, krn, cm). Jangan gunakan kalimat baku/resmi.
- Tone: Buat variasi antara "Heboh/Excited" (banyak tanda seru) ATAU "Chill/Aesthetic" (bisa menggunakan huruf kecil semua untuk kesan estetik) ATAU "Humoris/Relate".
- Hindari pola kalimat pembuka yang selalu sama. Jadilah kreatif dan tidak terduga.
- Gunakan kombinasi emoji yang ekspresif (contoh: 😭, 💅, 🔥, ✨, 🗿, 💀, 🏃💨).
`;
        temperature = 0.9; // Higher temperature for high creativity and variety
        break;
      case 'Non formal':
      default:
        themeInstruction = 'Gunakan gaya bahasa yang santai, ramah, hangat, dan mudah didekati seperti berbicara dengan teman akrab. Hindari kata-kata yang terlalu kaku.';
        temperature = 0.75;
        break;
    }

    let typeInstruction = '';
    switch (captionType) {
        case 'Informative':
            typeInstruction = 'JENIS CAPTION: Informative Caption. Fokus utama adalah menjelaskan detail event, promo, produk, atau info penting secara jelas, lengkap, dan lugas. Pastikan informasi tersampaikan dengan baik.';
            break;
        case 'Hard Selling':
            typeInstruction = 'JENIS CAPTION: Hard Selling. Gunakan bahasa persuasif yang kuat dengan urgensi tinggi (FOMO). Langsung mengajak pembaca untuk membeli atau bertindak sekarang juga. Tekankan kelangkaan atau batas waktu.';
            break;
        case 'Soft Selling':
            typeInstruction = 'JENIS CAPTION: Soft Selling. Gunakan pendekatan halus, fokus pada storytelling, kenyamanan, atau manfaat produk/layanan tanpa terkesan memaksa jualan secara langsung.';
            break;
        case 'Emotional':
            typeInstruction = 'JENIS CAPTION: Emotional / Sentimental. Bangkitkan perasaan, kenangan, atau nostalgia pembaca. Sentuh sisi emosional mereka agar merasa terhubung dengan konten.';
            break;
        case 'Engaging':
            typeInstruction = 'JENIS CAPTION: Engaging / Interactive. Buat caption yang "memancing" audiens untuk berkomentar, menjawab pertanyaan, atau berinteraksi. Gunakan pertanyaan atau ajakan diskusi.';
            break;
        case 'Humorous':
            typeInstruction = 'JENIS CAPTION: Humorous / Fun. Gunakan gaya santai, lucu, atau receh yang menghibur. Boleh sedikit nyeleneh tapi tetap sopan. Buat pembaca tersenyum atau tertawa.';
            break;
        case 'Motivational':
            typeInstruction = 'JENIS CAPTION: Motivational / Inspirational. Berikan kata-kata semangat, quote positif, atau inspirasi yang uplifting untuk pembaca menjalani hari.';
            break;
        case 'Announcement':
            typeInstruction = 'JENIS CAPTION: Announcement. Sampaikan pengumuman resmi dari toko/brand dengan bahasa yang jelas, tegas, namun tetap ramah dan informatif.';
            break;
        case 'Behind The Scenes':
            typeInstruction = 'JENIS CAPTION: Behind The Scenes / Human Touch. Ceritakan sisi manusiawi, proses di balik layar, atau keseharian staff/operasional untuk membangun kedekatan personal dengan audiens.';
            break;
        case 'Question':
            typeInstruction = 'JENIS CAPTION: Question / Curiosity Hook. Mulai dan fokuskan caption pada pertanyaan yang memancing rasa penasaran audiens agar mereka membaca sampai habis.';
            break;
        default:
            typeInstruction = 'Sesuaikan jenis caption secara otomatis berdasarkan konteks Hook dan Isi Caption untuk hasil yang paling optimal.';
            break;
    }

    let lengthInstruction = '';
    if (length === 'Pendek') {
        lengthInstruction = 'PANJANG CAPTION: PENDEK & PADAT (Short Copy). Maksimal 1-3 paragraf singkat. Langsung pada poin utama (Straight to the point). Hilangkan basa-basi yang tidak perlu. Buat ringkas namun tetap powerful dan menarik perhatian.';
    } else {
        // Default to Panjang
        lengthInstruction = 'PANJANG CAPTION: PANJANG & MENDETAIL (Long Copy/Storytelling). Jelaskan informasi secara komprehensif. Gunakan teknik Storytelling agar tidak membosankan. WAJIB gunakan spasi antar paragraf yang cukup, bullet points (jika ada list), dan pemanis visual agar teks enak dibaca (readable) dan tidak terlihat menumpuk.';
    }

    const defaultHashtags = "#GJN #griya_jatinangor #toserbagriyajatinangor #griyajatinangor #infojatinangor #jatinangorbanget #griya #toserbagriya #toserbayyogya #infoyogyagroup #belanjahematyayogya";

    const prompt = `
Peran: Anda adalah ahli konten media sosial kreatif (Social Media Specialist) untuk Toserba Griya Jatinangor.

Tugas: Buat caption Instagram yang menarik, rapi, dan menawan berdasarkan input berikut.

Input Pengguna:
1. Hook (Judul/Pancingan): "${hook}"
   - Instruksi: Jika diisi, gunakan ini sebagai pembuka setelah sapaan. Jika kosong, buatlah hook yang sangat menarik perhatian, membuat orang berhenti scrolling (thumb-stopping), dan sesuai dengan Tone ${theme}.
2. Gaya Bahasa (Tone): ${theme}
   - Instruksi Detail: ${themeInstruction}
3. Jenis Caption: ${captionType || 'Auto'}
   - Instruksi Khusus: ${typeInstruction}
4. Panjang Caption: ${length || 'Panjang'}
   - Instruksi Khusus: ${lengthInstruction}
5. Isi Caption (Konteks Utama): "${content}"
   - Instruksi: Ini adalah inti pesan. Kembangkan menjadi deskripsi yang menarik sesuai Jenis Caption dan Panjang yang dipilih. ${image ? "Analisis juga gambar yang diunggah untuk mendeskripsikan visual, suasana, atau teks di dalamnya secara akurat dan integrasikan ke dalam cerita caption." : ""}
6. Periode: "${period}"
   - Instruksi: Jika ada, masukkan informasi waktu/tanggal ini dengan jelas (misalnya menggunakan emoji 🗓️ atau ⏰).
7. Tempat/Area: "${location}"
   - Instruksi: Jika ada, sebutkan lokasi ini (misalnya dengan emoji 📍).
8. CTA (Call to Action): "${cta}"
   - Instruksi: Jika diisi, gunakan sebagai penutup. Jika kosong, buatkan ajakan bertindak yang persuasif namun tidak memaksa (misalnya "Gaskeun sekarang!", "Tag bestie kamu!", dll) sesuai gaya bahasa.

Aturan Wajib (Format Output):
1. SAPAAN: Captions HARUS diawali dengan kalimat: "Halo YO People! 👋" (Tanpa tanda petik).
2. STRUKTUR: 
   - Sapaan
   - Hook (Headline)
   - Isi Body (Gunakan paragraf pendek/spasi antar baris agar mudah dibaca di HP)
   - Detail Info (Periode/Tempat jika ada)
   - CTA
3. TAGAR: Captions HARUS diakhiri dengan tagar berikut (Wajib ada semua):
   ${defaultHashtags}
   
   Tambahkan minimal 5 tagar relevan lainnya (yang sedang trending atau relevan dengan konteks) setelah tagar wajib di atas.
`;

    const parts = [];

    if (image) {
      parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType,
        },
      });
    }

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts },
        config: {
            temperature: temperature,
            topP: 0.95,
        }
    });

    return response.text.trim();
  } catch (error: any) {
    console.error("Error generating caption with Gemini API:", error);
    // Return detailed error for UI
    throw new Error(error.message || JSON.stringify(error) || "Terjadi kesalahan yang tidak diketahui pada koneksi API.");
  }
};