import React, { createContext, useContext, useState, useEffect } from 'react';

type Section = 'dashboard' | 'projects' | 'about' | 'contact' | 'github';

interface NavigationContextType {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');

  // Initialize from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1) as Section;
    if (['dashboard', 'projects', 'about', 'contact', 'github'].includes(hash)) {
      setCurrentSection(hash);
    }
  }, []);

  // Update URL hash when section changes
  const handleSetCurrentSection = (section: Section) => {
    setCurrentSection(section);
    window.location.hash = section;
  };

  // Listen for hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Section;
      if (['dashboard', 'projects', 'about', 'contact', 'github'].includes(hash)) {
        setCurrentSection(hash);
      } else {
        setCurrentSection('dashboard');
        window.location.hash = 'dashboard';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentSection, setCurrentSection: handleSetCurrentSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
