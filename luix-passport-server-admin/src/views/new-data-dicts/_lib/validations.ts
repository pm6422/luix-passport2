// import { tasks } from "@/db/schema"
import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  num: z.string().optional(),
  categoryCode: z.string().optional(),
  dictCode: z.string().optional(),
  enabled: z.boolean().optional(),
  modifiedAt: z.string().optional()
  // status: z.string().optional(),
  // priority: z.string().optional(),
  // from: z.string().optional(),
  // to: z.string().optional(),
  // operator: z.enum(["and", "or"]).optional(),
})

export const getDataDictsSchema = searchParamsSchema

export type GetDataDictsSchema = z.infer<typeof getDataDictsSchema>

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

export type DataDict = z.infer<typeof tableSchema>

// export const createTaskSchema = z.object({
//   title: z.string(),
//   label: z.enum(tasks.label.enumValues),
//   status: z.enum(tasks.status.enumValues),
//   priority: z.enum(tasks.priority.enumValues),
// })

// export type CreateTaskSchema = z.infer<typeof createTaskSchema>

// export const updateTaskSchema = z.object({
//   id: z.string(),
//   label: z.enum(tasks.label.enumValues).optional(),
//   status: z.enum(tasks.status.enumValues).optional(),
//   priority: z.enum(tasks.priority.enumValues).optional(),
// })

// export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
