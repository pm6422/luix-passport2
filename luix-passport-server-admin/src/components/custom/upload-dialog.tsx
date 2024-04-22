import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button, buttonVariants } from "@/components/custom/button"
import { IconReload, IconPaperclip } from "@tabler/icons-react"
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
  FormField,
  FormItem,
  FormDescription
} from "@/components/ui/form"
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/custom/file-uploader"
import { DropzoneOptions } from "react-dropzone"
import { Accept } from "react-dropzone"
import { z } from "zod"
import { cn } from "@/libs/utils"

export const formSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, { message: "Upload file(s) are required" })
})

export type UploadFormSchema = z.infer<typeof formSchema>

interface UploadDialogProps {
  children: React.ReactNode,
  entityName: string,
  description?: string,
  multiple?: boolean,
  maxFiles?: number,
  maxSize?: number,
  accept?: Accept,
  upload: (formData: UploadFormSchema) => Promise<any>,
  afterUpload?: (success: boolean) => void
}

export function UploadDialog({
  children,
  entityName,
  description,
  multiple = false,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024,
  accept = {
    "text/*": [".txt", ".json"]
    // "image/*": [".jpg", ".jpeg", ".png"]
  },
  upload,
  afterUpload
}: UploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: []
    }
  })

  // refer to https://react-dropzone.js.org/#src
  const dropzoneOptions = {
    multiple: multiple,
    maxFiles: maxFiles,
    maxSize: maxSize,
    accept: accept
  } satisfies DropzoneOptions

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
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={dropzoneOptions}
                    reSelect={true}
                  >
                    <FileInput
                      className={cn(
                        buttonVariants({
                          size: "icon",
                        }),
                        "size-8"
                      )}
                    >
                      <IconPaperclip className="size-4" />
                      <span className="sr-only">Select your file(s)</span>
                    </FileInput>
                    <FormDescription>{description}</FormDescription>
                    {field.value && field.value.length > 0 && (
                      <FileUploaderContent className="py-5">
                        {field.value.map((file, i) => (
                          <FileUploaderItem
                            key={i}
                            index={i}
                            aria-roledescription={`file ${i + 1} containing ${
                              file.name
                            }`}
                            className="p-5"
                          >
                            {file.name}
                          </FileUploaderItem>
                        ))}
                      </FileUploaderContent>
                    )}
                  </FileUploader>
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="text-destructive text-sm">
                {Object.values(form.formState.errors).map((error) => (
                  <p key={error.message}>{error.message}</p>
                ))}
              </div>
            )}
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
