import { useAuthUserProvider } from "@/stores/auth-user-provider"

type Props = {
  children: React.ReactNode
}

export const RoleOnlyUser = ({
  children
}: Props) => {
  const authUserProvider = useAuthUserProvider()

  return (
    authUserProvider.isOnlyUser() && children
  )
}
