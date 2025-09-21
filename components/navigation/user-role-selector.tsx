"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, ChefHat, BarChart, QrCode } from "lucide-react"
import Link from "next/link"

export function UserRoleSelector() {
  const [open, setOpen] = useState(false)

  const roles = [
    {
      title: "Customer",
      description: "Browse menu and place orders",
      icon: QrCode,
      href: "/menu",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Staff",
      description: "Manage tables and process orders",
      icon: Users,
      href: "/staff",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Kitchen",
      description: "View and update order status",
      icon: ChefHat,
      href: "/kitchen",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "Manager",
      description: "Analytics and business management",
      icon: BarChart,
      href: "/manager",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Switch Role</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Role</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <Link key={role.title} href={role.href} onClick={() => setOpen(false)}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{role.title}</h3>
                    <p className="text-xs text-gray-600">{role.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
