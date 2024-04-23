import { useForm } from "react-hook-form"
import { Button } from "@/components/custom/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { AvatarUploader } from "@/components/custom/avatar-uploader"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  file: z.string().min(1, { message: "Required"}),
  description: z.string().min(1, { message: "Required"})
})

type FormSchema = z.infer<typeof formSchema>

export default function UploadAvatarForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      file: "",
      description: "user avatar"
    },
    mode: "onChange",
  })

  function onSubmit(formData: FormSchema) {
    console.log("upload avatar")
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
              <FormDescription>This is how others will see you on the site</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-500">Update avatar</Button>
      </form>
    </Form>
  )
}
