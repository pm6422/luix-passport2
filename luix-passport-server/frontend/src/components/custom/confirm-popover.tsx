import { useState, useEffect } from "react"
import { Button } from "@/components/custom/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  children: React.ReactNode
  description: string
  onClickYes: () => void
  onClickNo: () => void
  showNoButton?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ConfirmPopover = ({
  children,
  description,
  onClickYes,
  onClickNo,
  showNoButton = true,
  open = false,
  onOpenChange
}: Props) => {
  const [confirmPopoverOpen, setConfirmPopoverOpen] = useState(open)

  useEffect(() => {
    setConfirmPopoverOpen(open)
  }, [open])

  return (
    <Popover open={confirmPopoverOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {description}
        <div className="mt-4 flex items-center justify-between space-x-2">
          { showNoButton && 
            <Button
              className="w-full"
              variant="secondary"
              size="sm"
              onClick={onClickNo}
            >
              No
            </Button>
          }
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={onClickYes}
          >
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}