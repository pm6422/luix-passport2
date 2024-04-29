import { UseFormReturn } from "react-hook-form"
import { IconExclamationCircle } from "@tabler/icons-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

interface Props {
  children?: React.ReactNode;
  form: UseFormReturn<any, any, any>;
  variant?: "default" | "destructive";
}

const FormErrors = ({
  children,
  form,
  variant = "destructive"
}: Props) => (
  Object.values(form.formState.errors).length > 0 && (
    <Alert variant={variant}>
      <AlertTitle className="flex items-center"><IconExclamationCircle className="size-5 me-1" />Please check your input.</AlertTitle>
      {children && <AlertDescription className="pr-8 font-light">{children}</AlertDescription>}
    </Alert>
  )
);

export default FormErrors;
