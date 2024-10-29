'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from '@radix-ui/react-avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// コンポーネントの分割
const OrganizationCard = () => (
  <Card className="bg-red-500 sm:max-w-sm">
    <CardHeader>
      <CardTitle>Organization Information</CardTitle>
    </CardHeader>
    <CardContent>
      <p>This card contains important organization details.</p>
    </CardContent>
  </Card>
);

// メインコンポーネント
export function OrganizationFormComponent() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const organizationData: OrganizationData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      website: formData.get('website') as string,
      employeeCount: Number(formData.get('employeeCount')),
    }

    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would typically send the data to your API
      // For example:
      // const response = await fetch('/api/organizations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(organizationData),
      // })
      // if (!response.ok) throw new Error('Failed to save organization')

      console.log(organizationData)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 [&_button]:text-red-500">

      <Button
        type="submit"
        className="hover:bg-green-200 bg-blue-200 dark:bg-red-500"
        disabled={isLoading}
      >
        テストボタン
      </Button>
      <OrganizationCard />
      <div className="bg-red-500 dark:bg-blue-500">あいうえお</div>

      <div className="gap-2 columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        <div className="w-full bg-white text-black text-center">a</div>
        <div className="w-full bg-white text-black text-center">b</div>
        <div className="w-full bg-white text-black text-center">c</div>
        <div className="w-full bg-white text-black text-center">d</div>
        <div className="w-full bg-white text-black text-center">e</div>
        <div className="box-content h-32 w-32 p-4 border-2 ">xxx</div>
      </div>
      <div className="bg-white dark:bg-black">
        いろがかわる
      </div>

      <div className="relative ">
        <p>Relative parent</p>
        <div className="absolute bottom-0 left-0 ">
          <p>Absolute child</p>
        </div>
      </div>



      <h1 className="text-2xl font-bold mb-6">Add Organization</h1>
      <p className="text-green-200 sm:text-red-500 max-[200px]:text-purple-500">xxxxxxppppx</p>
      <p className="text-muted-foreground mb-6">Enter the details of the organization you want to add to the database.</p>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Organization Name</Label>
          <Input id="name" name="name" placeholder="Enter organization name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Enter organization description" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" placeholder="https://example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeCount">Number of Employees</Label>
          <Input id="employeeCount" name="employeeCount" type="number" min="1" placeholder="Enter number of employees" />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Organization"}
        </Button>
      </form>
    </div>
  )
}