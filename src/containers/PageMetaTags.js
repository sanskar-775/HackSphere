import Head from 'next/head';

function PageMetaTags({ 
  title, 
  description = "Discover global hackathons and events on HackSphere.", 
  url = "", 
  siteName = "HackSphere" 
}) {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = `https://www.hacksphere.com${url}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />

      {/* Open Graph Tags for SEO & Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content="/cover-pic.png" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={fullUrl} />
      <meta name="twitter:image" content="/android-512X512.png" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
}

export default PageMetaTags;
