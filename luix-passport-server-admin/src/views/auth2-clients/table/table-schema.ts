import { z } from "zod"

export const formSchema = z.object({
  id: z.string().optional(),
  clientId: z.string().trim().min(1, { message: "Required" }),
  clientName: z.string().trim().min(1, { message: "Required" }),
  rawClientSecret: z.string().trim().min(1, { message: "Required" }),
  clientAuthenticationMethods: z.array(z.string()).min(1, { message: "Required" }),
  authorizationGrantTypes: z.array(z.string()).min(1, { message: "Required" }),
  // redirectUris: z.array(z.string()).min(1, { message: "Required" }),
  redirectUris: z.array(z.object({ value: z.string().url({ message: "Please enter a valid URL." })})).optional(),
  postLogoutRedirectUris: z.array(z.string()).min(1, { message: "Required" }),
  scopes: z.array(z.string()).min(1, { message: "Required" }),
  clientSettings: z.string().optional(),
  tokenSettings: z.string().optional(),
  clientIdIssuedAt: z.string().optional(),
  clientSecretExpiresAt: z.string().optional()
})

export type FormSchema = z.infer<typeof formSchema>

export const initialFormState: FormSchema = {
  id: "",
  clientId: "",
  clientName: "",
  rawClientSecret: "",
  clientAuthenticationMethods: [],
  authorizationGrantTypes: [],
  redirectUris: [],
  postLogoutRedirectUris: [],
  scopes: [],
  clientSettings: "",
  tokenSettings: "",
  clientIdIssuedAt: "",
  clientSecretExpiresAt: "",
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