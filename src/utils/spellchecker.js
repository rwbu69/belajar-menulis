import { SLANG_DICTIONARY } from '../config/fallbackData';

// Optimized Levenshtein distance helper
function getLevenshteinDistance(a, b) {
  const tmp = [];
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  
  for (let i = 0; i <= alen; i++) tmp[i] = i;
  
  for (let i = 1; i <= blen; i++) {
    let prev = i;
    for (let j = 1; j <= alen; j++) {
      let val;
      if (b[i - 1] === a[j - 1]) {
        val = tmp[j - 1];
      } else {
        val = Math.min(tmp[j - 1] + 1, prev + 1, tmp[j] + 1);
      }
      tmp[j - 1] = prev;
      prev = val;
    }
    tmp[alen] = prev;
  }
  return tmp[alen];
}

// Built-in static fallback dictionary of common Indonesian words (~1200 entries)
// ensures offline compatibility when GitHub/CDN is unreachable.
export const STATIC_DICTIONARY = new Set([
  // Ganti/Pronomina & Konjungsi
  "saya", "kamu", "dia", "mereka", "kita", "kami", "adalah", "ini", "itu", "yang", "dan", "atau", "tidak", "akan", "telah", "sudah",
  "dapat", "bisa", "untuk", "dengan", "pada", "dalam", "dari", "ke", "di", "oleh", "karena", "jika", "kalau", "bahwa", "seperti",
  "sangat", "lebih", "paling", "hanya", "saja", "juga", "tetapi", "namun", "sebagai", "bagi", "tentang", "mengenai", "melalui",
  "terhadap", "kepada", "tanpa", "serta", "yaitu", "yakni", "ialah", "merupakan", "adanya", "adapun", "bahkan", "bukan", "bukanlah",
  "tiada", "tidaklah", "belum", "sedang", "kemudian", "lalu", "setelah", "sebelum", "sejak", "hingga", "sampai", "sementara",
  "ketika", "saat", "waktu", "hari", "bulan", "tahun", "kali", "orang", "anak", "ibu", "ayah", "kakak", "adik", "keluarga",
  "teman", "sahabat", "guru", "siswa", "murid", "sekolah", "kelas", "belajar", "menulis", "membaca", "bicara", "dengar", "lihat",
  "tahu", "pikir", "kerja", "jalan", "makan", "minum", "tidur", "duduk", "berdiri", "pergi", "datang", "pulang", "kembali",
  "masuk", "keluar", "naik", "turun", "buka", "tutup", "ambil", "taruh", "tarik", "dorong", "bawa", "kirim", "terima", "beli",
  "jual", "bayar", "harga", "uang", "pasar", "toko", "rumah", "kamar", "dapur", "meja", "kursi", "buku", "pena", "kertas",
  "pensil", "tas", "sepatu", "baju", "celana", "topi", "kacamata", "air", "api", "tanah", "udara", "angin", "hujan", "matahari",
  "langit", "awan", "pohon", "daun", "bunga", "buah", "rumput", "hewan", "binatang", "kucing", "anjing", "burung", "ikan",
  "kuda", "sapi", "kambing", "ayam", "bebek", "semut", "nyamuk", "lalat", "hutan", "gunung", "sungai", "laut", "pantai",
  "danau", "batu", "pasir", "emas", "perak", "besi", "kayu", "kaca", "plastik", "warna", "merah", "biru", "kuning", "hijau",
  "putih", "hitam", "cokelat", "abu-abu", "jingga", "ungu", "besar", "kecil", "tinggi", "rendah", "panjang", "pendek", "lebar",
  "sempit", "tebal", "tipis", "berat", "ringan", "cepat", "lambat", "keras", "lunak", "kuat", "lemah", "baru", "lama", "tua",
  "muda", "bersih", "kotor", "sehat", "sakit", "senang", "sedih", "marah", "takut", "terkejut", "malu", "cinta", "benci",
  "suka", "ingin", "mau", "perlu", "harus", "boleh", "mungkin", "pasti", "tentu", "selalu", "sering", "kadang-kadang", "jarang",
  "pernah", "sekarang", "besok", "kemarin", "lusa", "nanti", "sebentar", "pagi", "siang", "sore", "malam", "fajar", "senja",
  "gelap", "terang", "panas", "dingin", "hangat", "sejuk", "basah", "kering", "indah", "jelek", "bagus", "buruk", "baik",
  "jahat", "pintar", "bodoh", "rajin", "malas", "kaya", "miskin", "mahal", "murah", "mudah", "sulit", "gampang", "sukar",
  "benar", "salah", "betul", "keliru", "asli", "palsu", "aman", "bahaya", "ramai", "sepi", "padat", "kosong", "penuh", "kurang",
  "cukup", "pas", "tepat", "cocok", "sesuai", "sama", "beda", "berbeda", "mirip", "serupa", "lain", "lainnya", "semua",
  "seluruh", "setiap", "tiap", "beberapa", "banyak", "sedikit", "sebagian", "setengah", "satu", "dua", "tiga", "empat", "lima",
  "enam", "tujuh", "delapan", "sembilan", "sepuluh", "ratus", "ribu", "juta", "miliar", "triliun", "pertama", "kedua", "ketiga",
  "terakhir", "mulai", "selesai", "tengah", "akhir", "awal", "bagian", "cara", "hal", "masalah", "sebab", "akibat", "contoh",
  "jenis", "macam", "bentuk", "ukuran", "jumlah", "nilai", "nama", "kata", "kalimat", "bahasa", "huruf", "angka", "suara",
  "bunyi", "gambar", "foto", "video", "musik", "lagu", "tari", "seni", "budaya", "sejarah", "negara", "bangsa", "rakyat",
  "pemerintah", "presiden", "menteri", "kota", "desa", "daerah", "wilayah", "tempat", "lokasi", "alamat", "arah", "utara",
  "selatan", "timur", "barat", "pusat", "pinggir", "dekat", "jauh", "antara", "kiri", "kanan", "lurus", "belok", "putar",
  "maju", "mundur", "lompat", "lari", "terbang", "berenang", "selam", "tumbuh", "hidup", "mati", "lahir", "meninggal",
  "umur", "usia", "panggilan", "gelar", "status", "hubungan", "musuh", "lawan", "kawan", "mitra", "anggota", "kelompok",
  "tim", "organisasi", "perusahaan", "kantor", "pabrik", "sawah", "kebun", "ladang", "kolam", "waduk", "bendungan", "jembatan",
  "terowongan", "gedung", "bangunan", "menara", "istana", "candi", "masjid", "gereja", "pura", "vihara", "universitas",
  "kampus", "rumah sakit", "klinik", "apotek", "warung", "restoran", "kafe", "hotel", "penginapan", "stasiun", "bandara",
  "pelabuhan", "terminal", "halte", "pos", "polisi", "tentara", "hukum", "aturan", "undang-undang", "hak", "kewajiban",
  "tugas", "tanggung jawab", "jabatan", "profesi", "dokter", "perawat", "bidan", "dosen", "profesor", "peneliti", "ilmuwan",
  "insinyur", "arsitek", "petani", "nelayan", "pedagang", "pengusaha", "karyawan", "buruh", "sopir", "pilot", "nakhoda",
  "masinis", "prajurit", "hakim", "jaksa", "pengacara", "wartawan", "jurnalis", "pelukis", "pemusik", "penyanyi", "penari",
  "aktor", "aktris", "sutradara", "produser", "atlet", "pemain", "pelatih", "wasit", "juara", "pemenang", "kalah", "menang",
  "hadiah", "piala", "medali", "piagam", "sertifikat", "ijazah", "dokumen", "surat", "kartu", "identitas", "paspor", "visa",
  "tiket", "karcis", "dompet", "koper", "barang", "benda", "alat", "mesin", "komputer", "laptop", "tablet", "ponsel",
  "telepon", "gawai", "gadget", "internet", "jaringan", "situs", "aplikasi", "perangkat", "lunak", "sistem", "data",
  "informasi", "berita", "pesan", "email", "akun", "sandi", "password", "keamanan", "privasi", "rahasia", "bukti", "saksi",
  "sidang", "kasus", "kejahatan", "penjara", "sel", "bebas", "merdeka", "damai", "tentram", "sejahtera", "makmur", "adil",
  "pancasila", "uud", "kesatuan", "republik", "indonesia", "tanah air", "bendera", "garuda", "bhinneka", "tunggal", "ika",
  "proklamasi", "kemerdekaan", "pahlawan", "perjuangan", "pekan", "januari", "februari", "maret", "april", "mei", "juni",
  "juli", "agustus", "september", "oktober", "november", "desember", "abad", "dekade", "windu", "musim", "gugur", "semi",
  "salju", "cuaca", "cerah", "mendung", "berawan", "gerimis", "badai", "petir", "kilat", "guntur", "topan", "tornado",
  "gempa", "tsunami", "banjir", "longsor", "kebakaran", "kekeringan", "bencana", "lembah", "bukit", "jurang", "gua",
  "aliran", "muara", "hulu", "hilir", "air terjun", "rawa", "samudra", "selat", "teluk", "tanjung", "pulau", "kepulauan",
  "benua", "bumi", "planet", "tata surya", "galaksi", "ruang angkasa", "roket", "teleskop", "sains", "fisika", "kimia",
  "biologi", "matematika", "geografi", "sastra", "tesaurus", "ensiklopedia", "novel", "komik", "majalah", "koran", "jurnal",
  "artikel", "bahwa", "sebagaimana", "sedemikian", "sehingga", "meskipun", "walaupun", "sungguhpun", "biarpun", "kendatipun",
  "padahal", "sedangkan", "melainkan", "sebaliknya", "lagipula", "apalagi", "jangankan", "kecuali", "selain", "demikian",
  "perihal", "terkait", "menyangkut", "berdasarkan", "menurut", "merujuk", "mengacu", "sehubungan", "berkenaan", "sebab",
  "makanya", "akibatnya", "walhasil", "alhasil", "kesimpulannya", "ringkasnya", "singkatnya", "sebenarnya", "sesungguhnya",
  "bahwasanya", "untungnya", "sayangnya", "mudah-mudahan", "semoga", "diharapkan", "sebaiknya", "seharusnya", "semestinya",
  "wajib", "mesti", "sanggup", "kuasa", "memang", "rupanya", "nampaknya", "tampaknya", "bagaikan", "laksana", "umpama",
  "ibarat", "misal", "misalnya", "sebagian", "sekali-kali", "sesekali", "senantiasa", "terus-menerus", "selamanya", "seketika",
  "tiba-tiba", "mendadak", "serta-merta", "langsung", "segera", "lambat laun", "lama-kelamaan", "seiring", "berjalannya",
  "semenjak", "seusai", "selagi", "selama", "sepanjang", "tatkala", "kala", "tempo", "dulu", "dahulu", "keesokan", "suatu",
  "zaman", "kini", "dewasa", "globalisasi", "modern", "penutup", "sekian", "terima kasih",
  
  // Kata-Kata Akademis & Kata Baku EYD V
  "analisis", "sistematis", "metode", "metodologi", "penelitian", "kualitatif", "kuantitatif", "data", "analisa", "hipotesis",
  "teori", "konsep", "kriteria", "evaluasi", "efektif", "efisien", "kreatif", "inovatif", "produktivitas", "komunikasi",
  "teknologi", "digital", "informasi", "literasi", "edukasi", "pembelajaran", "kurikulum", "kompetensi", "akademik",
  "objektif", "subjektif", "argumentasi", "argumen", "kritis", "logis", "koheren", "kohesi", "struktur", "paragraf",
  "ejaan", "tanda baca", "bahasa", "formal", "informal", "baku", "tidak baku", "standardisasi", "implementasi", "integrasi",
  "kontribusi", "dampak", "pengaruh", "faktor", "aspek", "indikator", "kategori", "karakteristik", "dimensi", "perspektif",
  "konteks", "signifikan", "relevan", "korelasi", "hubungan", "variabel", "analisis", "sintesis", "kesimpulan", "saran",
  "rekomendasi", "referensi", "sumber", "kutipan", "daftar pustaka", "penulis", "peneliti", "akademisi", "intelektual",
  "aktivitas", "kreativitas", "apresiasi", "estetika", "deskripsi", "narasi", "eksposisi", "persuasi", "karangan", "karya ilmiah",
  "artikel", "esai", "tinjauan", "kajian", "pustaka", "teoretis", "praktis", "kontemporer", "tradisional", "modernisasi",
  "globalisasi", "sosial", "budaya", "ekonomi", "politik", "hukum", "etika", "moral", "nilai", "norma", "masyarakat",
  "komunitas", "lingkungan", "ekosistem", "konservasi", "keberlanjutan", "pembangunan", "kemajuan", "perubahan", "dinamika",
  "interaksi", "partisipasi", "kolaborasi", "sinergi", "potensi", "peluang", "tantangan", "hambatan", "solusi", "alternatif",
  "efektivitas", "efisiensi", "kinerja", "prestasi", "pencapaian", "motivasi", "inspirasi", "aspirasi", "visi", "misi",
  "tujuan", "sasaran", "strategi", "taktik", "kebijakan", "program", "kegiatan", "pelaksanaan", "pengawasan", "evaluasi"
]);

