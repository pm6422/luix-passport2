import {
  IconComponents,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconLayoutDashboard,
  IconSettings,
  IconUserCog,
  IconUserShield,
  IconUsers,
  IconUserPlus,
  IconDoorEnter,
  IconShieldCog,
  IconShieldLock
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={25} />,
  },
  {
    title: 'User Roles',
    label: '',
    href: '',
    icon: <IconUserCog size={25} />,
    sub: [
      {
        title: 'Users',
        label: '',
        href: '/users',
        icon: <IconUsers size={25} />,
      },
      {
        title: 'Roles',
        label: '',
        href: '/roles',
        icon: <IconUserShield size={25} />,
      },
      {
        title: 'Permissions',
        label: '',
        href: '/permissions',
        icon: <IconUserPlus size={25} />,
      },
    ],
  },
  {
    title: 'Authentication',
    label: '',
    href: '',
    icon: <IconShieldCog size={25} />,
    sub: [
      {
        title: 'Oauth2 Clients',
        label: '',
        href: '/oauth2-clients',
        icon: <IconShieldLock size={25} />,
      },
      {
        title: 'Sign In (Box)',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={25} />,
      },
      {
        title: 'Sign Up',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={25} />,
      },
      {
        title: 'Forgot Password',
        label: '',
        href: '/forgot-password',
        icon: <IconHexagonNumber4 size={25} />,
      },
    ],
  },
  {
    title: 'Extra Components',
    label: '',
    href: '/extra-components',
    icon: <IconComponents size={25} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={25} />,
  }
]
