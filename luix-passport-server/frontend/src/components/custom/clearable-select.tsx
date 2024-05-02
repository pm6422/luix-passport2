import { useState, useEffect } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/custom/button"
import { IconSelector, IconCheck } from "@tabler/icons-react"
import { cn } from "@/libs/utils"


type Props = {
  options: { label: string; value: string; }[]
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
};

export const ClearableSelect = ({
  options,
  defaultValue, 
  onValueChange, 
  placeholder = "Select..."
}: Props) => {
  const [query, setQuery] = useState<string>(defaultValue || "")

  useEffect(() => {
    setQuery(defaultValue || "")
  }, [defaultValue])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between text-muted-foreground"
        >
          {query
            ? options.find(
                (option) => option.value === query
              )?.label
            : placeholder}
          <IconSelector className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-fit p-0 drop-shadow-sm" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  setQuery(option.value)
                  onValueChange && onValueChange(option.value)
                }}
              >
                <IconCheck
                  className={cn(
                    "mr-2 size-4",
                    option.value === query
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
