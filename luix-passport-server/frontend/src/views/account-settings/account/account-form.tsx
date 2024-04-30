import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/custom/button"
import { Form } from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import SelectFormField from "@/components/custom/form-field/select"
import { languages } from "@/data/languages"
import { toast } from "sonner"
import { useAuthUserProvider } from "@/stores/auth-user-provider"
import { AccountService } from "@/services/account-service"

const formSchema = z.object({
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  language: z.string().trim().min(1, { message: "Required" }),
  locale: z.string().trim().min(1, { message: "Required" })
})

type FormSchema = z.infer<typeof formSchema>

export function AccountForm() {
  const authUserProvider = useAuthUserProvider()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: authUserProvider.authUser
  })

  useEffect(() => {
    AccountService.getCurrentAccount().then(user => {
      form.reset(user)
    })
  }, [])

  function onSubmit(data: FormSchema) {
    toast(
      <div>
        <span>You submitted the following values:</span>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>, 
    { duration: 5000 })
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

        <InputFormField control={form.control} name="firstName" label="First Name"/>
        <InputFormField control={form.control} name="lastName" label="Last Name"/>
        <SelectFormField 
          control={form.control} 
          name="language" 
          label="Preferred Language"
          options={languages}
          required
        />


        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}
