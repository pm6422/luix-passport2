import ReactDOM from "react-dom/client"
import { AppInfoService } from "@/services/app-info-service"
import { AccountService } from "./services/account-service"
import { AppInfoProvider } from "@/stores/app-info-provider"
import { ThemeProvider } from "@/stores/theme-provider"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/custom/toaster"
import router from "@/router"
import "@/main.css"
import "@/assets/sass/intro.scss"

Promise.all([AppInfoService.load(), AccountService.getCurrentAccount()]).then(results => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
      <AppInfoProvider defaultValue={results[0]}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster/>
        </ThemeProvider>
      </AppInfoProvider>
    // </React.StrictMode>
  )
})
