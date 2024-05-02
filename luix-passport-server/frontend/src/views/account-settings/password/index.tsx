import { Separator } from "@/components/ui/separator"
import { PasswordForm } from "./password-form"

export default function SettingsPassword() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your account password.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}
