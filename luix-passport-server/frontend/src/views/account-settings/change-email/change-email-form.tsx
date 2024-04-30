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
  FormMessage,
} from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { PinInput, PinInputField } from "@/components/custom/pin-input"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import { useAuthUserProvider } from "@/stores/auth-user-provider"
import { AccountService } from "@/services/account-service"
import { getErrorMessage } from "@/libs/handle-error"
import { Link } from "react-router-dom"

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
    mode: "onChange"
  })

  useEffect(() => {
    AccountService.getCurrentAccount().then(user => {
      form.reset({ currentEmail: user.email })
    })
  }, [])

  async function sendVerificationCode(email: string): Promise<void> {
    await AccountService.sendVerificationCode(email)
    toast(
      <div>
        <span>Sent verification code</span>
      </div>, 
    { duration: 5000 })
  }
  
  function onSubmit(formData: FormSchema) {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Updating account...",
      success: () => {
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
    console.log(formData)
    return null
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
          description="Click right button to send a verification code to your new email."
          icon={
            <Button 
              type="button"
              variant="outline" 
              disabled={form.formState.errors.newEmail != null || saving || !form.getValues("newEmail") || form.getValues("currentEmail") == form.getValues("newEmail")}
              onClick={() => sendVerificationCode(form.getValues("newEmail"))}>
                <IconSend className="size-4 mr-1" />
                Send
            </Button>
          }
        />

        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <RequiredFormLabel required={true}>Verification code</RequiredFormLabel>
              <FormControl>
                <PinInput
                  className="flex h-10 space-x-4"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={form.formState.errors.newEmail != null || saving || !form.getValues("newEmail") || form.getValues("currentEmail") == form.getValues("newEmail")}
                  onComplete={(str) => console.log("completed", str)}
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <PinInputField key={i} component={Input} className="capitalize"/>
                  ))}
                </PinInput>
              </FormControl>
              <FormDescription className={form.getValues("newEmail") && form.formState.errors.newEmail == null && form.getValues("currentEmail") != form.getValues("newEmail") ? "" : "invisible"}>Enter the verification code sent to {form.getValues("newEmail")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center gap-2'>
          <Link to="/account-settings/account">
            <Button type="button" variant="outline">
              Back
            </Button>
          </Link>
          <Button type="submit" disabled={Object.values(form.formState.errors).length > 0 || saving}>
            {saving ? "Saving..." : "Save"}
            {saving && (<IconReload className="ml-1 size-4 animate-spin"/>)}
          </Button>
        </div>
      </form>
    </Form>
  )
}
