'use client';
import { useState, useEffect } from 'react';
import { collegesAPI, savedAPI } from '@/lib/api';
import { useCompare } from '@/lib/compare-context';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function ComparePage() {
  const { selectedIds, clearAll, toggleCollege } = useCompare();
  const { isAuthenticated } = useAuth();
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (selectedIds.length >= 2) {
      setLoading(true);
      collegesAPI.compare(selectedIds)
        .then(data => setColleges(data.colleges))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setColleges([]);
    }
  }, [selectedIds]);

  const fmt = (v: number | string | null) => {
    if (!v) return 'N/A';
    const n = typeof v === 'string' ? parseFloat(v) : v;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };

  const handleSave = async () => {
    if (!saveName.trim()) return;
    try {
      await savedAPI.saveComparison(saveName, selectedIds);
      setSaveSuccess(true);
      setTimeout(() => { setShowSaveModal(false); setSaveSuccess(false); setSaveName(''); }, 1500);
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const comparisonRows = [
    { label: 'Location', key: 'location', render: (c: any) => `${c.city}, ${c.state}` },
    { label: 'Type', key: 'type', render: (c: any) => c.type },
    { label: 'Established', key: 'established', render: (c: any) => c.established },
    { label: 'Rating', key: 'rating', render: (c: any) => `${parseFloat(c.rating).toFixed(1)} ★`, highlight: true },
    { label: 'Fee Range', key: 'fees', render: (c: any) => `${fmt(c.fees_min)} - ${fmt(c.fees_max)}` },
    { label: 'Placement Rate', key: 'placement_rate', render: (c: any) => c.placement_rate ? `${parseFloat(c.placement_rate).toFixed(1)}%` : 'N/A', highlight: true },
    { label: 'Avg Package', key: 'avg_package', render: (c: any) => fmt(c.avg_package), highlight: true },
    { label: 'Highest Package', key: 'highest_package', render: (c: any) => fmt(c.highest_package) },
    { label: 'Campus Size', key: 'campus_size', render: (c: any) => c.campus_size || 'N/A' },
    { label: 'Courses Offered', key: 'courses', render: (c: any) => c.courses?.length || 0 },
  ];

  const getBestValue = (key: string) => {
    if (colleges.length < 2) return -1;
    const numKeys: Record<string, (c: any) => number> = {
      rating: c => parseFloat(c.rating),
      placement_rate: c => parseFloat(c.placement_rate) || 0,
      avg_package: c => parseFloat(c.avg_package) || 0,
    };
    if (!numKeys[key]) return -1;
    let bestIdx = 0;
    let bestVal = numKeys[key](colleges[0]);
    colleges.forEach((c, i) => {
      const val = numKeys[key](c);
      if (val > bestVal) { bestVal = val; bestIdx = i; }
    });
    return bestIdx;
  };

  if (selectedIds.length < 2) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md animate-fade-in">
          <p className="text-6xl mb-6">⚖️</p>
          <h1 className="text-3xl font-bold text-white mb-3">Compare Colleges</h1>
          <p className="text-[#9898b0] mb-2">
            Select <span className="text-[#a29bfe] font-semibold">2-3 colleges</span> from the explore page to start comparing.
          </p>
          <p className="text-sm text-[#9898b0] mb-8">
            {selectedIds.length === 0 ? 'No colleges selected yet.' : `${selectedIds.length} college selected. Need at least 2.`}
          </p>
          <Link href="/" className="px-6 py-3 rounded-xl bg-[#6c5ce7] text-white font-semibold hover:bg-[#5b4bd6] transition-colors inline-block">
            ← Browse Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Compare Colleges</h1>
          <p className="text-sm text-[#9898b0] mt-1">Side-by-side comparison of {colleges.length} colleges</p>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 text-sm rounded-xl border border-white/10 text-[#9898b0] hover:text-[#a29bfe] hover:border-[#6c5ce7]/50 transition-all"
            >
              💾 Save Comparison
            </button>
          )}
          <button onClick={clearAll} className="px-4 py-2 text-sm rounded-xl border border-white/10 text-[#e17055] hover:border-[#e17055]/50 transition-all">
            ✕ Clear All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({length:8}).map((_,i)=><div key={i} className="h-14 skeleton rounded-xl"/>)}</div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          {/* College headers */}
          <div className="grid border-b border-white/5" style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}>
            <div className="p-4 bg-white/[0.02]">
              <span className="text-xs font-semibold text-[#9898b0] uppercase tracking-wider">Criteria</span>
            </div>
            {colleges.map((c, i) => (
              <div key={c.id} className="p-4 text-center border-l border-white/5 relative group">
                <button
                  onClick={() => toggleCollege(c.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full text-xs text-[#9898b0] hover:text-[#e17055] hover:bg-[#e17055]/10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                >
                  ✕
                </button>
                <Link href={`/college/${c.id}`} className="text-sm font-semibold text-white hover:text-[#a29bfe] transition-colors line-clamp-2">
                  {c.name}
                </Link>
                <p className="text-xs text-[#9898b0] mt-1">{c.city}</p>
                {i === 0 && colleges.length > 1 && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#fdcb6e]/15 text-[#fdcb6e]">
                    TOP RATED
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          {comparisonRows.map((row, ri) => {
            const bestIdx = row.highlight ? getBestValue(row.key) : -1;
            return (
              <div
                key={row.key}
                className={`grid border-b border-white/5 ${ri % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}
              >
                <div className="p-4 flex items-center">
                  <span className="text-sm text-[#9898b0]">{row.label}</span>
                </div>
                {colleges.map((c, ci) => (
                  <div key={c.id} className={`p-4 text-center border-l border-white/5 flex items-center justify-center ${bestIdx === ci ? 'bg-[#00b894]/5' : ''}`}>
                    <span className={`text-sm font-medium ${bestIdx === ci ? 'text-[#00b894]' : 'text-white'}`}>
                      {row.render(c)}
                      {bestIdx === ci && ' 🏆'}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Course comparison */}
          <div className="grid border-b border-white/5" style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}>
            <div className="p-4 flex items-start">
              <span className="text-sm text-[#9898b0]">Top Courses</span>
            </div>
            {colleges.map(c => (
              <div key={c.id} className="p-4 border-l border-white/5">
                <div className="flex flex-wrap gap-1">
                  {c.courses?.slice(0, 4).map((course: any) => (
                    <span key={course.id} className="px-2 py-0.5 text-[10px] rounded-md bg-[#6c5ce7]/10 text-[#a29bfe]">
                      {course.degree_type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={() => setShowSaveModal(false)}>
          <div className="glass rounded-2xl p-6 w-full max-w-sm mx-4 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            {saveSuccess ? (
              <div className="text-center py-4">
                <p className="text-4xl mb-3">✅</p>
                <p className="text-white font-semibold">Comparison saved!</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white mb-4">Save Comparison</h3>
                <input
                  type="text"
                  placeholder="Comparison name..."
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#9898b0] outline-none focus:border-[#6c5ce7]/50 mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowSaveModal(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-[#9898b0] text-sm">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="flex-1 py-2 rounded-xl bg-[#6c5ce7] text-white text-sm font-semibold">
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
