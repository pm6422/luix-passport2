import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/custom/button"
import { Form } from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import { IconReload, IconMailForward } from "@tabler/icons-react"
import { toast } from "sonner"
import { AccountService } from "@/services/account-service"
import { getErrorMessage } from "@/libs/handle-error"

const formSchema = z.object({
  currentPassword: z.string().trim().min(1, { message: "Required" }),
  newPassword: z.string().trim().min(1, { message: "Required" })
})

type FormSchema = z.infer<typeof formSchema>

export function PasswordForm() {
  const [saving, setSaving] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    }
  })

  function onSubmit(formData: FormSchema) {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Updating password...",
      success: () => {
        setSaving(false)
        return "Updated password"
      },
      error: (error) => {
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  function save(formData: FormSchema): Promise<any> {
    return AccountService.update(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputFormField control={form.control} name="currentPassword" label="Current Password"/>
        <InputFormField control={form.control} name="newPassword" label="New Password"/>

        <Button type="submit" disabled={saving}>
          {saving ? "Updating password..." : "Update password"}
          {saving && (<IconReload className="ml-1 size-4 animate-spin"/>)}
        </Button>
      </form>
    </Form>
  )
}
