import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { useSeoMeta } from '../utils/useSeoMeta';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useSeoMeta({
    title: post ? `${post.title} — CIAF Tech` : 'Article Not Found — CIAF Tech',
    description: post ? post.excerpt : 'Smart TV optimization guides by CIAF Tech.',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: `https://ciaftech.com${post.coverImage}`,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'CIAF Tech',
          },
          mainEntityOfPage: `https://ciaftech.com/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Guide not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The article you requested could not be found.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Guides
        </Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/blog"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Smart TV Guides
      </Link>

      {/* Post Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-md bg-sky-100 px-2.5 py-1 font-bold text-sky-800">
            {post.category}
          </span>
          <span className="font-medium text-slate-600">{post.regionFocus}</span>
          <span className="inline-flex items-center gap-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>

        <p className="text-base leading-relaxed text-slate-600">{post.excerpt}</p>

        <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">{post.author}</p>
            <p>
              {post.authorRole} • Updated {post.publishedAt}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="aspect-video w-full object-cover"
          />
        </div>
      </header>

      {/* Article Body */}
      <div className="mt-10 space-y-10">
        {post.sections.map((section, idx) => (
          <React.Fragment key={section.heading}>
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((para) => (
                <p key={para} className="text-base leading-relaxed text-slate-700">
                  {para}
                </p>
              ))}
              {section.image && (
                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  {section.image.caption && (
                    <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
                      {section.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {section.bullets && (
                <ul className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Native Mid-Article Player License Callout */}
            {idx === 0 && (
              <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-6 shadow-md sm:p-7">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      Built-In VPN + Zero-Lag Engine
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Upgrade Your Tizen or webOS TV with CIAF Player v4.2
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Compatible with your Smart TV and includes integrated VPN protection so shows, movies, and football games play smoothly all the time.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:from-sky-400 hover:to-indigo-500"
                    >
                      Get License + VPN <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to="/uk"
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      🇬🇧 UK Setup
                    </Link>
                    <Link
                      to="/ca"
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      🇨🇦 CA Setup
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {post.cta && (
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-7 text-white shadow-xl sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="space-y-2">
                {post.cta.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    {post.cta.badge}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">
                  {post.cta.heading}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                  {post.cta.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to={post.cta.primaryTo}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:from-sky-400 hover:to-indigo-400"
                >
                  {post.cta.primaryLabel} <ArrowRight className="h-4 w-4" />
                </Link>
                {post.cta.secondaryLabel && post.cta.secondaryTo && (
                  <Link
                    to={post.cta.secondaryTo}
                    className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:bg-white/20"
                  >
                    {post.cta.secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Guides */}
      <section className="mt-16 border-t border-slate-200 pt-10">
        <h3 className="mb-5 font-display text-xl font-bold text-slate-900">
          More Smart TV Optimization Guides
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.slug}
              to={`/blog/${r.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300"
            >
              <span className="text-[11px] font-bold text-sky-700">{r.category}</span>
              <h4 className="mt-1 font-display text-base font-bold text-slate-900">{r.title}</h4>
              <p className="mt-2 text-xs text-slate-600">{r.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};
