import { Separator } from '@/components/ui/separator'
import UploadAvatarForm from './upload-avatar-form'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
      </div>
      <UploadAvatarForm />
      <Separator className='my-4' />
      <ProfileForm />
    </div>
  )
}
