import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: keyof TFieldValues;
  label: string;
  value?: string;
  defaultValue?: string;
  type?: Parameters<typeof Input>[0]["type"] | "textarea";
  description?: string;
  placeholder?: string;
  onFocus?: () => void;
  minimal?: boolean;
  subComponent?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  inputClassName?: string;
  formItemClassName?: string;
  hide?: boolean;
}

const InputFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  value,
  defaultValue,
  description,
  onFocus,
  type = "text",
  placeholder,
  subComponent,
  required,
  disabled,
  icon,
  inputClassName,
  formItemClassName,
  hide = false
}: Props<TFieldValues>) => ( !hide &&
  <FormField
    control={disabled ? undefined : control}
    name={name as Path<TFieldValues>}
    render={({ field: { value: formFieldValue, ...rest } }) => (
      <FormItem className={formItemClassName}>
        <FormLabel>
          {label}
          {required && <span className="ml-1 text-destructive text-xl align-middle">*</span>}
        </FormLabel>
        <FormControl>
          <div className="relative flex w-full items-center gap-2">
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                onFocus={onFocus}
                defaultValue={defaultValue}
                value={value || formFieldValue || ""}
                disabled={disabled}
                {...rest}
              />
            ) : (
              <Input
                className={inputClassName}
                type={type}
                onFocus={onFocus}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value || formFieldValue || ""}
                disabled={disabled}
                {...rest}
              />
            )}
            {icon && (icon)}
            {subComponent}
          </div>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default InputFormField;
