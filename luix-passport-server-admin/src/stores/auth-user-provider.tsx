import React, { createContext, useContext, useState } from "react";

export type AuthUser = {
  username: string;
  email: string;
  roles: Array<string>;
};

type AuthUserProviderProps = {
  children: React.ReactNode
  defaultValue?: AuthUser
};

type AuthUserProviderState = {
  authUser: AuthUser;
  setAuthUser: (AuthUser: AuthUser) => void;
};

const initialState: AuthUserProviderState = {
  authUser: {} as AuthUser,
  setAuthUser: () => {},
};

const AuthUserProviderContext = createContext<AuthUserProviderState>(initialState);

export function AuthUserProvider({
  children,
  defaultValue,
  ...props
}: AuthUserProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser>(defaultValue || initialState.authUser);

  const value = {
    authUser,
    setAuthUser
  };

  return (
    <AuthUserProviderContext.Provider {...props} value={value}>
      {children}
    </AuthUserProviderContext.Provider>
  );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAuthUserProvider = () => {
  const context = useContext(AuthUserProviderContext);

  if (context === undefined) {
    throw new Error("useAuthUserProvider must be used within a AuthUserProvider");
  }

  return context;
};