// Dynamic online dictionary fetched in background
export let onlineWords = new Set();
let isFetching = false;
let isFetched = false;

// Trigger load of online dictionary (called from index/main or ResultsPage)
export async function loadOnlineDictionary() {
  if (isFetched || isFetching) return;
  isFetching = true;
  try {
    // Standard fetch from a fast, trusted open-source Indonesian word list on GitHub
    const response = await fetch('https://raw.githubusercontent.com/geovedi/indonesian-wordlist/master/indonesian-wordlist.txt');
    if (response.ok) {
      const text = await response.text();
      const words = text.split(/\r?\n/);
      words.forEach(w => {
        const cleaned = w.trim().toLowerCase();
        if (cleaned && cleaned.length > 1) {
          onlineWords.add(cleaned);
        }
      });
      isFetched = true;
      console.log(`Indonesian online dictionary loaded successfully: ${onlineWords.size} words.`);
    } else {
      throw new Error(`Server returned status ${response.status}`);
    }
  } catch (err) {
    console.error('Failed to load online Indonesian wordlist from CDN, using static fallback:', err);
  } finally {
    isFetching = false;
  }
}

// Indonesian clitics and affixes rules
const INDONESIAN_SUFFIXES = ['nya', 'ku', 'mu', 'kah', 'lah', 'pun', 'tah'];
const INDONESIAN_PREFIXES = [
  'di', 'ke', 'se', 'ter',
  'me', 'men', 'mem', 'meny', 'meng',
  'be', 'ber', 'bel',
  'pe', 'per', 'pel', 'pen', 'pem', 'peny', 'peng'
];

