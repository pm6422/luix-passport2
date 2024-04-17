import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().nullable(),
  num: z.string().nullable(),
  categoryCode: z.string().trim().min(1, { message: 'Required' }),
  dictCode: z.string().trim().min(1, { message: 'Required' }),
  dictName: z.string().nullable(),
  remark: z.string().nullable(),
  enabled: z.boolean().nullable(),
  modifiedAt: z.string().nullable()
})

export type FormSchema = z.infer<typeof formSchema>

export const emptyFormState: FormSchema = {
  id: '',
  num: '',
  categoryCode: '',
  dictCode: '',
  dictName: '',
  remark: '',
  enabled: true,
  modifiedAt: ''
}

export interface ICriteria {
  num: string;
  categoryCode: string;
  enabled: string;
}

export const initialCriteria: ICriteria = {
  num: '',
  categoryCode: '',
  enabled: ''
}