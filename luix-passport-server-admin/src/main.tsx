import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AppInfoProvider } from '@/store/app-info-provider'
import { ThemeProvider } from '@/store/theme-provider'
import { AppInfoService } from '@/api/app-info-service'
import router from '@/router'
import '@/main.css'

AppInfoService.load().then(appInfo => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppInfoProvider defaultAppInfo={appInfo}>
        <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </AppInfoProvider>
    </React.StrictMode>
  )
});
