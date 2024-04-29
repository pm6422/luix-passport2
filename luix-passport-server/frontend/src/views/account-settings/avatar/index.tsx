import { Separator } from "@/components/ui/separator"
import UploadAvatarForm from "./avatar-form"

export default function SettingsAvatar() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Avatar</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site
        </p>
      </div>
      <Separator />
      <UploadAvatarForm />
    </div>
  )
}
