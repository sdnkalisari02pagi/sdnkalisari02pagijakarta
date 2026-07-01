import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { tr } from '@/lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; item: string }[];
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noindex = false,
  breadcrumbs,
}: SEOProps) {
  const { data } = useSchool();
  const { lang } = useLanguage();
  const location = useLocation();

  const schoolName = 'SDN Kalisari 02 Pagi';
  const siteUrl = 'https://sdnkalisari02pagijakarta.sch.id';
  
  // Default values
  const defaultDesc =
    'Website resmi SDN Kalisari 02 Pagi Jakarta yang menyediakan informasi sekolah, profil sekolah, guru dan tenaga kependidikan, berita, pengumuman, prestasi, ekstrakurikuler, kalender akademik, layanan peserta didik, hasil TKA, galeri, serta informasi lainnya.';
  const defaultLogo = data.logo || `${siteUrl}/placeholder.svg`;
  const schoolLogo = typeof defaultLogo === 'string' && defaultLogo.startsWith('http') 
    ? defaultLogo 
    : `${siteUrl}${defaultLogo.startsWith('/') ? '' : '/'}${defaultLogo}`;
  
  const defaultSchoolImage = data.profil?.fotoSekolah || schoolLogo;
  const schoolImage = typeof defaultSchoolImage === 'string' && defaultSchoolImage.startsWith('http')
    ? defaultSchoolImage
    : `${siteUrl}${defaultSchoolImage.startsWith('/') ? '' : '/'}${defaultSchoolImage}`;

  const activeTitle = title ? `${title} | ${schoolName}` : `${schoolName} - Website Resmi Sekolah`;
  const activeDesc = description || defaultDesc;
  const currentPath = canonicalPath || location.pathname;
  const activeCanonical = `${siteUrl}${currentPath === '/' ? '' : currentPath}`;
  
  const activeOgImage = ogImage || schoolImage;
  const resolvedOgImage = typeof activeOgImage === 'string' && activeOgImage.startsWith('http')
    ? activeOgImage
    : `${siteUrl}${activeOgImage.startsWith('/') ? '' : '/'}${activeOgImage}`;

  useEffect(() => {
    // 1. Update Language Attribute
    document.documentElement.lang = lang || 'id';

    // 2. Document Title
    document.title = activeTitle;

    // 3. Helper to update/create meta tags
    const setMetaTag = (attr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 4. Primary Meta Tags
    setMetaTag('name', 'description', activeDesc);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', activeTitle);
    setMetaTag('property', 'og:description', activeDesc);
    setMetaTag('property', 'og:url', activeCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', resolvedOgImage);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', activeTitle);
    setMetaTag('name', 'twitter:description', activeDesc);
    setMetaTag('name', 'twitter:image', resolvedOgImage);

    // 7. Verification tags (read from env or fallback)
    const googleVerify = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (googleVerify) {
      setMetaTag('name', 'google-site-verification', googleVerify);
    }
    const bingVerify = import.meta.env.VITE_BING_SITE_VERIFICATION;
    if (bingVerify) {
      setMetaTag('name', 'msvalidate.01', bingVerify);
    }

    // 8. Robots Meta Tag (noindex support)
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // 9. Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', activeCanonical);

    // 10. Structured Data (JSON-LD)
    const schoolAddress = tr(data.kontak?.alamat, 'id') || 'Kalisari, Pasar Rebo';
    const schoolPhone = data.kontak?.telepon || '(021) 123456';
    const schoolEmail = data.kontak?.email || 'sdnkalisari02pagi@gmail.com';

    const socials = [];
    if (data.kontak?.instagram) socials.push(data.kontak.instagram);
    if (data.kontak?.youtube) socials.push(data.kontak.youtube);
    if (data.kontak?.tiktok) socials.push(data.kontak.tiktok);

    const schoolSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['School', 'EducationalOrganization', 'Organization'],
          '@id': `${siteUrl}/#school`,
          'name': schoolName,
          'url': siteUrl,
          'logo': schoolLogo,
          'image': schoolImage,
          'description': defaultDesc,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': schoolAddress,
            'addressLocality': 'Jakarta Timur',
            'addressRegion': 'DKI Jakarta',
            'addressCountry': 'ID',
          },
          'telephone': schoolPhone,
          'email': schoolEmail,
          'sameAs': socials.length > 0 ? socials : undefined,
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          'url': siteUrl,
          'name': schoolName,
          'description': defaultDesc,
          'publisher': {
            '@id': `${siteUrl}/#school`,
          },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${siteUrl}/berita?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${activeCanonical}/#webpage`,
          'url': activeCanonical,
          'name': activeTitle,
          'isPartOf': {
            '@id': `${siteUrl}/#website`,
          },
          'about': {
            '@id': `${siteUrl}/#school`,
          },
          'description': activeDesc,
          'inLanguage': lang || 'id',
        },
      ],
    };

    if (location.pathname !== '/' && breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': crumb.name,
          'item': crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`,
        })),
      };
      
      let breadcrumbScript = document.getElementById('json-ld-breadcrumb') as HTMLScriptElement;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.id = 'json-ld-breadcrumb';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    } else {
      const breadcrumbScript = document.getElementById('json-ld-breadcrumb');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    }

    let schoolScript = document.getElementById('json-ld-school') as HTMLScriptElement;
    if (!schoolScript) {
      schoolScript = document.createElement('script');
      schoolScript.type = 'application/ld+json';
      schoolScript.id = 'json-ld-school';
      document.head.appendChild(schoolScript);
    }
    schoolScript.text = JSON.stringify(schoolSchema);

    return () => {};
  }, [
    activeTitle,
    activeDesc,
    activeCanonical,
    resolvedOgImage,
    ogType,
    noindex,
    lang,
    location.pathname,
    breadcrumbs,
    data,
    schoolLogo,
    schoolImage,
  ]);

  return null;
}
