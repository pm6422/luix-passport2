import { createRoot } from "react-dom/client"
import { AppInfoService } from "./services/app-info-service"
import { AccountService } from "./services/account-service"
import { AppInfoProvider } from "@/stores/app-info-provider"
import { AuthUserProvider } from "./stores/auth-user-provider"
import { ThemeProvider } from "@/stores/theme-provider"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/custom/toaster"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import router from "@/router"
import "@/main.css"
import "@/assets/sass/intro.scss"

dayjs.extend(utc)
dayjs.extend(timezone)

Promise.all([AppInfoService.load(), AccountService.getCurrentAccount()]).then(results => {
  createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
      <AppInfoProvider defaultValue={results[0]}>
        <AuthUserProvider defaultValue={results[1]}>
          <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster/>
          </ThemeProvider>
        </AuthUserProvider>
      </AppInfoProvider>
    // </React.StrictMode>
  )
})
