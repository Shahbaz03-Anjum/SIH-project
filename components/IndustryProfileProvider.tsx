import React, { createContext, useContext, useEffect, useState } from 'react';
import { CompanyProfile } from '../types';
import { getStoredCompanyProfile, initialCompanyProfile, saveCompanyProfile } from '../lib/industryData';

type IndustryProfileContextType = {
  profile: CompanyProfile;
  updateProfile: (updated: Partial<CompanyProfile>) => void;
  resetProfile: () => void;
  getCompanyInitials: (name: string) => string;
};

const IndustryProfileContext = createContext<IndustryProfileContextType | undefined>(undefined);

export const IndustryProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CompanyProfile>(initialCompanyProfile);

  useEffect(() => {
    setProfile(getStoredCompanyProfile());
  }, []);

  const updateProfile = (updated: Partial<CompanyProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveCompanyProfile(next);
      return next;
    });
  };

  const resetProfile = () => {
    setProfile(initialCompanyProfile);
    saveCompanyProfile(initialCompanyProfile);
  };

  const getCompanyInitials = (name: string) => {
    if (!name) return 'TC';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <IndustryProfileContext.Provider value={{ profile, updateProfile, resetProfile, getCompanyInitials }}>
      {children}
    </IndustryProfileContext.Provider>
  );
};

export const useIndustryProfile = () => {
  const context = useContext(IndustryProfileContext);
  if (!context) {
    throw new Error('useIndustryProfile must be used within an IndustryProfileProvider');
  }
  return context;
};
