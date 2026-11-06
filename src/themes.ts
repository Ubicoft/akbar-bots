export type ThemeId = 'blue' | 'rose' | 'emerald'

export const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: 'blue', label: 'Blue', swatch: '#2f86ff' },
  { id: 'rose', label: 'Rose', swatch: '#ff5f9a' },
  { id: 'emerald', label: 'Teal', swatch: '#1ec8a5' },
]

export const THEME_STORAGE_KEY = 'akbar-portfolio-theme'
