import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type EnabledSelectProps = {
  value: string
  onValueChange: (value: string) => void
  className: string
};

export const EnabledSelect = ({ 
  value, 
  onValueChange, 
  className 
}: EnabledSelectProps) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className={className}>
      <SelectValue placeholder='Enabled' />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Enabled</SelectLabel>
        <SelectItem value='true'>Yes</SelectItem>
        <SelectItem value='false'>No</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)
