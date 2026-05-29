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
    
    // Custom CSV Parser yang mendukung multiline dalam kutipan
    const parseCSV = (text) => {
      const rows = [];
      let currentRow = [];
      let currentCell = '';
      let inQuotes = false;
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i+1];
        
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            currentCell += '"';
            i++; // skip escaped quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          currentRow.push(currentCell.trim());
          currentCell = '';
        } else if ((char === '\\n' || char === '\\r') && !inQuotes) {
          if (char === '\\r' && nextChar === '\\n') i++; // skip \\r\\n
          currentRow.push(currentCell.trim());
          rows.push(currentRow);
          currentRow = [];
          currentCell = '';
        } else {
          currentCell += char;
        }
      }
      if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
      }
      return rows;
    };

    const lines = parseCSV(csvText);
    if (lines.length < 2) {
      throw new Error('Database kosong');
    }

    const headers = lines[0];
    const headerLower = headers.map(h => h.toLowerCase());
    
    const nisnIdx = headerLower.findIndex(h => h === 'nisn');
    const tglIdx = headerLower.findIndex(h => h.includes('tanggal lahir') || h.includes('tgl lahir'));
    const namaIdx = headerLower.findIndex(h => h.includes('nama') || h === 'nama siswa');
    const klsIdx = headerLower.findIndex(h => h === 'kelas');
    const bindIdx = headerLower.findIndex(h => h.includes('bahasa indonesia'));
    const mtkIdx = headerLower.findIndex(h => h.includes('matematika'));

    // Validasi struktur header
    if (nisnIdx === -1 || tglIdx === -1 || bindIdx === -1 || mtkIdx === -1) {
       console.error("Kolom tidak sesuai:", headers);
       return res.status(500).json({ error: 'Struktur database tidak sesuai. Harap hubungi admin.' });
    }

    const monthMap = {
      'januari': '01',
      'februari': '02',
      'maret': '03',
      'april': '04',
      'mei': '05',
      'juni': '06',
      'juli': '07',
      'agustus': '08',
      'september': '09',
      'oktober': '10',
      'november': '11',
      'desember': '12'
    };

    const normalizeDate = (str) => {
      if (!str) return '';
      const lowerStr = str.toLowerCase();
      
      // Match format: "11 Juni 2013" anywhere in the string
      const regex = /(\d{1,2})\s+([a-z]+)\s+(\d{4})/;
      const match = lowerStr.match(regex);
      if (match) {
        let day = match[1];
        if (day.length === 1) day = '0' + day;
        const month = monthMap[match[2]];
        const year = match[3];
        if (month) return `${day}/${month}/${year}`;
      }
      
      // Match format: "11/06/2013" or "11-06-2013"
      const regexNum = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/;
      const matchNum = str.match(regexNum);
      if (matchNum) {
        let day = matchNum[1];
        let month = matchNum[2];
        if (day.length === 1) day = '0' + day;
        if (month.length === 1) month = '0' + month;
        return `${day}/${month}/${matchNum[3]}`;
      }
      
      return str.trim();
    };

    // Pencarian
    let found = false;
    let result = null;

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row || row.length === 0 || !row[0]) continue;
      
      const rowNisn = row[nisnIdx];
      const rowTgl = normalizeDate(row[tglIdx]);

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
