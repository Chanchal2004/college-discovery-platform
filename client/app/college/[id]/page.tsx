'use client';
import { useState, useEffect, use } from 'react';
import { collegesAPI } from '@/lib/api';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

export default function CollegeDetailPage({ params }: { params: Params }) {
  const { id } = use(params);
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    collegesAPI.detail(id).then(setCollege).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="h-8 w-1/2 skeleton rounded" />
        <div className="h-4 w-1/3 skeleton rounded" />
        <div className="grid grid-cols-4 gap-4">{Array.from({length:4}).map((_,i)=><div key={i} className="h-24 skeleton rounded-xl"/>)}</div>
      </div>
    </div>
  );

  if (!college) return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-white mb-2">College not found</h2>
      <Link href="/" className="text-[#a29bfe] hover:underline">← Back to explore</Link>
    </div>
  );

  const fmt = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
    return `₹${v}`;
  };

  const tabs = ['overview', 'courses', 'placements', 'reviews'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#9898b0] mb-6">
        <Link href="/" className="hover:text-[#a29bfe] transition-colors">Explore</Link>
        <span>/</span>
        <span className="text-white">{college.name}</span>
      </div>

      {/* Header */}
      <div className="glass rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#9898b0]">
              <span className="flex items-center gap-1">📍 {college.location}</span>
              <span className="flex items-center gap-1">🏛 Est. {college.established}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${college.type === 'Public' ? 'bg-[#00b894]/15 text-[#00b894]' : 'bg-[#a29bfe]/15 text-[#a29bfe]'}`}>
                {college.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fdcb6e]/10">
            <span className="text-2xl font-bold text-[#fdcb6e]">{parseFloat(college.rating).toFixed(1)}</span>
            <span className="text-[#fdcb6e]">★</span>
          </div>
        </div>
        {college.description && <p className="mt-4 text-sm text-[#9898b0] leading-relaxed">{college.description}</p>}

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <QuickStat label="Annual Fees" value={`${fmt(college.fees_min)} - ${fmt(college.fees_max)}`} icon="💰" />
          <QuickStat label="Placement Rate" value={college.placement_rate ? `${parseFloat(college.placement_rate).toFixed(0)}%` : 'N/A'} icon="📈" />
          <QuickStat label="Avg Package" value={college.avg_package ? fmt(parseFloat(college.avg_package)) : 'N/A'} icon="💼" />
          <QuickStat label="Highest Package" value={college.highest_package ? fmt(parseFloat(college.highest_package)) : 'N/A'} icon="🚀" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 glass rounded-xl overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[100px] px-4 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${
              activeTab === tab ? 'bg-[#6c5ce7] text-white' : 'text-[#9898b0] hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && <OverviewTab college={college} fmt={fmt} />}
        {activeTab === 'courses' && <CoursesTab courses={college.courses} fmt={fmt} />}
        {activeTab === 'placements' && <PlacementsTab placements={college.placements} fmt={fmt} />}
        {activeTab === 'reviews' && <ReviewsTab reviews={college.reviews} />}
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
      <p className="text-lg mb-1">{icon}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
      <p className="text-xs text-[#9898b0] mt-0.5">{label}</p>
    </div>
  );
}

function OverviewTab({ college, fmt }: { college: any; fmt: (v: number) => string }) {
  const details = [
    { label: 'Location', value: `${college.city}, ${college.state}` },
    { label: 'Type', value: college.type },
    { label: 'Established', value: college.established },
    { label: 'Campus Size', value: college.campus_size || 'N/A' },
    { label: 'Fee Range', value: `${fmt(college.fees_min)} - ${fmt(college.fees_max)}` },
    { label: 'Website', value: college.website || 'N/A' },
  ];
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">College Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map(d => (
          <div key={d.label} className="flex justify-between p-3 rounded-lg bg-white/[0.02]">
            <span className="text-sm text-[#9898b0]">{d.label}</span>
            <span className="text-sm font-medium text-white">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesTab({ courses, fmt }: { courses: any[]; fmt: (v: number) => string }) {
  return (
    <div className="space-y-3">
      {courses?.length === 0 && <p className="text-[#9898b0] text-center py-8">No courses listed</p>}
      {courses?.map((c: any) => (
        <div key={c.id} className="glass rounded-xl p-5 card-hover">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold text-white">{c.name}</h3>
              <p className="text-xs text-[#9898b0] mt-1">{c.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-lg bg-[#6c5ce7]/10 text-[#a29bfe] font-medium">{c.degree_type}</span>
              <span className="text-[#9898b0]">{c.duration}</span>
              <span className="font-semibold text-[#00b894]">{fmt(c.fees)}/yr</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlacementsTab({ placements, fmt }: { placements: any[]; fmt: (v: number) => string }) {
  return (
    <div className="space-y-4">
      {placements?.length === 0 && <p className="text-[#9898b0] text-center py-8">No placement data available</p>}
      {placements?.map((p: any) => (
        <div key={p.id} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Year {p.year}</h3>
            <span className="px-3 py-1 text-sm font-semibold rounded-lg bg-[#00b894]/10 text-[#00b894]">
              {parseFloat(p.placement_rate).toFixed(0)}% placed
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MiniStat label="Avg Package" value={fmt(parseFloat(p.avg_package))} />
            <MiniStat label="Highest Package" value={fmt(parseFloat(p.highest_package))} />
            <MiniStat label="Students Placed" value={String(p.students_placed)} />
            <MiniStat label="Total Students" value={String(p.total_students)} />
          </div>
          {p.top_recruiters && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.top_recruiters.map((r: string) => (
                <span key={r} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-[#9898b0]">{r}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] text-center">
      <p className="text-sm font-semibold text-white">{value}</p>
      <p className="text-[10px] text-[#9898b0] mt-0.5">{label}</p>
    </div>
  );
}

function ReviewsTab({ reviews }: { reviews: any[] }) {
  return (
    <div className="space-y-4">
      {reviews?.length === 0 && <p className="text-[#9898b0] text-center py-8">No reviews yet</p>}
      {reviews?.map((r: any) => (
        <div key={r.id} className="glass rounded-xl p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-white">{r.title}</h4>
              <p className="text-xs text-[#9898b0]">by {r.author}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#fdcb6e]/10">
              <span className="text-sm font-bold text-[#fdcb6e]">{parseFloat(r.rating).toFixed(1)}</span>
              <span className="text-[#fdcb6e] text-xs">★</span>
            </div>
          </div>
          <p className="text-sm text-[#9898b0] mb-3">{r.comment}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {r.pros && (
              <div className="p-2 rounded-lg bg-[#00b894]/5">
                <span className="text-[#00b894] font-medium">👍 Pros:</span>
                <span className="text-[#9898b0] ml-1">{r.pros}</span>
              </div>
            )}
            {r.cons && (
              <div className="p-2 rounded-lg bg-[#e17055]/5">
                <span className="text-[#e17055] font-medium">👎 Cons:</span>
                <span className="text-[#9898b0] ml-1">{r.cons}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
