import { FormLabel } from '@/components/ui/form'

type RequiredFormLabelProps = {
  children: string
  required?: boolean
};

export const RequiredFormLabel = ({
  children,
  required = false
}: RequiredFormLabelProps) => (
  <FormLabel>
    {children}
    {required && <span className="text-destructive text-xl align-middle"> *</span>}
  </FormLabel>
)