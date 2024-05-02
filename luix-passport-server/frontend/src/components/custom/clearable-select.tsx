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
          className="flex w-full rounded-md border min-h-9 h-auto py-0 px-1 items-center justify-between bg-inherit hover:bg-card shadow-sm"
        >
            <span className="text-sm font-normal px-2">
              {query
              ? options.find(
                  (option) => option.value === query
                )?.label
              : placeholder}
            </span>
          <IconSelector className="h-4 mr-1 cursor-pointer text-muted-foreground" />
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