// Custom ignore word list (proper nouns, common abbreviations, etc.)
const IGNORE_WORDS = new Set([
  'dan', 'dll', 'dsb', 'yg', 'dgn', 'hlm', 'hal', 'dst', 'ttg', 'tb', 'bb', 'sd', 'smp', 'sma',
  'rt', 'rw', 'kec', 'kab', 'prov', 'id', 'en', 'ai', 'gpt', 'wpm', 'cpm', 'eyd', 'kbbi', 'cerebras'
]);

// Morphological analysis checking standard Indonesian spelling
export function checkWordIsValid(word, dictSet) {
  const cleaned = word.toLowerCase();
  
  if (cleaned.length <= 1) return true; // Ignore single characters (often typos but usually noise)
  if (/^\d+$/.test(cleaned)) return true; // Ignore numbers
  if (IGNORE_WORDS.has(cleaned)) return true; // Ignore common abbreviations
  
  // 1. Direct dictionary check
  if (dictSet.has(cleaned)) return true;
  
  // 2. Check suffix stripping: e.g., buku-nya, makan-lah, rumah-ku
  for (const suffix of INDONESIAN_SUFFIXES) {
    if (cleaned.endsWith(suffix) && cleaned.length > suffix.length + 2) {
      const base = cleaned.slice(0, -suffix.length);
      if (dictSet.has(base)) return true;
      
      // Also try combined prefix stripping: me-makan-nya, di-tulis-nya
      for (const prefix of INDONESIAN_PREFIXES) {
        if (base.startsWith(prefix) && base.length > prefix.length + 2) {
          const stem = base.slice(prefix.length);
          if (dictSet.has(stem)) return true;
        }
      }
    }
  }
  
  // 3. Check prefix stripping: e.g., di-tulis, ber-main, ter-tidur
  for (const prefix of INDONESIAN_PREFIXES) {
    if (cleaned.startsWith(prefix) && cleaned.length > prefix.length + 2) {
      const stem = cleaned.slice(prefix.length);
      if (dictSet.has(stem)) return true;
    }
  }

  // 4. Reverse sound change nasalization rules (K-T-S-P rules for me- and pe- prefixes)
  if (checkIndonesianNasalization(cleaned, dictSet)) {
    return true;
  }
  
  return false;
}

