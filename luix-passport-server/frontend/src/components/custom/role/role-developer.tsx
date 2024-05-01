import { useAuthUserProvider } from "@/stores/auth-user-provider"

type Props = {
  children: React.ReactNode
}

export const RoleDeveloper = ({
  children
}: Props) => {
  const authUserProvider = useAuthUserProvider()

  return (
    authUserProvider.isDeveloper() && children
  )
}
