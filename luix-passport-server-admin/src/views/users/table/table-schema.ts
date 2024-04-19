import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().optional(),
  username: z.string().trim().min(1, { message: 'Required' }),
  email: z.string().trim().min(1, { message: 'Required' }),
  mobileNo: z.string().trim().min(1, { message: 'Required' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  activationCode: z.string().optional(),
  resetAt: z.string().optional(),
  remark: z.string().optional(),
  language: z.string().optional(),
  profilePhotoEnabled: z.boolean().optional(),
  activated: z.boolean().optional(),
  enabled: z.boolean().optional(),
  accountExpiresAt: z.string().optional(),
  passwordExpiresAt: z.string().optional(),
  lastSignInAt: z.string().optional(),
  modifiedAt: z.string().optional()
})

export type FormSchema = z.infer<typeof formSchema>

export const initialFormState: FormSchema = {
  id: '',
  username: '',
  email: '',
  mobileNo: '',
  firstName: '',
  lastName: '',
  activationCode: '',
  resetAt: '',
  remark: '',
  language: '',
  profilePhotoEnabled: false,
  activated: false,
  enabled: true,
  modifiedAt: ''
}

export interface ICriteria {
  username: string;
  email: string;
  mobileNo: string;
  enabled: boolean | null;
}

export const initialCriteria: ICriteria = {
  username: '',
  email: '',
  mobileNo: '',
  enabled: null
}