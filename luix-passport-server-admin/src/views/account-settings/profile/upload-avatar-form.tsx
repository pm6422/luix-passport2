import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AvatarUpload } from '@/components/custom/avatar-upload'
import { toast } from 'sonner'
import { cn } from '@/libs/utils'
import { zodResolver } from '@hookform/resolvers/zod'

const uploadAvatarFormSchema = z.object({
  image: z.string().min(1, { message: 'Required'} )
})

type UploadAvatarFormSchema = z.infer<typeof uploadAvatarFormSchema>


export default function UploadAvatarForm() {
  const form = useForm<UploadAvatarFormSchema>({
    resolver: zodResolver(uploadAvatarFormSchema),
    defaultValues: { 
      image: '' 
    },
    mode: 'onChange',
  })

  function onSubmit(data: UploadAvatarFormSchema) {
    console.log('upload avatar')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarUpload onChange={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type='submit'>Update avatar</Button>
      </form>
    </Form>
  )
}
