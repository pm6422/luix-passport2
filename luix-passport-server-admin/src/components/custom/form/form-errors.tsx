import { UseFormReturn } from "react-hook-form"
import { IconExclamationCircle } from "@tabler/icons-react"
import { Alert, AlertTitle } from "@/components/ui/alert"

interface Props {
  form: UseFormReturn;
}

const FormErrors = ({
  form,
}: Props) => (
  Object.values(form.formState.errors).length > 0 && (
    <Alert variant="destructive">
      <AlertTitle className="flex items-center"><IconExclamationCircle className="size-5 me-1" />Please check your input.</AlertTitle>
    </Alert>
  )
);

export default FormErrors;
