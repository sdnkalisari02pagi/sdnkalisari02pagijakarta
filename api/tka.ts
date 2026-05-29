export default async function handler(req, res) {
  // Hanya menerima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nisn, tanggalLahir } = req.body;

  // Validasi input
  if (!nisn || !tanggalLahir) {
    return res.status(400).json({ error: 'NISN dan Tanggal Lahir diperlukan.' });
  }

  // Rate Limiting (In-memory sederhana untuk mencegah spamming brute force cepat)
  // Perhatian: Ini akan di-reset setiap cold start serverless, namun cukup untuk basic protection
  if (!global.rateLimitMap) {
    global.rateLimitMap = new Map();
  }
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  if (global.rateLimitMap.has(ip)) {
    const data = global.rateLimitMap.get(ip);
    if (now - data.timestamp < 60000) { // 1 menit window
      if (data.count >= 10) { // Max 10 request per menit
        return res.status(429).json({ error: 'Terlalu banyak permintaan. Silakan coba lagi sebentar.' });
      }
      data.count++;
    } else {
      global.rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  } else {
    global.rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  try {
    // Gunakan Environment Variable atau fallback ke link yang diberikan
    const csvUrl = process.env.TKA_CSV_URL || 'https://docs.google.com/spreadsheets/d/1ZoN87HKF0eauT6_-6KOvtiU1m4XbMm0lZOH4-rtQfGo/export?format=csv';
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error('Gagal mengakses database');
    }
    
    const csvText = await response.text();
    
    // Custom CSV Parser sederhana
    const lines = csvText.split(/\r?\n/);
    if (lines.length < 2) {
      throw new Error('Database kosong');
    }

    // Ambil header
    const parseCSVLine = (line) => {
      let row = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim());
      return row.map(c => c.replace(/^"(.*)"$/, '$1').trim());
    };

    const headers = parseCSVLine(lines[0]);
    const headerLower = headers.map(h => h.toLowerCase());
    
    const nisnIdx = headerLower.findIndex(h => h === 'nisn');
    const tglIdx = headerLower.findIndex(h => h.includes('tanggal lahir') || h.includes('tgl lahir'));
    const namaIdx = headerLower.findIndex(h => h === 'nama' || h === 'nama siswa');
    const klsIdx = headerLower.findIndex(h => h === 'kelas');
    const bindIdx = headerLower.findIndex(h => h.includes('bahasa indonesia'));
    const mtkIdx = headerLower.findIndex(h => h.includes('matematika'));

    // Validasi struktur header
    if (nisnIdx === -1 || tglIdx === -1 || bindIdx === -1 || mtkIdx === -1) {
       console.error("Kolom tidak sesuai:", headers);
       return res.status(500).json({ error: 'Struktur database tidak sesuai. Harap hubungi admin.' });
    }

    // Pencarian
    let found = false;
    let result = null;

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const row = parseCSVLine(lines[i]);
      const rowNisn = row[nisnIdx];
      const rowTgl = row[tglIdx];

      if (rowNisn === nisn && rowTgl === tanggalLahir) {
        result = {
          nama: namaIdx !== -1 ? row[namaIdx] : '-',
          kelas: klsIdx !== -1 ? row[klsIdx] : '-',
          bahasaIndonesia: row[bindIdx] || '0',
          matematika: row[mtkIdx] || '0'
        };
        found = true;
        break;
      }
    }

    if (found && result) {
      return res.status(200).json(result);
    } else {
      // Jika loop selesai tapi tidak ada yang cocok
      return res.status(404).json({ error: 'NISN atau Tanggal Lahir tidak sesuai, atau data tidak ditemukan.' });
    }

  } catch (error) {
    console.error('API Error:', error.message);
    // Sembunyikan detail error dari user
    return res.status(500).json({ error: 'Terjadi kesalahan pada server saat memproses data.' });
  }
}
