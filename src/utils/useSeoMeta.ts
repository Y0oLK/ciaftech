import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function useSeoMeta({ title, description, jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    const existingScript = document.getElementById('ciaf-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'ciaf-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById('ciaf-jsonld');
      if (s) s.remove();
    };
  }, [title, description, jsonLd]);
}

