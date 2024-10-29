import { AppSidebar } from "@/components/AppSidebar"
import Charts from "@/components/charts-01"
import { OrganizationFormComponent } from "@/components/organization-form"
import {
  SidebarLayout,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function Page() {
  const { cookies } = await import("next/headers")
  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        <Charts />
      </div>
    </main>
  )
}
