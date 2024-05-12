import dayjs from "dayjs"
import { useAuthUser } from "@/stores/auth-user-provider"

type Props = {
  value: string | Date
}

export const Date = ({
  value
}: Props) => {
  const { authUser } = useAuthUser()

  function formatDate(value: string | Date): string {
    if (!value) {
      return ""
    }
    return dayjs(value).format(authUser.dateFormatInstance.dateFormat)
  }

  return (
    <span >{formatDate(value)}</span>
  )
}
