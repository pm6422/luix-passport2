import { Button } from "@/components/custom/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  children: React.ReactNode
  message: string
  onClickYes: () => void
  onClickNo?: () => void
  showNoButton?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ConfirmPopover = ({
  children,
  message,
  onClickYes,
  onClickNo,
  open = false,
  onOpenChange
}: Props) => {

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {message}
        <div className="mt-4 flex items-center justify-between space-x-2">
          { onClickNo && 
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