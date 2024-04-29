import React, { createContext, useContext, useState, useEffect } from "react"
import { isEmpty } from "lodash"

export type AuthUser = {
  username: string
  email: string
  roles: Array<string>
}

type AuthUserProviderProps = {
  children: React.ReactNode
  defaultValue?: AuthUser | null
}

type AuthUserProviderState = {
  authUser: AuthUser | null
  clearAuthUser: () => void
}

const initialState: AuthUserProviderState = {
  authUser: null,
  clearAuthUser: () => {},
}

const AuthUserProviderContext = createContext<AuthUserProviderState>(initialState)

export function AuthUserProvider({
  children,
  defaultValue,
  ...props
}: AuthUserProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(defaultValue || null)

  // watch auth user whether is null
  useEffect(() => {
    if(!authUser || isEmpty(authUser)) {
      // user is null
    }
  }, [authUser])

  const value = {
    authUser,
    clearAuthUser: () => setAuthUser(null)
  }

  return (
    <AuthUserProviderContext.Provider {...props} value={value}>
      {children}
    </AuthUserProviderContext.Provider>
  )
}

export const useAuthUserProvider = () => {
  const context = useContext(AuthUserProviderContext)

  if (context === undefined) {
    throw new Error("useAuthUserProvider must be used within a AuthUserProvider")
  }

  return context
}