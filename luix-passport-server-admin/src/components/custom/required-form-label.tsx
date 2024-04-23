import { FormLabel } from '@/components/ui/form'

type RequiredFormLabelProps = {
  children: string
  required?: boolean
};

export const RequiredFormLabel = ({
  children
}: RequiredFormLabelProps) => (
  <FormLabel>
    {children}
    <span className="text-destructive text-xl align-middle"> *</span>
  </FormLabel>
)