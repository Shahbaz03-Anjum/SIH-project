import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ProfileData } from '../types';
import { getStoredProfile, initialProfileData, saveProfile } from '../lib/mockData';

type ProfileContextValue = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  updateProfile: (updates: Partial<ProfileData>) => void;
  saveProfileState: (nextProfile: ProfileData) => void;
  getInitials: (name: string) => string;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile((current) => ({ ...current, ...updates }));
  };

  const saveProfileState = (nextProfile: ProfileData) => {
    setProfile(nextProfile);
    saveProfile(nextProfile);
  };

  const getInitials = (name: string) => {
    if (!name || !name.trim()) return 'U';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'U';
  };

  const value = useMemo(
    () => ({ profile, setProfile, updateProfile, saveProfileState, getInitials }),
    [profile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
