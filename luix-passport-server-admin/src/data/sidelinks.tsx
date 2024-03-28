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
  IconUserPlus
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
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Authentication',
    label: '',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Sign In (email + password)',
        label: '',
        href: '/sign-in',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Sign In (Box)',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Sign Up',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Forgot Password',
        label: '',
        href: '/forgot-password',
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: 'User Roles',
    label: '',
    href: '',
    icon: <IconUserCog size={18} />,
    sub: [
      {
        title: 'Users',
        label: '',
        href: '/users',
        icon: <IconUsers size={18} />,
      },
      {
        title: 'Roles',
        label: '',
        href: '/roles',
        icon: <IconUserShield size={18} />,
      },
      {
        title: 'Permissions',
        label: '',
        href: '/permissions',
        icon: <IconUserPlus size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
  {
    title: 'Extra Components',
    label: '',
    href: '/extra-components',
    icon: <IconComponents size={18} />,
  }
]
