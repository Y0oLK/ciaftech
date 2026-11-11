import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Search } from 'lucide-react';
import { BLOG_POSTS, type BlogCategory, type BlogPost } from '../data/blogs';
import { useSeoMeta } from '../utils/useSeoMeta';

const CATEGORIES: ('All' | BlogCategory)[] = [
  'All',
  'UK Guide',
  'Canada Guide',
  'Europe Guide',
  'USA Guide',
  'Tizen Guides',
  'webOS Tips',
  '4K & Audio',
  'Network Tuning',
];

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogPost['category']>('All');
  const [query, setQuery] = useState('');

  useSeoMeta({
    title: 'Smart TV Player Guides & Best Settings Blog — CIAF Tech',
    description:
      'Step-by-step How-To articles and optimal player calibration guides for Samsung Tizen, LG webOS, 4K HDR decoding, built-in VPN, and home network tuning.',
  });

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesText =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCat && matchesText;
    });
  }, [selectedCategory, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
          <BookOpen className="h-3.5 w-3.5" />
          How-To &amp; Best Player Settings
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl">
          CIAF Tech Smart TV Engineering Blog
        </h1>
        <p className="text-base leading-relaxed text-slate-600">
          Practical calibration tutorials, hardware codec guides, and home network benchmarks written for Samsung Tizen, LG webOS, and Google TV viewers across the UK, Europe, Canada, and the US.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col justify-between gap-4 border-y border-slate-200 py-5 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Tizen, webOS, AV1..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-slate-600">No guides matched your search.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setQuery('');
            }}
            className="mt-3 text-xs font-bold text-sky-600 hover:text-sky-500"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300"
            >
              <div>
                <div className="aspect-video overflow-hidden border-b border-slate-100 bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between text-[11px]">
                    <span className="rounded-md bg-sky-50 px-2.5 py-1 font-bold text-sky-700">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-700">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                <span>
                  {post.author} • {post.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-sky-600">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
