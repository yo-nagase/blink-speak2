import { AppSidebar } from "@/components/AppSidebar"
import Charts from "@/components/charts-01"
import { DashboardPreview } from "@/components/dashboard-preview"
import { OrganizationFormComponent } from "@/components/organization-form"
import {
  SidebarLayout,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function Page() {
  const { cookies } = await import("next/headers")
  return (

    <TooltipProvider>
      <SidebarTrigger />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <DashboardPreview />
      </main>
    </TooltipProvider>

  )
}
