import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>[];
  breadcrumb?: { name: string; url: string }[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'Femtrics | Data Analytics for Women Entrepreneurs | Business Insights & Growth',
  description = 'Femtrics empowers women micro-entrepreneurs across India (Hyderabad, Delhi, Mumbai, Bangalore) with affordable data analytics solutions. Get actionable business insights, revenue tracking, inventory management, and marketing ROI analysis to grow your business.',
  keywords = 'Femtrics, women entrepreneurs India, data analytics for women, business insights, micro-entrepreneurs India, female business owners, data-driven decisions, small business analytics, revenue tracking, inventory management, marketing ROI, business dashboard, women-led businesses, startups India, business growth analytics, Hyderabad, Delhi, Mumbai, Bangalore',
  canonical = 'https://femtrics.site/',
  ogImage = 'https://femtrics.site/cover.png',
  ogType = 'website',
  noindex = false,
  jsonLd = [],
  breadcrumb = []
}) => {
  const siteTitle = title.includes('Femtrics') ? title : `${title} | Femtrics`;
  const fullCanonical = canonical.startsWith('http') ? canonical : `https://femtrics.site${canonical}`;

  // Enhanced Organization Schema with E-E-A-T signals
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://femtrics.site/#organization",
    "name": "Femtrics",
    "url": "https://femtrics.site",
    "logo": {
      "@type": "ImageObject",
      "url": "https://femtrics.site/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Femtrics empowers women micro-entrepreneurs with affordable data analytics solutions and business insights. #1 choice for women entrepreneurs in Hyderabad.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Telugu"],
      "areaServed": ["Hyderabad", "Delhi", "Mumbai", "Bangalore"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "sameAs": [
      "https://www.instagram.com/femtrics",
      "https://www.facebook.com/femtrics",
      "https://www.linkedin.com/company/femtrics",
      "https://twitter.com/femtrics"
    ],
    "foundingDate": "2023",
    "numberOfEmployees": "1-10",
    "areaServed": ["Hyderabad", "Delhi", "Mumbai", "Bangalore"],
    "knowsLanguage": ["English", "Hindi", "Telugu"],
    "serviceType": "Data Analytics Consulting",
    "award": ["Best Women Entrepreneur Support Platform 2024"],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Certification",
      "recognizedBy": "Women Entrepreneurs Association of India"
    }
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://femtrics.site/#localbusiness",
    "name": "Femtrics",
    "url": "https://femtrics.site",
    "telephone": "+91-XXXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "INR",
    "areaServed": ["Hyderabad", "Delhi", "Mumbai", "Bangalore"]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://femtrics.site/#website",
    "url": "https://femtrics.site",
    "name": "Femtrics",
    "description": "Data analytics solutions for women entrepreneurs in India",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://femtrics.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumb.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://femtrics.site${item.url}`
    }))
  } : null;

  // Combine all schemas
  const allSchemas = [organizationSchema, localBusinessSchema, websiteSchema, ...jsonLd];
  if (breadcrumbSchema) {
    allSchemas.push(breadcrumbSchema);
  }

  return (
    <Helmet>
      {/* Primary SEO Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots Tag */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />

      {/* Author and Publisher */}
      <meta name="author" content="Femtrics" />
      <meta name="publisher" content="Femtrics" />

      {/* Geographic and Language Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Content Type */}
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Femtrics - Data Analytics for Women Entrepreneurs" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Femtrics" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_IN" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Femtrics - Data Analytics for Women Entrepreneurs" />
      <meta name="twitter:creator" content="@femtrics" />
      <meta name="twitter:site" content="@femtrics" />
      <meta name="twitter:domain" content="femtrics.site" />

      {/* Hreflang Tags for International SEO */}
      <link rel="alternate" hrefLang="en" href={fullCanonical} />
      <link rel="alternate" hrefLang="en-in" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

      {/* Favicon and Web Manifest */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec4899" />
      <link rel="manifest" href="/manifest.json" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ec4899" />
      <meta name="msapplication-TileColor" content="#ec4899" />
      <meta name="application-name" content="Femtrics" />
      <meta name="apple-mobile-web-app-title" content="Femtrics" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Structured Data */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
