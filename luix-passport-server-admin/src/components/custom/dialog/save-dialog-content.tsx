import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import FormErrors from "@/components/custom/form-errors"
import { Button } from "@/components/custom/button"
import { Separator } from "@/components/ui/separator"
import { IconReload } from "@tabler/icons-react"

interface Props {
  children: React.ReactNode;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  form: UseFormReturn<any, any, any>;
  onSubmit: (data: any) => void;
  afterSave?: (success: boolean) => void;
  readonly?: boolean;
  saving?: boolean;
}

const SaveDialogContent = ({
  children,
  title,
  size = "md",
  form,
  onSubmit,
  afterSave,
  readonly = false,
  saving = false
}: Props) => (
  <DialogContent className={`lg:max-w-screen-${size} max-h-screen overflow-y-auto`}>
    ( title && 
      <DialogHeader>
        <DialogTitle className="capitalize">{title}</DialogTitle>
      </DialogHeader>
    )
    <Separator/>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormErrors form={form}/>
        
        {children}
        
        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => afterSave && afterSave(true)}>
              Cancel
            </Button>
          </DialogClose>
          ( !readonly && 
            <Button disabled={saving}>
              {saving ? "Saving..." : "Save"}
              {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
            </Button>
          )
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
);

export default SaveDialogContent;
