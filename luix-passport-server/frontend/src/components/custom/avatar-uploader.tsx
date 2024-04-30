import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { toBase64 } from "@/libs/utils";
import { IconPencil, IconUserScan } from "@tabler/icons-react";
import React from "react";

type AvatarUploaderProps = {
	defaultValue?: string;
	onValueChange?: (value?: string) => void;
}

export function AvatarUploader({
	defaultValue,
	onValueChange
}: AvatarUploaderProps) {
	
	const inputRef = React.useRef<HTMLInputElement>(null)
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const base64 = await toBase64(file) as string;
			onValueChange?.(base64);
		}
	}
	
	return (
		<div className="relative w-40 h-40">
			<Avatar className="w-full h-full">
				<AvatarImage src={defaultValue} className="object-cover"/>
				<AvatarFallback className="bg-secondary">
					<IconUserScan className="size-16"/>
				</AvatarFallback>
			</Avatar>
			<Button
				variant="ghost"
				size="icon"
				className="rounded-full p-1 bg-secondary hover:bg-secondary-foreground/30 absolute bottom-0 right-0"
				onClick={e => {
					e.preventDefault()
					inputRef.current?.click()
				}}
			>
				<IconPencil className="size-5"/>
			</Button>
			<Input
				ref={inputRef}
				type="file"
				className="hidden"
				onChange={handleChange}
				accept="image/*"
			/>
		</div>
	)
}