import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { IconX } from "@tabler/icons-react"
import { toast } from "sonner"
import { getErrorMessage } from "@/libs/handle-error"
import { Button } from "@/components/custom/button"
import { IconReload, IconPlus, IconExclamationCircle } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { RequiredFormLabel } from "@/components/custom/required-form-label"
import { Input } from "@/components/ui/input"
import Combobox from "@/components/custom/combobox"
import { Switch } from "@/components/ui/switch"
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
  const [saving, setSaving] = useState(false)
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

  function onSubmit(formData: FormSchema): void {
    setSaving(true)
    toast.promise(save(formData), {
      loading: "Saving " + entityName + "...",
      success: () => {
        setOpen(false)
        form.reset()
        afterSave && afterSave(true)
        setSaving(false)
        return "Saved " + entityName
      },
      error: (error) => {
        setOpen(false)
        afterSave && afterSave(false)
        setSaving(false)
        return getErrorMessage(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="lg:max-w-screen-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{id ? "Update" : "Create"} {entityName}</DialogTitle>
        </DialogHeader>
        <Separator/>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {Object.values(form.formState.errors).length > 0 && (
              <Alert variant="destructive">
                <AlertTitle className="flex items-center"><IconExclamationCircle className="size-5 me-1" />Please check your input.</AlertTitle>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Client ID</RequiredFormLabel>
                  <FormControl>
                    <Input {...field} disabled={id ? true : false}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Client Name</RequiredFormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            { !id && <FormField
              control={form.control}
              name="rawClientSecret"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Raw Client Secret</RequiredFormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormDescription>Do not forget the secret.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="clientAuthenticationMethods"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Authentication Methods</RequiredFormLabel>
                  <FormControl>
                    <Combobox
                      options={authenticationMethodOptions}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      multiple={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorizationGrantTypes"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Authentication Grant Types</RequiredFormLabel>
                  <FormControl>
                    <Combobox
                      options={grantTypeOptions}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      multiple={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <RequiredFormLabel>
                Redirect URIs
              </RequiredFormLabel>
              <FormDescription className="mb-3">
                Valid redirect URIs after login successfully.
              </FormDescription>
              {redirectUriFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`redirectUris.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-between items-center w-full mt-2">
                          <Input {...field} className="w-full"/>
                          <IconX
                            className="h-4 mx-2 cursor-pointer text-muted-foreground"
                            type="button"
                            onClick={() => {
                              removeRedirectUri(index)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex items-center justify-end w-full">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex size-8 p-0 mt-2" 
                  onClick={() => addRedirectUri("")}>
                    <IconPlus className="size-4" />
                    <span className="sr-only">Add</span>
                </Button>
              </div>
            </div>
            <div>
              <FormLabel className="mb-3">
                Post Logout Redirect URIs
              </FormLabel>
              {postLogoutRedirectUriFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`postLogoutRedirectUris.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-between items-center w-full mt-2">
                          <Input {...field} className="w-full"/>
                          <IconX
                            className="h-4 mx-2 cursor-pointer text-muted-foreground"
                            type="button"
                            onClick={() => {
                              removePostLogoutRedirectUri(index)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex items-center justify-end w-full">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex size-8 p-0 mt-2" 
                  onClick={() => addPostLogoutRedirectUri("")}>
                    <IconPlus className="size-4" />
                    <span className="sr-only">Add</span>
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="scopes"
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Scopes</RequiredFormLabel>
                  <FormControl>
                    <Combobox
                      options={scopeOptions}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      multiple={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem >
                  <div className="flex items-center space-x-2">
                    <FormLabel>Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    After disabling, existing data can still reference the object, but new data can't.
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => afterSave && afterSave(true)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={saving}>
                {saving ? "Saving..." : "Save"}
                {saving && (<IconReload className="ml-1 h-4 w-4 animate-spin"/>)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
