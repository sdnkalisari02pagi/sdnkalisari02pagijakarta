import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://sdnkalisari02pagijakarta.sch.id';

async function generateSitemap() {
  console.log('Generating sitemap...');

  // 1. Load Supabase credentials from .env
  let supabaseUrl = process.env.VITE_SUPABASE_URL;
  let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
    const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);
    
    if (urlMatch && !supabaseUrl) supabaseUrl = urlMatch[1].trim();
    if (keyMatch && !supabaseAnonKey) supabaseAnonKey = keyMatch[1].trim();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Supabase environment variables not found in environment or .env file.');
    process.exit(1);
  }

  console.log('Fetching dynamic routes from Supabase...');
  const headers = {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`
  };

  let beritaIds = [];
  let prestasiIds = [];
  let ekskulIds = [];

  try {
    const beritaRes = await fetch(`${supabaseUrl}/rest/v1/berita?select=id`, { headers });
    if (beritaRes.ok) {
      const data = await beritaRes.json();
      beritaIds = data.map(item => item.id);
    } else {
      console.warn('Warning: Failed to fetch berita from Supabase REST API.');
    }
  } catch (error) {
    console.error('Error fetching berita:', error);
  }

  try {
    const prestasiRes = await fetch(`${supabaseUrl}/rest/v1/prestasi?select=id`, { headers });
    if (prestasiRes.ok) {
      const data = await prestasiRes.json();
      prestasiIds = data.map(item => item.id);
    } else {
      console.warn('Warning: Failed to fetch prestasi from Supabase REST API.');
    }
  } catch (error) {
    console.error('Error fetching prestasi:', error);
  }

  try {
    const ekskulRes = await fetch(`${supabaseUrl}/rest/v1/ekstrakurikuler?select=id`, { headers });
    if (ekskulRes.ok) {
      const data = await ekskulRes.json();
      ekskulIds = data.map(item => item.id);
    } else {
      console.warn('Warning: Failed to fetch ekstrakurikuler from Supabase REST API.');
    }
  } catch (error) {
    console.error('Error fetching ekstrakurikuler:', error);
  }

  console.log(`Fetched: ${beritaIds.length} berita, ${prestasiIds.length} prestasi, ${ekskulIds.length} ekstrakurikuler.`);

  // 2. Define static routes
  const staticRoutes = [
    '/',
    '/profil',
    '/berita',
    '/prestasi',
    '/ekstrakurikuler',
    '/dokumen',
    '/hasil-tka',
    '/kontak'
  ];

  // 3. Construct all URLs
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  // Add static routes
  staticRoutes.forEach(route => {
    urls.push({
      loc: `${siteUrl}${route === '/' ? '' : route}`,
      lastmod: today,
      changefreq: route === '/' ? 'daily' : 'weekly',
      priority: route === '/' ? '1.0' : '0.8'
    });
  });

  // Add dynamic berita
  beritaIds.forEach(id => {
    urls.push({
      loc: `${siteUrl}/berita/${id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.6'
    });
  });

  // Add dynamic prestasi
  prestasiIds.forEach(id => {
    urls.push({
      loc: `${siteUrl}/prestasi/${id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.6'
    });
  });

  // Add dynamic ekstrakurikuler
  ekskulIds.forEach(id => {
    urls.push({
      loc: `${siteUrl}/ekstrakurikuler/${id}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.6'
    });
  });

  // 4. Build sitemap.xml content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach(url => {
    xml += `  <url>\n`;
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // 5. Write to public/sitemap.xml and dist/sitemap.xml (if dist exists)
  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`Sitemap written to ${publicPath}`);

  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml, 'utf8');
    console.log(`Sitemap copied to ${distPath}/sitemap.xml`);
  }

  // 6. Update robots.txt to include Sitemap location
  const sitemapLine = `Sitemap: ${siteUrl}/sitemap.xml`;
  
  const updateRobots = (robotsFilePath) => {
    if (fs.existsSync(robotsFilePath)) {
      let content = fs.readFileSync(robotsFilePath, 'utf8');
      if (!content.includes('Sitemap:')) {
        content = content.trim() + '\n\n' + sitemapLine + '\n';
        fs.writeFileSync(robotsFilePath, content, 'utf8');
        console.log(`Robots.txt updated at ${robotsFilePath}`);
      } else if (!content.includes(sitemapLine)) {
        // Replace existing sitemap directive or add this specific one
        content = content.replace(/Sitemap:\s*\S+/g, sitemapLine);
        fs.writeFileSync(robotsFilePath, content, 'utf8');
        console.log(`Robots.txt sitemap directive updated at ${robotsFilePath}`);
      }
    }
  };

  updateRobots(path.join(__dirname, '../public/robots.txt'));
  if (fs.existsSync(distPath)) {
    updateRobots(path.join(distPath, 'robots.txt'));
  }

  console.log('Sitemap generation complete!');
}

generateSitemap();
