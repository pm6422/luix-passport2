import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RequiredFormLabel } from "../required-form-label";
import { Switch } from "@/components/ui/switch"

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: keyof TFieldValues;
  key?: string;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  switchClassName?: string;
  formItemClassName?: string;
  hide?: boolean;
}

const SwitchFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  key,
  label,
  description,
  required,
  disabled,
  switchClassName,
  formItemClassName,
  hide = false
}: Props<TFieldValues>) => ( !hide &&
  <FormField
    control={disabled ? undefined : control}
    name={name as Path<TFieldValues>}
    key={key}
    render={({ field }) => (
      <FormItem className={formItemClassName}>
        {label && <RequiredFormLabel required={required}>{label}</RequiredFormLabel>}
        <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          className={switchClassName}
          aria-readonly
        />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default SwitchFormField;
