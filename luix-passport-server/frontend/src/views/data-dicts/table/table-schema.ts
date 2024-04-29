import { z } from "zod"

export const formSchema = z.object({
  id: z.string().optional(),
  num: z.string().optional(),
  categoryCode: z.string().trim().min(1, { message: "Required" }),
  dictCode: z.string().trim().min(1, { message: "Required" }),
  dictName: z.string().optional(),
  remark: z.string().optional(),
  enabled: z.boolean().optional(),
  modifiedAt: z.string().optional()
})

export type FormSchema = z.infer<typeof formSchema>

export const initialFormState: FormSchema = {
  id: "",
  num: "",
  categoryCode: "",
  dictCode: "",
  dictName: "",
  remark: "",
  enabled: true,
  modifiedAt: ""
}

export const criteriaSchema = z.object({
  num: z.string().optional(),
  categoryCode: z.string().optional(),
  enabled: z.string().optional()
})

export type CriteriaSchema = z.infer<typeof criteriaSchema>

export const initialCriteriaState: CriteriaSchema = {
  num: "",
  categoryCode: "",
  enabled: ""
}