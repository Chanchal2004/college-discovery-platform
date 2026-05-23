'use client';
import { useCompare } from '@/lib/compare-context';
import Link from 'next/link';

interface CollegeCardProps {
  college: {
    id: number;
    name: string;
    location: string;
    city: string;
    state: string;
    type: string;
    rating: number;
    fees_min: number;
    fees_max: number;
    placement_rate: number | null;
    avg_package: number | null;
    image_url?: string;
    tags?: string[];
    is_saved?: boolean;
  };
  onToggleSave?: (id: number) => void;
  index?: number;
}

export default function CollegeCard({ college, onToggleSave, index = 0 }: CollegeCardProps) {
  const { isSelected, toggleCollege, canAdd } = useCompare();
  const selected = isSelected(college.id);

  const formatCurrency = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val}`;
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 card-hover overflow-hidden animate-fade-in-up ${
        selected ? 'border-[#6c5ce7]/60 bg-[#6c5ce7]/10' : 'border-white/6 bg-[#1a1a2e]'
      }`}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Image Section */}
      {college.image_url && (
        <div className="relative w-full h-40 bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] overflow-hidden">
          <img
            src={college.image_url}
            alt={college.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback to gradient if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8]" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <Link href={`/college/${college.id}`} className="group">
              <h3 className="text-base font-semibold text-white group-hover:text-[#a29bfe] transition-colors line-clamp-2 leading-snug">
                {college.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#9898b0]">
              <svg className="w-3.5 h-3.5 text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {college.city}, {college.state}
            </div>

            {/* Tags */}
            {college.tags && college.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {college.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#6c5ce7]/20 text-[#a29bfe]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            college.type === 'Public' ? 'bg-[#00b894]/15 text-[#00b894]' : 'bg-[#a29bfe]/15 text-[#a29bfe]'
          }`}>
            {college.type}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatItem label="Rating" value={`${parseFloat(String(college.rating)).toFixed(1)}★`} color="text-[#fdcb6e]" />
          <StatItem label="Fees" value={`${formatCurrency(college.fees_min)}-${formatCurrency(college.fees_max)}`} color="text-[#a29bfe]" />
          <StatItem label="Placement" value={college.placement_rate ? `${parseFloat(String(college.placement_rate)).toFixed(0)}%` : 'N/A'} color="text-[#00b894]" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/college/${college.id}`}
            className="flex-1 text-center py-2 text-xs font-medium rounded-lg bg-[#6c5ce7]/15 text-[#a29bfe] hover:bg-[#6c5ce7]/25 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => toggleCollege(college.id)}
            disabled={!selected && !canAdd}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              selected
                ? 'bg-[#6c5ce7] text-white'
                : canAdd
                ? 'border border-white/10 text-[#9898b0] hover:border-[#6c5ce7]/50 hover:text-[#a29bfe]'
                : 'border border-white/5 text-[#3d3d5c] cursor-not-allowed'
            }`}
            title={selected ? 'Remove from compare' : canAdd ? 'Add to compare' : 'Max 3 colleges'}
          >
            {selected ? '✓' : '⚖'}
          </button>
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(college.id)}
              className="px-3 py-2 text-xs rounded-lg border border-white/10 text-[#9898b0] hover:text-[#fd79a8] hover:border-[#fd79a8]/30 transition-all"
            >
              {college.is_saved ? '♥' : '♡'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center p-2 rounded-lg bg-white/[0.02]">
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
      <p className="text-[10px] text-[#9898b0] mt-0.5">{label}</p>
    </div>
  );
}
