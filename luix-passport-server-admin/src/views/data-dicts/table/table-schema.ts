import { z } from 'zod'

export const saveSchema = z.object({
  id: z.string().optional(),
  num: z.string().optional(),
  categoryCode: z.string().trim().min(1, { message: 'Required' }),
  dictCode: z.string().trim().min(1, { message: 'Required' }),
  dictName: z.string().optional(),
  remark: z.string().optional(),
  enabled: z.boolean().optional(),
  modifiedAt: z.string().optional()
})

export type SaveSchema = z.infer<typeof saveSchema>

export const emptyModelData: SaveSchema = {
  id: '',
  num: '',
  categoryCode: '',
  dictCode: '',
  dictName: '',
  remark: '',
  enabled: true
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