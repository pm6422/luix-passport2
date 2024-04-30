import { zodResolver } from "@hookform/resolvers/zod"
import { IconCalendar, IconSelector, IconCheck } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/libs/utils"
import { Button } from "@/components/custom/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { formatDate } from "@/libs/utils"
import { languages } from "@/data/languages"
import { useAuthUserProvider } from "@/stores/auth-user-provider"

const formSchema = z.object({
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  language: z.string().trim().min(1, { message: "Required" }),
})

type FormSchema = z.infer<typeof formSchema>

export function AccountForm() {
  const authUserProvider = useAuthUserProvider()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: authUserProvider.authUser
  })

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



        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}
