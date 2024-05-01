import { useAuthUserProvider } from "@/stores/auth-user-provider"

type Props = {
  children: React.ReactNode
}

export const RoleAdmin = ({
  children
}: Props) => {
  const authUserProvider = useAuthUserProvider()

  return (
    authUserProvider.isAdmin() && children
  )
}
