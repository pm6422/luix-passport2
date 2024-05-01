import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/custom/button"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconUser, IconCodeCircle2, IconApi, IconAssembly, IconLogout } from "@tabler/icons-react"
import { RoleDeveloper } from "@/components/custom/role/role-developer"
import { useAuthUserProvider } from "@/stores/auth-user-provider"

export function AccountNav() {
  const authUserProvider = useAuthUserProvider()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-12 rounded-full">
          <Avatar className="size-12">
            <AvatarImage src="api/accounts/profile-pic"/>
            <AvatarFallback>Picture</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{authUserProvider.authUser.firstName} {authUserProvider.authUser.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {authUserProvider.authUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/account-settings">
            <DropdownMenuItem className="cursor-pointer">
              <IconUser className="size-4 mr-2"/>Account Settings
              {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <RoleDeveloper>
          <DropdownMenuLabel className="flex items-center gap-2">
            <IconCodeCircle2 className="size-6"/>Developer Tools
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link to="/api-docs">
              <DropdownMenuItem className="cursor-pointer">
                <IconApi className="size-4 mr-2"/>API Documentation
              </DropdownMenuItem>
            </Link>
            <Link to="/data-dicts">
              <DropdownMenuItem className="cursor-pointer">
                <IconAssembly className="size-4 mr-2"/>Data Dictionaries
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </RoleDeveloper>
        <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = "/sign-out"}>
          <IconLogout className="size-4 mr-2"/>Sign out
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
