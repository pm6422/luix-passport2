import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  id: z.string(),
  num: z.string(),
  categoryCode: z.string(),
  dictCode: z.string(),
  dictName: z.string().nullable(),
  remark: z.string().nullable(),
  enabled: z.boolean(),
  modifiedAt: z.string()
})

export type DataDict = z.infer<typeof schema>
