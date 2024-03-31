import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/store/theme-provider'
import router from '@/router'
import '@/assets/main.css'
import { AppInfoService } from '@/api/app-info-service'

AppInfoService.load().then(appInfo => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </React.StrictMode>
  )
});


