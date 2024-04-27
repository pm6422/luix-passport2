import { useState } from "react"
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
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"

interface Props {
  children: React.ReactNode;
  entityName: string;
  id?: string;
  form: UseFormReturn<any, any, any>;
  size?: "sm" | "md" | "lg";
  save: (formData: any) => Promise<any>;
  afterSave?: (success: boolean) => void;
  setOpen: (open: boolean) => void;
  readonly?: boolean;
}

const SaveDialogContent = ({
  children,
  entityName,
  id,
  form,
  size = "md",
  save,
  afterSave,
  setOpen,
  readonly = false
}: Props) => {
  const [saving, setSaving] = useState(false)

  function onSubmit(formData: any): void {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Saving " + entityName + "...",
      success: () => {
        setOpen(false)
        form.reset()
        afterSave && afterSave(true)
        setSaving(false)
        return "Saved " + entityName
      },
      error: (error) => {
        setOpen(false)
        afterSave && afterSave(false)
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  return (
    <DialogContent className={`lg:max-w-screen-${size} max-h-screen overflow-y-auto`}>
      <DialogHeader>
        <DialogTitle className="capitalize">{id ? "Update" : "Create"} {entityName}</DialogTitle>
      </DialogHeader>
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
            { !readonly &&
              <Button disabled={saving}>
                {saving ? "Saving..." : "Save"}
                {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
              </Button>
            }
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default SaveDialogContent;
