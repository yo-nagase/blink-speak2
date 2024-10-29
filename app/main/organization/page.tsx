import { OrganizationFormComponent } from "@/components/organization-form"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function OrganizationPage() {
  return (

    <main className="flex-1 overflow-y-auto">
      <SidebarTrigger />

      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 responsive-bg smobile:responsive-bg sm:responsive-bg md:responsive-bg lg:responsive-bg xl:responsive-bg">
          Organization List
        </h1>
        <OrganizationFormComponent />
      </div>
    </main>

  )
}