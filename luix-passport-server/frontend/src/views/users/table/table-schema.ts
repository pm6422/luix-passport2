import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input"

export const formSchema = z.object({
  id: z.string().optional(),
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email("Invalid email format"),
  mobileNo: z.string().trim().min(1, { message: "Required" }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  activationCode: z.string().optional(),
  resetAt: z.string().optional(),
  remark: z.string().optional(),
  language: z.string().trim().min(1, { message: "Required" }),
  locale: z.string().trim().min(1, { message: "Required" }),
  profilePhotoEnabled: z.boolean().optional(),
  activated: z.boolean().optional(),
  enabled: z.boolean().optional(),
  accountExpiresAt: z.string().optional(),
  passwordExpiresAt: z.string().optional(),
  lastSignInAt: z.string().optional(),
  roles: z.array(z.string()).min(1, { message: "Required" }),
  createdAt: z.string().optional(),
  modifiedAt: z.string().optional()
})

export type FormSchema = z.infer<typeof formSchema>

export const initialFormState: FormSchema = {
  id: "",
  username: "",
  email: "",
  mobileNo: "",
  firstName: "",
  lastName: "",
  activationCode: "",
  resetAt: "",
  remark: "",
  language: "en",
  locale: "en_US",
  profilePhotoEnabled: false,
  activated: false,
  enabled: true,
  roles: ["ROLE_ANONYMOUS", "ROLE_USER"],
  createdAt: "",
  modifiedAt: ""
}
export const criteriaSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  mobileNo: z.string().optional(),
  enabled: z.string().optional()
})

export type CriteriaSchema = z.infer<typeof criteriaSchema>

export const initialCriteriaState: CriteriaSchema = {
  username: "",
  email: "",
  mobileNo: "",
  enabled: ""
}