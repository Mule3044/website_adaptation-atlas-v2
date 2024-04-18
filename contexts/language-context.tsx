'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'

interface LanguageContextType {
  locale: string
  setLocale: React.Dispatch<React.SetStateAction<string>>
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {}, // This is a stub function actual implementation will be provided inside the provider
})

export const useLanguageContext = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: ReactNode // This type ensures that children can be anything that React can render
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>('en') // Specify the state type as string
  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
