import { FormLabel } from '@/components/ui/form'

type InputFormLabelProps = {
  children: string
  required?: boolean
};

export const InputFormLabel = ({
  children,
  required = false
}: InputFormLabelProps) => (
  <FormLabel>
    {children}
    {required && <span className="text-destructive text-xl align-middle"> *</span>}
  </FormLabel>
)