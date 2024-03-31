import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AppInfoProvider } from '@/store/app-info-provider'
import { ThemeProvider } from '@/store/theme-provider'
import router from '@/router'
import '@/assets/main.css'
import { AppInfoService } from '@/api/app-info-service'

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
