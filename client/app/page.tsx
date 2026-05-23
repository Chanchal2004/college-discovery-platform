'use client';
import { useState, useEffect, useCallback } from 'react';
import { collegesAPI, savedAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useCompare } from '@/lib/compare-context';
import CollegeCard from '@/components/CollegeCard';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { count } = useCompare();
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ location: '', fees_max: '', course: '', sort: 'rating' });
  const [filterOptions, setFilterOptions] = useState<{ locations: string[]; courses: string[] }>({ locations: [], courses: [] });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Load filter options
  useEffect(() => {
    collegesAPI.filters().then(setFilterOptions).catch(console.error);
  }, []);

  // Load colleges
  const loadColleges = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: '12', sort: filters.sort };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.location) params.location = filters.location;
      if (filters.fees_max) params.fees_max = filters.fees_max;
      if (filters.course) params.course = filters.course;

      const data = await collegesAPI.list(params);
      setColleges(data.colleges);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Failed to load colleges:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  useEffect(() => {
    loadColleges(1);
  }, [loadColleges]);

  const handleToggleSave = async (id: number) => {
    if (!isAuthenticated) return;
    try {
      const result = await savedAPI.toggleCollege(id);
      setColleges(prev => prev.map(c => c.id === id ? { ...c, is_saved: result.saved } : c));
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6c5ce7]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#6c5ce7]/10 rounded-full blur-[120px]" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-[#fd79a8]/8 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Discover</span> Your
            <br />Perfect College
          </h1>
          <p className="text-lg text-[#9898b0] max-w-2xl mx-auto mb-8">
            Explore {pagination.total || '...'} colleges, compare programs, and make the best decision for your future.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative glass rounded-2xl p-1 glow">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#6c5ce7] ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search colleges by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-[#9898b0] outline-none text-base"
                  id="search-input"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 mr-2 rounded-xl text-sm font-medium transition-all ${
                    showFilters ? 'bg-[#6c5ce7] text-white' : 'text-[#9898b0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  ⚙ Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-2xl glass animate-slide-down">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FilterSelect
                label="Location"
                value={filters.location}
                onChange={(v) => setFilters(f => ({ ...f, location: v }))}
                options={filterOptions.locations}
                placeholder="All States"
              />
              <FilterSelect
                label="Max Fees"
                value={filters.fees_max}
                onChange={(v) => setFilters(f => ({ ...f, fees_max: v }))}
                options={['100000', '200000', '300000', '500000', '1000000']}
                labels={['Under ₹1L', 'Under ₹2L', 'Under ₹3L', 'Under ₹5L', 'Under ₹10L']}
                placeholder="Any Budget"
              />
              <FilterSelect
                label="Course"
                value={filters.course}
                onChange={(v) => setFilters(f => ({ ...f, course: v }))}
                options={filterOptions.courses}
                placeholder="All Courses"
              />
              <FilterSelect
                label="Sort By"
                value={filters.sort}
                onChange={(v) => setFilters(f => ({ ...f, sort: v }))}
                options={['rating', 'fees_low', 'fees_high', 'name', 'placement']}
                labels={['Rating', 'Fees: Low to High', 'Fees: High to Low', 'Name', 'Placement Rate']}
                placeholder=""
                noAll
              />
            </div>
            <button
              onClick={() => setFilters({ location: '', fees_max: '', course: '', sort: 'rating' })}
              className="mt-4 text-xs text-[#9898b0] hover:text-[#a29bfe] transition-colors"
            >
              ✕ Clear all filters
            </button>
          </div>
        )}

        {/* Compare floating bar */}
        {count > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass rounded-2xl px-6 py-3 glow animate-fade-in-up flex items-center gap-4">
            <span className="text-sm text-[#9898b0]">
              <span className="text-[#a29bfe] font-semibold">{count}</span> college{count > 1 ? 's' : ''} selected
            </span>
            <Link
              href="/compare"
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#6c5ce7] text-white hover:bg-[#5b4bd6] transition-colors"
            >
              Compare Now →
            </Link>
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#9898b0]">
            Showing <span className="text-white font-medium">{colleges.length}</span> of{' '}
            <span className="text-white font-medium">{pagination.total}</span> colleges
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/6 bg-[#1a1a2e] p-5 space-y-4">
                <div className="h-4 w-3/4 skeleton rounded" />
                <div className="h-3 w-1/2 skeleton rounded" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-12 skeleton rounded-lg" />
                  <div className="h-12 skeleton rounded-lg" />
                  <div className="h-12 skeleton rounded-lg" />
                </div>
                <div className="h-8 skeleton rounded-lg" />
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🎓</p>
            <h3 className="text-xl font-semibold text-white mb-2">No colleges found</h3>
            <p className="text-[#9898b0]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, i) => (
              <CollegeCard
                key={college.id}
                college={college}
                index={i}
                onToggleSave={isAuthenticated ? handleToggleSave : undefined}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => loadColleges(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-[#9898b0] hover:text-white hover:border-[#6c5ce7]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => loadColleges(page)}
                  className={`w-10 h-10 text-sm rounded-lg font-medium transition-all ${
                    page === pagination.page
                      ? 'bg-[#6c5ce7] text-white'
                      : 'text-[#9898b0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => loadColleges(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-[#9898b0] hover:text-white hover:border-[#6c5ce7]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label, value, onChange, options, labels, placeholder, noAll,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; labels?: string[]; placeholder: string; noAll?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#9898b0] mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#12121a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#6c5ce7]/50 transition-colors appearance-none cursor-pointer"
      >
        {!noAll && <option value="">{placeholder}</option>}
        {options.map((opt, i) => (
          <option key={opt} value={opt}>{labels?.[i] || opt}</option>
        ))}
      </select>
    </div>
  );
}
