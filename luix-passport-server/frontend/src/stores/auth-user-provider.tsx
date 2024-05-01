import React, { createContext, useContext, useState, useEffect } from "react"
import { isEmpty } from "lodash"

export type AuthUser = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  language: string
  locale: string
  activated: boolean
  enabled: boolean
  roles: Array<string>
}

type AuthUserProviderProps = {
  children: React.ReactNode
  defaultValue?: AuthUser
}

type AuthUserProviderState = {
  authUser: AuthUser
  clearAuthUser: () => void
  isAdmin: () => boolean
  isDeveloper: () => boolean
}

const initialState: AuthUserProviderState = {
  authUser: {} as AuthUser,
  clearAuthUser: () => {},
  isAdmin: () => false,
  isDeveloper: () => false
}

const AuthUserProviderContext = createContext<AuthUserProviderState>(initialState)

export function AuthUserProvider({
  children,
  defaultValue = {} as AuthUser,
  ...props
}: AuthUserProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser>(defaultValue)

  // watch auth user whether is null
  useEffect(() => {
    if(isEmpty(authUser)) {
      // user is null
    }
  }, [authUser])

  const value = {
    authUser,
    clearAuthUser: () => setAuthUser({} as AuthUser),
    isAdmin: () => {
      return authUser.roles.includes("ROLE_ADMIN")
    },
    isDeveloper: () => {
      return authUser.roles.includes("ROLE_DEVELOPER")
    }
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