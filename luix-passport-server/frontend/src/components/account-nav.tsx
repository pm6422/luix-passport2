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
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
              Account Settings
              {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <RoleDeveloper>
          <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link to="/data-dicts">
              <DropdownMenuItem className="cursor-pointer">
                Data Dictionaries
              </DropdownMenuItem>
            </Link>
            <Link to="/api-docs">
              <DropdownMenuItem className="cursor-pointer">
                API Documentation
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </RoleDeveloper>
        <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = "/sign-out"}>
          Sign out
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
