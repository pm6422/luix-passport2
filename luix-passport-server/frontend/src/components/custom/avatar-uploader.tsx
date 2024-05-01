import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/ui/input"
import { toBase64 } from "@/libs/utils"
import { IconPencil, IconUserScan } from "@tabler/icons-react"

type AvatarUploaderProps = {
  defaultValue?: string
  onValueChange?: (value?: File) => void
}

export function AvatarUploader({
  defaultValue,
  onValueChange
}: AvatarUploaderProps) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(defaultValue)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const base64 = await toBase64(file) as string
			// set image base64 data
      setImageSrc(base64)
			onValueChange?.(file)
    }
  }
  
  return (
    <div className="relative size-40">
      <Avatar className="w-full h-full">
        <AvatarImage src={imageSrc} className="object-cover"/>
        <AvatarFallback className="bg-secondary">
          <IconUserScan className="size-16"/>
        </AvatarFallback>
      </Avatar>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full p-1 bg-secondary hover:bg-secondary-foreground/30 absolute bottom-0 right-0"
        onClick={() => fileInputRef.current?.click()}
      >
        <IconPencil className="size-5"/>
      </Button>

      <Input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/png,image/jpeg,image/jpg,image/gif"
      />
    </div>
  )
}