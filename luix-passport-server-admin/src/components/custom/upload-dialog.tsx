import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import { IconReload } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import { Input } from "@/components/ui/input"
import { z } from "zod"

export const formSchema = z.object({
  file: z.string()
})

export type UploadFormSchema = z.infer<typeof formSchema>

export const initialFormState: UploadFormSchema = {
  file: ""
}

interface UploadDialogProps {
  children: React.ReactNode,
  entityName: string,
  upload: (formData: UploadFormSchema) => Promise<any>,
  afterUpload?: (success: boolean) => void
}

export function UploadDialog({
  children,
  entityName,
  upload,
  afterUpload
}: UploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormState
  })

  function onSubmit(formData: UploadFormSchema): void {
    setUploading(true)
    toast.promise(upload(formData), {
      loading: "Uploading " + entityName + "...",
      success: () => {
        setOpen(false)
        afterUpload && afterUpload(true)
        setUploading(false)
        return "Uploaded " + entityName
      },
      error: (error) => {
        setOpen(false)
        afterUpload && afterUpload(false)
        setUploading(false)
        return getErrorMessage(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="lg:max-w-screen-sm max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">Upload file</DialogTitle>
        </DialogHeader>
        <Separator/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel required>File</RequiredFormLabel>
                  <FormControl>
                    <Input type="file" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => afterUpload && afterUpload(true)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
                {uploading && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
