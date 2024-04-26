import { z } from "zod"

export const formSchema = z.object({
  id: z.string().optional(),
  clientId: z.string().trim().min(1, { message: "Required" }),
  clientName: z.string().trim().min(1, { message: "Required" }),
  rawClientSecret: z.string().trim().optional(),
  clientAuthenticationMethods: z.array(z.string()).min(1, { message: "Required" }),
  authorizationGrantTypes: z.array(z.string()).min(1, { message: "Required" }),
  redirectUris: z.array(z.string().url({ message: "Invalid redirect URI" })).min(1, { message: "Required" }),
  postLogoutRedirectUris: z.array(z.string().url({ message: "Invalid post logout redirect URI" })).optional(),
  scopes: z.array(z.string()).min(1, { message: "Required" }),
  clientSettings: z.string().optional(),
  tokenSettings: z.string().optional(),
  clientIdIssuedAt: z.string().optional(),
  clientSecretExpiresAt: z.string().optional(),
  enabled: z.boolean().optional(),
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
  enabled: true
}
export const criteriaSchema = z.object({
  keyword: z.string().optional(),
})

export type CriteriaSchema = z.infer<typeof criteriaSchema>

export const initialCriteriaState: CriteriaSchema = {
  keyword: ""
}