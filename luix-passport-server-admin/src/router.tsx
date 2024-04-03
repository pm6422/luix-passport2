import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './views/errors/general-error'
import NotFoundError from './views/errors/not-found-error'
import MaintenanceError from './views/errors/maintenance-error'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./views/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./views/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./views/auth/forgot-password')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const MainLayout = await import('./layouts/main-layout')
      return { Component: MainLayout.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./views/dashboard/dashboard')).default,
        }),
      },
      {
        path: 'account-settings',
        lazy: async () => ({
          Component: (await import('./views/account-settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./views/account-settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./views/account-settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./views/account-settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./views/account-settings/notifications'))
                .default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./views/account-settings/display')).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (await import('./views/account-settings/error-example'))
                .default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
      {
        path: 'data-dicts',
        lazy: async () => ({
          Component: (await import('@/views/data-dicts/data-dicts')).default,
        }),
      },
      {
        path: 'new-data-dicts',
        lazy: async () => ({
          Component: (await import('@/views/new-data-dicts/data-dicts')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/custom/coming-soon')).default,
        }),
      },
      {
        path: 'roles',
        lazy: async () => ({
          Component: (await import('@/components/custom/coming-soon')).default,
        }),
      },
      {
        path: 'permissions',
        lazy: async () => ({
          Component: (await import('@/components/custom/coming-soon')).default,
        }),
      },
      {
        path: 'oauth2-clients',
        lazy: async () => ({
          Component: (await import('@/components/custom/coming-soon')).default,
        }),
      },
      {
        path: 'extra-components',
        lazy: async () => ({
          Component: (await import('@/views/extra-components/components')).default,
        }),
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
