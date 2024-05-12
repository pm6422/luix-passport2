import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/custom/button"
import { Form } from "@/components/ui/form"
import InputFormField from "@/components/custom/form-field/input"
import SelectFormField from "@/components/custom/form-field/select"
import ClearableSelectFormField from "@/components/custom/form-field/clearable-select"
import { IconReload, IconMailForward } from "@tabler/icons-react"
import { languages } from "@/data/languages"
import { locales } from "@/data/locales"
import { timeZones } from "@/data/time-zones"
import { dateTimeFormats } from "@/data/date-time-formats"
import { toast } from "sonner"
import { useAuthUser } from "@/stores/auth-user-provider"
import { AccountService } from "@/services/account-service"
import { getErrorMessage } from "@/libs/handle-error"
import { isValidPhoneNumber } from "react-phone-number-input"
import { Link } from "react-router-dom"

const formSchema = z.object({
  id: z.string().trim().min(1, { message: "Required" }),
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  mobileNo: z.string().trim().min(1, { message: "Required" }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  language: z.string().trim().min(1, { message: "Required" }),
  locale: z.string().trim().min(1, { message: "Required" }),
  timeZone: z.string().trim().optional(),
  dateTimeFormat: z.string().trim().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export function AccountForm() {
  const { authUser } = useAuthUser()
  const [saving, setSaving] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: authUser
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

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Email</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {form.getValues("email")}
            </p>
          </div>
          <Link to="/account-settings/change-email">
            <Button type="button" variant={"link"}>
              <IconMailForward className="mr-2 size-4"/>
              Change Email
            </Button>
          </Link>
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
        <ClearableSelectFormField 
          control={form.control} 
          name="timeZone" 
          label="Time Zone"
          options={timeZones}
        />
        <ClearableSelectFormField 
          control={form.control} 
          name="dateTimeFormat" 
          label="Date Time Format"
          options={dateTimeFormats}
        />
        <SelectFormField 
          control={form.control} 
          name="locale" 
          label="Locale"
          options={locales}
          required
        />

        <Button type="submit" disabled={saving}>
          {saving ? "Updating account..." : "Update account"}
          {saving && (<IconReload className="ml-1 size-4 animate-spin"/>)}
        </Button>
      </form>
    </Form>
  )
}
