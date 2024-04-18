import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconCheck, IconX, IconCircleX, IconSelector } from '@tabler/icons-react'
import { cn } from "@/libs/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/custom/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const comboboxVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-none",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ComboboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof comboboxVariants> {
  asChild?: boolean;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  onValueChange: (value: string[]) => void;
  createable?: boolean;
  multiple?: boolean;
}

const Combobox = React.forwardRef<
  HTMLButtonElement,
  ComboboxProps
>(
  (
    {
      className,
      variant,
      asChild = false,
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      createable,
      multiple,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || []
    );
    const selectedValuesSet = React.useRef(new Set(selectedValues));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');

    React.useEffect(() => {
      setSelectedValues(defaultValue || []);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (event: any) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.target.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        selectedValuesSet.current.delete(
          selectedValues[selectedValues.length - 1]
        );
        onValueChange([...selectedValues]);
      }
    };

    const toggleOption = (value: string) => {
      if (selectedValuesSet.current.has(value)) {
        selectedValuesSet.current.delete(value);
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        if(multiple || selectedValues.length == 0) {
          selectedValuesSet.current.add(value);
          setSelectedValues([...selectedValues, value]);
        }
      }
      onValueChange([...selectedValuesSet.current]);
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            disabled={disabled}
            className="flex w-full rounded-md border min-h-8 h-auto pr-3 items-center justify-between bg-inherit hover:bg-card shadow-none"
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn("",
                          comboboxVariants({ variant, className })
                        )}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {createable ? (option ? option?.label : value) : option?.label}
                        <IconCircleX
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            if(option) {
                              toggleOption(value);
                            } else {
                              setSelectedValues(selectedValues.filter((v) => v !== value));
                              onValueChange(selectedValues.filter((v) => v !== value));
                            }
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <IconX
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      setSelectedValues([]);
                      selectedValuesSet.current.clear();
                      onValueChange([]);
                      event.stopPropagation();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <IconSelector className="h-4 ml-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <IconSelector className="h-4 ml-2 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[200px] p-0 drop-shadow-sm"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onInteractOutside={(event) => {
            if (!event.defaultPrevented) {
              setIsPopoverOpen(false);
            }
          }}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              value={query}
              onValueChange={(value: string) => setQuery(value)}
            />
            <CommandList>
              { createable ? (
                <CommandEmpty
                  onClick={() => {
                    setSelectedValues([...selectedValues, query])
                    onValueChange([...selectedValues, query])
                    setQuery('')
                  }}
                  className='flex cursor-pointer items-center justify-center gap-1 my-2'
                >
                  <p className="">Create: </p>
                  <p className='block max-w-50 truncate font-semibold text-primary'>
                    {query}
                  </p>
                </CommandEmpty>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
  
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValuesSet.current.has(
                    option.value
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <IconCheck className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={() => {
                          setSelectedValues([]);
                          selectedValuesSet.current.clear();
                          onValueChange([]);
                        }}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";

export default Combobox;