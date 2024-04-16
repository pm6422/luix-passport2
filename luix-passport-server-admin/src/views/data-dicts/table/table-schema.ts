import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tableSchema = z.object({
  id: z.string(),
  num: z.string(),
  categoryCode: z.string(),
  dictCode: z.string(),
  dictName: z.string().optional(),
  remark: z.string().optional(),
  enabled: z.boolean(),
  modifiedAt: z.string()
})

export type DataDictSchema = z.infer<typeof tableSchema>

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

export const saveSchema = z.object({
  id: z.string().optional(),
  categoryCode: z.string(),
  dictCode: z.string().min(1),
  dictName: z.string().optional(),
  remark: z.string().optional(),
  enabled: z.boolean().optional(),
})

export type SaveSchema = z.infer<typeof saveSchema>