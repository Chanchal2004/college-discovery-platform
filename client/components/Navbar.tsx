'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCompare } from '@/lib/compare-context';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCompare();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#fd79a8] flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              CF
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">CollegeFinder</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Explore</NavLink>
            <NavLink href="/compare">
              Compare
              {count > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-[#6c5ce7] text-white rounded-full">
                  {count}
                </span>
              )}
            </NavLink>
            {isAuthenticated && <NavLink href="/saved">Saved</NavLink>}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#9898b0]">
                  Hi, <span className="text-[#a29bfe] font-medium">{user?.name?.split(' ')[0]}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-sm rounded-lg border border-white/10 text-[#9898b0] hover:text-white hover:border-[#6c5ce7]/50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-1.5 text-sm rounded-lg text-[#9898b0] hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm rounded-lg bg-[#6c5ce7] text-white hover:bg-[#5b4bd6] transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-[#9898b0] hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-slide-down">
            <div className="flex flex-col gap-2">
              <MobileLink href="/" onClick={() => setMenuOpen(false)}>Explore</MobileLink>
              <MobileLink href="/compare" onClick={() => setMenuOpen(false)}>
                Compare {count > 0 && `(${count})`}
              </MobileLink>
              {isAuthenticated && <MobileLink href="/saved" onClick={() => setMenuOpen(false)}>Saved</MobileLink>}
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left px-4 py-2 text-[#e17055] hover:bg-white/5 rounded-lg">
                  Logout
                </button>
              ) : (
                <>
                  <MobileLink href="/login" onClick={() => setMenuOpen(false)}>Login</MobileLink>
                  <MobileLink href="/register" onClick={() => setMenuOpen(false)}>Sign Up</MobileLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center px-3 py-2 text-sm font-medium text-[#9898b0] hover:text-white rounded-lg hover:bg-white/5 transition-all">
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="px-4 py-2 text-[#9898b0] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
      {children}
    </Link>
  );
}
