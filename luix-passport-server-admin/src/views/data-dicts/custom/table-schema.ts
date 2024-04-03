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
