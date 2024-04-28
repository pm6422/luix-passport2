import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthUserProvider } from "@/stores/auth-user-provider"

export function AccountNav() {
  const authUserProvider = useAuthUserProvider()

  function signOut(): void {
    authUserProvider.setAuthUser(null)
    console.log(authUserProvider.authUser)
    window.location.href = "/sign-out"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src='/avatars/louis.jpg' alt='@shadcn' />
            <AvatarFallback>Louis</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>Louis Lau</p>
            <p className='text-xs leading-none text-muted-foreground'>
              louis@luixtech.cn
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/account-settings">
            <DropdownMenuItem className='cursor-pointer'>
              Account Settings
              {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/data-dicts">
            <DropdownMenuItem className='cursor-pointer'>
              Data Dictionaries
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
          Sign out
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
