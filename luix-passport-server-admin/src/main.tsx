import ReactDOM from 'react-dom/client'
import { AppInfoService } from '@/services/app-info-service'
import { AppInfoProvider } from '@/stores/app-info-provider'
import { ThemeProvider } from '@/stores/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/custom/toaster'
import router from '@/router'
import '@/main.css'
import '@/intro.scss'

AppInfoService.load().then(appInfo => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
      <AppInfoProvider defaultValue={appInfo}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster/>
        </ThemeProvider>
      </AppInfoProvider>
    // </React.StrictMode>
  )
});
