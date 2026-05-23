'use client';
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useAuth } from './auth-context';

interface CompareContextType {
  selectedIds: number[];
  toggleCollege: (id: number) => void;
  setSelectedIds: (ids: number[]) => void;
  clearAll: () => void;
  isSelected: (id: number) => boolean;
  canAdd: boolean;
  count: number;
}

const CompareContext = createContext<CompareContextType>({
  selectedIds: [], toggleCollege: () => {}, clearAll: () => {},
  setSelectedIds: () => {},
  isSelected: () => false, canAdd: true, count: 0,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedIds, setSelectedIdsState] = useState<number[]>([]);

  useEffect(() => {
    const storageKey = user ? `compare-selected-ids:${user.id}` : 'compare-selected-ids:guest';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedIdsState(parsed.filter((value): value is number => typeof value === 'number'));
        } else {
          setSelectedIdsState([]);
        }
      } catch {
        localStorage.removeItem(storageKey);
        setSelectedIdsState([]);
      }
    } else {
      setSelectedIdsState([]);
    }
  }, [user?.id]);

  useEffect(() => {
    const storageKey = user ? `compare-selected-ids:${user.id}` : 'compare-selected-ids:guest';
    localStorage.setItem(storageKey, JSON.stringify(selectedIds));
  }, [selectedIds, user?.id]);

  const setSelectedIds = useCallback((ids: number[]) => {
    setSelectedIdsState(Array.from(new Set(ids)).slice(0, 3));
  }, []);

  const toggleCollege = useCallback((id: number) => {
    setSelectedIdsState(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, []);

  const clearAll = useCallback(() => setSelectedIdsState([]), []);
  const isSelected = useCallback((id: number) => selectedIds.includes(id), [selectedIds]);

  return (
    <CompareContext.Provider value={{
      selectedIds, toggleCollege, clearAll,
      setSelectedIds, isSelected, canAdd: selectedIds.length < 3, count: selectedIds.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
