"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Clock, Search } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  tableNumber: number
  customerName: string
  items: { name: string; quantity: number; price: number }[]
  status: "pending" | "preparing" | "ready" | "served"
  orderTime: string
  estimatedTime: string
  total: number
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "AMP-ABC123",
    tableNumber: 2,
    customerName: "John Doe",
    items: [
      { name: "Jollof Rice", quantity: 2, price: 2500 },
      { name: "Pepper Soup", quantity: 1, price: 1800 },
    ],
    status: "preparing",
    orderTime: "2:30 PM",
    estimatedTime: "10 min",
    total: 6800,
  },
  {
    id: "2",
    orderNumber: "AMP-DEF456",
    tableNumber: 4,
    customerName: "Jane Smith",
    items: [
      { name: "Suya", quantity: 1, price: 1500 },
      { name: "Chapman", quantity: 2, price: 800 },
    ],
    status: "ready",
    orderTime: "2:15 PM",
    estimatedTime: "Ready",
    total: 3100,
  },
  {
    id: "3",
    orderNumber: "AMP-GHI789",
    tableNumber: 6,
    customerName: "Mike Johnson",
    items: [
      { name: "Pounded Yam & Egusi", quantity: 1, price: 3000 },
      { name: "Chin Chin", quantity: 1, price: 500 },
    ],
    status: "pending",
    orderTime: "2:45 PM",
    estimatedTime: "15 min",
    total: 3500,
  },
]

export default function StaffOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tableNumber.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ready":
        return "bg-green-100 text-green-800 border-green-200"
      case "served":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "preparing":
        return "Preparing"
      case "ready":
        return "Ready"
      case "served":
        return "Served"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
                <p className="text-sm text-gray-600">Track and manage customer orders</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>

          {/* Top Navigation */}
          <nav className="flex space-x-1">
            <Link href="/staff">
              <Button variant="ghost">Tables</Button>
            </Link>
            <Link href="/staff/orders">
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                Orders
              </Button>
            </Link>
            <Link href="/staff/payments">
              <Button variant="ghost">Payments</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter((o) => o.status === "pending").length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter((o) => o.status === "preparing").length}
              </p>
              <p className="text-sm text-gray-600">Preparing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{orders.filter((o) => o.status === "ready").length}</p>
              <p className="text-sm text-gray-600">Ready</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-600">{orders.filter((o) => o.status === "served").length}</p>
              <p className="text-sm text-gray-600">Served</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders, customers, or table numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className={statusFilter === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "preparing" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("preparing")}
              className={statusFilter === "preparing" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Preparing
            </Button>
            <Button
              variant={statusFilter === "ready" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("ready")}
              className={statusFilter === "ready" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Ready
            </Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Table</p>
                        <p className="font-medium">Table {order.tableNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Time</p>
                        <p className="font-medium">{order.orderTime}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>₦{(item.quantity * item.price).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-600">{order.estimatedTime}</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">₦{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:w-48">
                    {order.status === "ready" && (
                      <Button className="bg-green-600 hover:bg-green-700">Mark as Served</Button>
                    )}
                    {order.status === "preparing" && <Button variant="outline">Check Kitchen Status</Button>}
                    {order.status === "pending" && (
                      <Button className="bg-blue-600 hover:bg-blue-700">Send to Kitchen</Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
