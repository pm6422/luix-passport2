import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
  // SelectLabel
} from "@/components/ui/select"
import { Button } from "@/components/custom/button"


type Props = {
  options: { label: string; value: string; }[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string,
  placeholder?: string
};

export const ClearableSelect = ({
  options,
  value, 
  onValueChange, 
  className,
  placeholder
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
  <Select value={value} onValueChange={onValueChange} open={open} onOpenChange={setOpen}>
    <SelectTrigger className={className}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {/* <SelectLabel>Enabled</SelectLabel> */}
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectGroup>
      <SelectSeparator />
      <Button
        type="button"
        className="w-full px-2"
        variant="secondary"
        size="sm"
        onClick={() => {
          onValueChange && onValueChange("")
          setOpen(false)
        }}
      >
        Clear
      </Button>
    </SelectContent>
  </Select>
  )
}
