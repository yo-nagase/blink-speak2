import { create } from 'zustand'

export enum Level {
  TOEIC_500 = 'TOEIC_500',
  TOEIC_600 = 'TOEIC_600',
  TOEIC_700 = 'TOEIC_700',
  TOEIC_800 = 'TOEIC_800',
  TOEIC_900 = 'TOEIC_900',
}
export enum Language {
  ENGLISH = 'EN',
  JAPANESE = 'JP'
}

interface SettingStore {
  targetLanguage: Language
  level: Level
  setTargetLanguage: (language: Language) => void
  setLevel: (level: Level) => void
}

export const useSettingStore = create<SettingStore>((set) => ({
  targetLanguage: Language.ENGLISH,
  level: Level.TOEIC_500,
  setTargetLanguage: (language) => set({ targetLanguage: language }),
  setLevel: (level) => set({ level })
}))