// Reverses standard KTSP nasalization sound-changes in Indonesian
function checkIndonesianNasalization(cleaned, dictSet) {
  // Pattern 1: men- + Vowel -> t-Vowel (e.g. menulis -> tulis, menari -> tari)
  if (/^men[aeiou]/i.test(cleaned) && cleaned.length > 4) {
    const stem = 't' + cleaned.slice(3);
    if (dictSet.has(stem)) return true;
  }
  // Pattern 2: mem- + Vowel -> p-Vowel (e.g. memakai -> pakai, memukul -> pukul)
  if (/^mem[aeiou]/i.test(cleaned) && cleaned.length > 4) {
    const stem = 'p' + cleaned.slice(3);
    if (dictSet.has(stem)) return true;
  }
  // Pattern 3: meny- + Vowel -> s-Vowel (e.g. menyapu -> sapu, menyembah -> sembah)
  if (/^meny[aeiou]/i.test(cleaned) && cleaned.length > 5) {
    const stem = 's' + cleaned.slice(4);
    if (dictSet.has(stem)) return true;
  }
  // Pattern 4: meng- + Vowel -> k-Vowel (e.g. mengirim -> kirim, mengunci -> kunci)
  if (/^meng[aeiou]/i.test(cleaned) && cleaned.length > 5) {
    const stem = 'k' + cleaned.slice(4);
    if (dictSet.has(stem)) return true;
  }

  // Do identical checks for noun agent prefix 'pe-' (pen-, pem-, peny-, peng-)
  if (/^pen[aeiou]/i.test(cleaned) && cleaned.length > 4) {
    const stem = 't' + cleaned.slice(3);
    if (dictSet.has(stem)) return true;
  }
  if (/^pem[aeiou]/i.test(cleaned) && cleaned.length > 4) {
    const stem = 'p' + cleaned.slice(3);
    if (dictSet.has(stem)) return true;
  }
  if (/^peny[aeiou]/i.test(cleaned) && cleaned.length > 5) {
    const stem = 's' + cleaned.slice(4);
    if (dictSet.has(stem)) return true;
  }
  if (/^peng[aeiou]/i.test(cleaned) && cleaned.length > 5) {
    const stem = 'k' + cleaned.slice(4);
    if (dictSet.has(stem)) return true;
  }
  
  return false;
}

