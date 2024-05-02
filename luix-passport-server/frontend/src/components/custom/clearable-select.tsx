import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/components/ui/select"
import { Button } from "@/components/custom/button"


type Props = {
  value?: string
  onValueChange?: (value: string) => void
  className?: string,
  placeholder?: string
};

export const ClearableSelect = ({ 
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
        <SelectItem value="true">Yes</SelectItem>
        <SelectItem value="false">No</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <Button
        type="button"
        className="w-full px-2"
        variant="secondary"
        size="sm"
        onClick={(e) => {
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
