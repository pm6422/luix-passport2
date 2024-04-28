import React, { createContext, useContext, useState } from "react";

export type AuthUser = {
  username: string;
  email: string;
  roles: Array<string>;
};

type AuthUserProviderProps = {
  children: React.ReactNode;
  defaultValue?: AuthUser | null;
};

type AuthUserProviderState = {
  authUser: AuthUser | null;
  setAuthUser: (AuthUser: AuthUser | null) => void;
};

const initialState: AuthUserProviderState = {
  authUser: null,
  setAuthUser: () => {},
};

const AuthUserProviderContext = createContext<AuthUserProviderState>(initialState);

export function AuthUserProvider({
  children,
  defaultValue,
  ...props
}: AuthUserProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(defaultValue || null);

  const value = {
    authUser,
    setAuthUser,
  };

  return (
    <AuthUserProviderContext.Provider {...props} value={value}>
      {children}
    </AuthUserProviderContext.Provider>
  );
}

export const useAuthUserProvider = () => {
  const context = useContext(AuthUserProviderContext);

  if (context === undefined) {
    throw new Error("useAuthUserProvider must be used within a AuthUserProvider");
  }

  return context;
};