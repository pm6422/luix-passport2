import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/custom/button"
import { Form } from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import SelectFormField from "@/components/custom/form-field/select"
import { IconReload } from "@tabler/icons-react"
import { languages } from "@/data/languages"
import { toast } from "sonner"
import { useAuthUserProvider } from "@/stores/auth-user-provider"
import { AccountService } from "@/services/account-service"
import { getErrorMessage } from "@/libs/handle-error"
import { isValidPhoneNumber } from "react-phone-number-input"

const formSchema = z.object({
  id: z.string().trim().min(1, { message: "Required" }),
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  mobileNo: z.string().trim().min(1, { message: "Required" }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  language: z.string().trim().min(1, { message: "Required" }),
  locale: z.string().trim().min(1, { message: "Required" })
})

type FormSchema = z.infer<typeof formSchema>

export function AccountForm() {
  const authUserProvider = useAuthUserProvider()
  const [saving, setSaving] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: authUserProvider.authUser
  })

  useEffect(() => {
    AccountService.getCurrentAccount().then(user => {
      form.reset(user)
    })
  }, [])

  function onSubmit(formData: FormSchema) {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Updating account...",
      success: () => {
        form.reset()
        setSaving(false)
        return "Updated account"
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
        <div>
          <h3 className="text-sm font-medium">Username</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {form.getValues("username")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Email</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {form.getValues("email")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Mobile No.</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {form.getValues("mobileNo")}
          </p>
        </div>

        <InputFormField control={form.control} name="firstName" label="First Name"/>
        <InputFormField control={form.control} name="lastName" label="Last Name"/>
        <SelectFormField 
          control={form.control} 
          name="language" 
          label="Preferred Language"
          options={languages}
          required
        />

        <Button type="submit" disabled={saving}>
          {saving ? "Updating account..." : "Update account"}
          {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
        </Button>
      </form>
    </Form>
  )
}
