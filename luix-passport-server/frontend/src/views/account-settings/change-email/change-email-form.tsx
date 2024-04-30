import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/custom/button"
import { IconReload, IconSend } from "@tabler/icons-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import { toast } from "sonner"
import { useAuthUserProvider } from "@/stores/auth-user-provider"
import { AccountService } from "@/services/account-service"

const formSchema = z.object({
  currentEmail: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  newEmail: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  verificationCode: z.string().trim().min(1, { message: "Required" })
})

type FormSchema = z.infer<typeof formSchema>

export function ChangeEmailForm() {
  const authUserProvider = useAuthUserProvider()
  const [saving, setSaving] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentEmail: authUserProvider.authUser.email,
      newEmail: "",
      verificationCode: ""
    },
    mode: "onBlur"
  })

  useEffect(() => {
    AccountService.getCurrentAccount().then(user => {
      form.reset({ currentEmail: user.email })
    })
  }, [])
  
  function onSubmit(formData: FormSchema) {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-sm font-medium">Current Email</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {form.getValues("currentEmail")}
          </p>
        </div>

        <InputFormField 
          control={form.control} 
          name="newEmail" 
          label="New Email" 
          required
          formItemClassName="mt-2"
          icon={
            <Button 
              type="button"
              variant="outline" 
              className="flex w-20 p-0"
              disabled={Object.values(form.formState.errors).length > 0 || saving}
              onClick={() => form.setValue("newEmail", "")}>
                <IconSend className="size-4 mr-1" />
                Send
            </Button>
          }
        />

        <Button type="submit" disabled={Object.values(form.formState.errors).length > 0 || saving}>
          {saving ? "Saving..." : "Save"}
          {saving && (<IconReload className="ml-1 size-4 animate-spin"/>)}
        </Button>
      </form>
    </Form>
  )
}