// Find closest spelling match in dictionary using Levenshtein distance
export function findSpellingCorrection(wrongWord, dictSet) {
  const target = wrongWord.toLowerCase();
  
  // 1. Direct slang translation fallback (takes precedence)
  if (SLANG_DICTIONARY[target]) {
    return SLANG_DICTIONARY[target];
  }
  
  let bestMatch = null;
  let minDistance = 999;
  
  // Combine all active dictionary entries to search
  const allWords = dictSet ? [...dictSet] : [...STATIC_DICTIONARY, ...onlineWords];
  
  // Filter candidates to ensure extremely fast search times (under 2ms)
  const firstChar = target.charAt(0);
  const candidates = allWords.filter(word => {
    // Only check words within +/- 1 character in length, sharing the same starting letter
    return Math.abs(word.length - target.length) <= 1 && word.charAt(0) === firstChar;
  });
  
  // If no candidates found with the same starting letter, check general words of similar length
  const finalCandidates = candidates.length > 0 
    ? candidates 
    : allWords.filter(word => Math.abs(word.length - target.length) <= 1);
  
  for (const word of finalCandidates) {
    const distance = getLevenshteinDistance(target, word);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = word;
    }
    // Early exit if exact match found or distance is 1 (fast enough)
    if (minDistance === 1) break;
  }
  
  // Return the closest candidate if it is highly relevant (Levenshtein distance <= 2)
  if (bestMatch && minDistance <= 2) {
    // Retain capitalization pattern of the original input word
    if (wrongWord.charAt(0) === wrongWord.charAt(0).toUpperCase()) {
      return bestMatch.charAt(0).toUpperCase() + bestMatch.slice(1);
    }
    return bestMatch;
  }
  
  return null;
}

// Spellcheck entire paragraph, returning corrections matching the app's output schema
export function spellcheckText(text) {
  const corrections = [];
  if (!text) return corrections;
  
  // Build aggregated active dictionary
  const activeDict = new Set([...STATIC_DICTIONARY, ...onlineWords]);
  
  // Extract individual words, ignoring numbers and standard punctuation
  const wordMatches = [...text.matchAll(/[a-zA-ZÀ-ÿ'’-]+/g)];
  
  const checkedWords = new Set();
  
  wordMatches.forEach(match => {
    const originalWord = match[0];
    const cleaned = originalWord.trim();
    const lowercaseCleaned = cleaned.toLowerCase();
    
    if (!cleaned || checkedWords.has(lowercaseCleaned)) return;
    checkedWords.add(lowercaseCleaned);
    
    // Check if the word is spelling valid
    const isValid = checkWordIsValid(cleaned, activeDict);
    
    if (!isValid) {
      // Find a suitable correction suggestion
      const suggestion = findSpellingCorrection(cleaned, activeDict);
      if (suggestion && suggestion.toLowerCase() !== lowercaseCleaned) {
        corrections.push({
          wrong: cleaned,
          correct: suggestion
        });
      }
    }
  });
  
  return corrections;
}
