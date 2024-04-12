import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from '@/components/ui/select'
import { Button } from '@/components/custom/button'

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
        {/* <SelectLabel>Enabled</SelectLabel> */}
        <SelectItem value='true'>Yes</SelectItem>
        <SelectItem value='false'>No</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <Button
        className="w-full px-2"
        variant="secondary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onValueChange('')
        }}
      >
        Clear
      </Button>
    </SelectContent>
  </Select>
)
