import { Switch, Route } from "wouter"
import { queryClient } from "./lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Sidebar } from "@/components/portal/sidebar"
import PortalHome from "@/pages/portal-home"
import NotFound from "@/pages/not-found"
import { useState } from "react"

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortalHome} />
      <Route path="/portal-home" component={PortalHome} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  const [activePage, setActivePage] = useState("home")

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="seedwave-ui-theme">
        <TooltipProvider>
          <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar activePage={activePage} onPageChange={setActivePage} />
            <main className="flex-1 ml-0 md:ml-80 transition-all duration-300">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
