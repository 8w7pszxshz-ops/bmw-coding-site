import * as React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export function SEO({ title, description, keywords, ogImage, canonical }: SEOProps) {
  const fullTitle = `${title} | Reborn BMW`;
  const defaultImage = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/og-image-1768344534832.jpg';
  const image = ogImage || defaultImage;
  const url = canonical || 'https://reborn-bmw.poehali.app/';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
