'use client'

import { create } from 'zustand'

interface SearchState {
  globalSearchTerm: string // Termo vindo do header
  setGlobalSearchTerm: (term: string) => void
  clearGlobalSearch: () => void
}

export const useSearch = create<SearchState>((set) => ({
  globalSearchTerm: '',
  setGlobalSearchTerm: (term: string) => set({ globalSearchTerm: term }),
  clearGlobalSearch: () => set({ globalSearchTerm: '' }),
}))
