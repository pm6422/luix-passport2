import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/custom/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { AvatarUploader } from "@/components/custom/avatar-uploader"
import { IconReload } from "@tabler/icons-react"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "@/libs/handle-error"
import { AccountService } from "@/services/account-service"

const formSchema = z.object({
  file: z.any().optional(),
  description: z.string().min(1, { message: "Required"})
})

type FormSchema = z.infer<typeof formSchema>

export default function ProfileForm() {
  const [saving, setSaving] = useState(false)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      file: "assets/images/avatars/louis.jpg",
      description: "user avatar"
    },
    mode: "onChange",
  })

  function onSubmit(formData: FormSchema) {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Updating picture...",
      success: () => {
        setSaving(false)
        return "Updated picture"
      },
      error: (error) => {
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  function save(form: FormSchema): Promise<any> {
    const formData = new FormData()
    formData.append("file", form.file)
    return AccountService.uploadProfilePicture(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarUploader defaultValue={field.value} onValueChange={field.onChange}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={saving}>
          {saving ? "Saving picture..." : "Save picture"}
          {saving && (<IconReload className="ml-1 size-4 animate-spin"/>)}
        </Button>
      </form>
    </Form>
  )
}
