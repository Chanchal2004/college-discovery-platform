'use client';
import { useState, useEffect } from 'react';
import { savedAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useCompare } from '@/lib/compare-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CollegeCard from '@/components/CollegeCard';

export default function SavedPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { setSelectedIds } = useCompare();
  const [tab, setTab] = useState<'colleges' | 'comparisons'>('colleges');
  const [colleges, setColleges] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return; }
    loadData();
  }, [isAuthenticated, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [c, comp] = await Promise.all([savedAPI.getColleges(), savedAPI.getComparisons()]);
      setColleges(c.colleges);
      setComparisons(comp.comparisons);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (id: number) => {
    try {
      await savedAPI.toggleCollege(id);
      setColleges(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComparison = async (id: number) => {
    try {
      await savedAPI.deleteComparison(id);
      setComparisons(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadComparison = (collegeIds: number[]) => {
    setSelectedIds(collegeIds);
    router.push('/compare');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-2">Saved Items</h1>
      <p className="text-[#9898b0] mb-8">Your bookmarked colleges and comparisons</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 glass rounded-xl w-fit">
        <button
          onClick={() => setTab('colleges')}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'colleges' ? 'bg-[#6c5ce7] text-white' : 'text-[#9898b0] hover:text-white'}`}
        >
          Colleges ({colleges.length})
        </button>
        <button
          onClick={() => setTab('comparisons')}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'comparisons' ? 'bg-[#6c5ce7] text-white' : 'text-[#9898b0] hover:text-white'}`}
        >
          Comparisons ({comparisons.length})
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 skeleton rounded-2xl" />
          ))}
        </div>
      ) : tab === 'colleges' ? (
        colleges.length === 0 ? (
          <EmptyState icon="♡" title="No saved colleges" desc="Save colleges from the explore page to see them here." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((c, i) => (
              <CollegeCard key={c.id} college={{ ...c, is_saved: true }} index={i} onToggleSave={handleUnsave} />
            ))}
          </div>
        )
      ) : comparisons.length === 0 ? (
        <EmptyState icon="⚖️" title="No saved comparisons" desc="Save a comparison from the compare page." />
      ) : (
        <div className="space-y-4">
          {comparisons.map(comp => (
            <div key={comp.id} className="glass rounded-xl p-5 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{comp.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {comp.colleges?.map((c: any) => (
                      <span key={c.id} className="px-2 py-0.5 text-xs rounded-md bg-[#6c5ce7]/10 text-[#a29bfe]">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLoadComparison(comp.college_ids)}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-[#6c5ce7]/15 text-[#a29bfe] hover:bg-[#6c5ce7]/25 transition-colors"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => handleDeleteComparison(comp.id)}
                    className="px-3 py-2 text-xs rounded-lg border border-white/10 text-[#e17055] hover:border-[#e17055]/30 transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">{icon}</p>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#9898b0] mb-6">{desc}</p>
      <Link href="/" className="px-6 py-2.5 rounded-xl bg-[#6c5ce7] text-white text-sm font-semibold hover:bg-[#5b4bd6] transition-colors inline-block">
        Explore Colleges
      </Link>
    </div>
  );
}
