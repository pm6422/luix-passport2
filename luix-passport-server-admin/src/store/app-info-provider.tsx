import React, { createContext, useContext, useEffect, useState } from 'react';

type AppInfoStoreProps = {
  ribbonProfile?: string;
};

type AppInfoStoreState = {
  ribbonProfile: string;
  setRibbonProfile: (profile: string) => void;
};

const initialState: AppInfoStoreState = {
  ribbonProfile: '',
  setRibbonProfile: () => null,
};

const AppInfoStoreContext = createContext<AppInfoStoreState>(initialState);

export function AppInfoStore({
  ribbonProfile = 'local',
  ...props
}: AppInfoStoreProps) {
  const [profile, setProfile] = useState<string>(ribbonProfile);

  const setRibbonProfile = (newProfile: string) => {
    setProfile(newProfile);
  };

  useEffect(() => {
    // You can perform any side effects related to AppInfoStore here if needed
    // For example, persisting `profile` to local storage
  }, [profile]);

  const value = {
    ribbonProfile: profile,
    setRibbonProfile,
  };

  return (
    <AppInfoStoreContext.Provider {...props} value={value}>
    </AppInfoStoreContext.Provider>
  );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAppInfoStore = () => {
  const context = useContext(AppInfoStoreContext);

  if (context === undefined) {
    throw new Error('useAppInfoStore must be used within a AppInfoStore');
  }

  return context;
};
