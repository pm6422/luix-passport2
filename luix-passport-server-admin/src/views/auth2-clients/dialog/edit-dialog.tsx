import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Dialog } from "@/components/ui/dialog"
import SaveDialogContent from "@/components/custom/dialog/save-dialog-content"
import InputFormField from "@/components/custom/form-field/input"
import ComboboxFormField from "@/components/custom/form-field/combobox"
import { Button } from "@/components/custom/button"
import { IconX, IconPlus } from "@tabler/icons-react"
import { FormLabel, FormDescription } from "@/components/ui/form"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import SwitchFormField from "@/components/custom/form-field/switch"
import { initialFormState, formSchema, type FormSchema } from "../table/table-schema"
import { Oauth2ClientService } from "@/services/oauth2-client-service"
import { merge } from "@/libs/utils"

interface EditDialogProps {
  children: React.ReactNode,
  entityName: string,
  id?: string,
  save: (formData: FormSchema) => Promise<any>,
  afterSave?: (success: boolean) => void
}

export function EditDialog({
  children,
  entityName,
  id,
  save,
  afterSave
}: EditDialogProps) {
  const [open, setOpen] = useState(false)
  const [authenticationMethodOptions, setAuthenticationMethodOptions] = useState(Array<any>)
  const [grantTypeOptions, setGrantTypeOptions] = useState(Array<any>)
  const [scopeOptions, setScopeOptions] = useState(Array<any>)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormState
  })

  const { 
    fields: redirectUriFields, 
    append: addRedirectUri, 
    remove: removeRedirectUri
  } = useFieldArray({
    // @ts-ignore
    name: "redirectUris",
    control: form.control,
  })

  const { 
    fields: postLogoutRedirectUriFields, 
    append: addPostLogoutRedirectUri, 
    remove: removePostLogoutRedirectUri
  } = useFieldArray({
    // @ts-ignore
    name: "postLogoutRedirectUris",
    control: form.control,
  })

  useEffect(() => {
    if(!open) {
      return
    }
    Oauth2ClientService.findClientAuthenticationMethods().then(function (res) {
      const options = res.data.map((item: any) => ({ label: item, value: item }))
      setAuthenticationMethodOptions(options)
    })
    Oauth2ClientService.findAuthorizationGrantTypes().then(function (res) {
      const options = res.data.map((item: any) => ({ label: item, value: item }))
      setGrantTypeOptions(options)
    })
    Oauth2ClientService.findScopes().then(function (res) {
      const options = res.data.map((item: any) => ({ label: item, value: item }))
      setScopeOptions(options)
    })
    if(id) {
      // update form data on every dialog open
      Oauth2ClientService.findById(id).then(r => {
        form.reset(merge(r.data, initialFormState))
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <SaveDialogContent entityName={entityName} id={id} form={form} save={save} afterSave={afterSave} setOpen={setOpen}>
        <InputFormField 
          control={form.control} 
          name="clientId" 
          label="Client ID" 
          required 
          disabled={id ? true : false}
        />

        <InputFormField 
          control={form.control} 
          name="clientName" 
          label="Client Name" 
          required
        />

        <InputFormField 
          control={form.control} 
          name="rawClientSecret" 
          label="Raw Client Secret" 
          required 
          description="Do not forget the secret." 
          hide={id ? true : false}
        />

        <ComboboxFormField
          control={form.control} 
          name="clientAuthenticationMethods"
          label="Authentication Methods"
          required
          options={authenticationMethodOptions}
          multiple={true}
        />

        <ComboboxFormField
          control={form.control} 
          name="authorizationGrantTypes"
          label="Authentication Grant Types"
          required
          options={grantTypeOptions}
          multiple={true}
        />

        <div>
          <RequiredFormLabel>
            Redirect URIs
          </RequiredFormLabel>
          <FormDescription className="mb-3">
            Valid redirect URIs after login successfully.
          </FormDescription>
          {redirectUriFields.map((field, index) => (
            <InputFormField 
              control={form.control} 
              key={field.id}
              // @ts-ignore
              name={`redirectUris.${index}`}
              formItemClassName="mt-2"
              icon={
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex size-9 p-0" 
                  onClick={() => removeRedirectUri(index)}>
                    <IconX className="size-4" />
                    <span className="sr-only">Delete</span>
                </Button>
              }
            />
          ))}
          <div className="flex items-center justify-end w-full mt-2">
            <IconPlus
              className="size-6 mr-1 cursor-pointer text-muted-foreground"
              type="button"
              onClick={() => addRedirectUri("")}
            />
          </div>
        </div>
        <div>
          <FormLabel className="mb-3">
            Post Logout Redirect URIs
          </FormLabel>
          {postLogoutRedirectUriFields.map((field, index) => (
            <InputFormField 
              control={form.control} 
              key={field.id}
              // @ts-ignore
              name={`postLogoutRedirectUris.${index}`}
              formItemClassName="mt-2"
              icon={
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex size-9 p-0" 
                  onClick={() => removePostLogoutRedirectUri(index)}>
                    <IconX className="size-4" />
                    <span className="sr-only">Delete</span>
                </Button>
              }
            />
          ))}
          <div className="flex items-center justify-end w-full mt-2">
            <IconPlus
              className="size-6 mr-1 cursor-pointer text-muted-foreground"
              type="button"
              onClick={() => addPostLogoutRedirectUri("")}
            />
          </div>
        </div>

        <ComboboxFormField
          control={form.control} 
          name="scopes"
          label="Scopes"
          required
          options={scopeOptions}
          multiple={true}
        />

        <SwitchFormField 
          control={form.control} 
          name="enabled" 
          label="Enabled"
          description="After disabling, existing data can still reference the object, but new data can"
        />
      </SaveDialogContent>
    </Dialog>
  )
}
