"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Clock, AlertCircle, CheckCircle, Users, Timer } from "lucide-react"

interface KitchenOrder {
  id: string
  orderNumber: string
  tableNumber: number
  customerName: string
  items: {
    id: string
    name: string
    quantity: number
    specialInstructions?: string
    status: "pending" | "preparing" | "ready"
  }[]
  orderTime: string
  estimatedTime: number // minutes
  priority: "normal" | "high" | "urgent"
  totalItems: number
}

const kitchenOrders: KitchenOrder[] = [
  {
    id: "1",
    orderNumber: "AMP-ABC123",
    tableNumber: 2,
    customerName: "John Doe",
    items: [
      { id: "1a", name: "Jollof Rice", quantity: 2, status: "preparing", specialInstructions: "Extra spicy" },
      { id: "1b", name: "Pepper Soup", quantity: 1, status: "pending" },
    ],
    orderTime: "2:30 PM",
    estimatedTime: 12,
    priority: "normal",
    totalItems: 3,
  },
  {
    id: "2",
    orderNumber: "AMP-DEF456",
    tableNumber: 4,
    customerName: "Jane Smith",
    items: [
      { id: "2a", name: "Suya", quantity: 1, status: "ready" },
      { id: "2b", name: "Chapman", quantity: 2, status: "ready" },
    ],
    orderTime: "2:15 PM",
    estimatedTime: 0,
    priority: "high",
    totalItems: 3,
  },
  {
    id: "3",
    orderNumber: "AMP-GHI789",
    tableNumber: 6,
    customerName: "Mike Johnson",
    items: [
      { id: "3a", name: "Pounded Yam & Egusi", quantity: 1, status: "pending" },
      { id: "3b", name: "Chin Chin", quantity: 1, status: "pending" },
    ],
    orderTime: "2:45 PM",
    estimatedTime: 18,
    priority: "urgent",
    totalItems: 2,
  },
  {
    id: "4",
    orderNumber: "AMP-JKL012",
    tableNumber: 8,
    customerName: "Sarah Wilson",
    items: [
      { id: "4a", name: "Jollof Rice", quantity: 1, status: "preparing" },
      { id: "4b", name: "Pepper Soup", quantity: 2, status: "preparing", specialInstructions: "Less pepper for one" },
    ],
    orderTime: "2:50 PM",
    estimatedTime: 15,
    priority: "normal",
    totalItems: 3,
  },
]

export default function KitchenDashboard() {
  const [orders, setOrders] = useState(kitchenOrders)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active")

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate time countdown
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          estimatedTime: Math.max(0, order.estimatedTime - 1),
        })),
      )
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const updateItemStatus = (orderId: string, itemId: string, newStatus: "pending" | "preparing" | "ready") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)),
            }
          : order,
      ),
    )
  }

  const markOrderComplete = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) => ({ ...item, status: "ready" as const })),
            }
          : order,
      ),
    )
  }

  const activeOrders = orders.filter((order) => order.items.some((item) => item.status !== "ready"))

  const completedOrders = orders.filter((order) => order.items.every((item) => item.status === "ready"))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const displayOrders = activeTab === "active" ? activeOrders : completedOrders

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleTimeString()} • {activeOrders.length} active orders
                </p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Exit Kitchen
              </Button>
            </Link>
          </div>

          {/* Tab Navigation */}
          <nav className="flex space-x-1">
            <Button
              variant={activeTab === "active" ? "default" : "ghost"}
              onClick={() => setActiveTab("active")}
              className={activeTab === "active" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Active Orders ({activeOrders.length})
            </Button>
            <Button
              variant={activeTab === "completed" ? "default" : "ghost"}
              onClick={() => setActiveTab("completed")}
              className={activeTab === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Completed Orders ({completedOrders.length})
            </Button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{activeOrders.length}</span>
              </div>
              <p className="text-sm text-gray-600">Active Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Timer className="w-5 h-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    activeOrders.reduce((sum, order) => sum + order.estimatedTime, 0) /
                      Math.max(activeOrders.length, 1),
                  )}
                  m
                </span>
              </div>
              <p className="text-sm text-gray-600">Avg. Time Left</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">
                  {activeOrders.filter((o) => o.priority === "urgent").length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Urgent Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{completedOrders.length}</span>
              </div>
              <p className="text-sm text-gray-600">Completed Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayOrders.map((order) => {
            const allItemsReady = order.items.every((item) => item.status === "ready")
            const hasUrgentItems = order.items.some((item) => item.status === "pending" && order.priority === "urgent")

            return (
              <Card
                key={order.id}
                className={`${hasUrgentItems ? "ring-2 ring-red-300 shadow-lg" : ""} ${allItemsReady ? "bg-green-50 border-green-200" : ""}`}
              >
                <CardContent className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          Table {order.tableNumber} • {order.customerName}
                        </span>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(order.priority)}>{order.priority.toUpperCase()}</Badge>
                  </div>

                  {/* Time Info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Ordered: {order.orderTime}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${order.estimatedTime <= 5 ? "text-red-600" : "text-orange-600"}`}
                    >
                      <Timer className="w-4 h-4" />
                      <span className="font-semibold">
                        {order.estimatedTime > 0 ? `${order.estimatedTime}m left` : "Overdue!"}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {item.quantity}x {item.name}
                            </h4>
                            {item.specialInstructions && (
                              <p className="text-sm text-orange-600 mt-1">Note: {item.specialInstructions}</p>
                            )}
                          </div>
                          <Badge className={getItemStatusColor(item.status)}>{item.status}</Badge>
                        </div>

                        {/* Item Action Buttons */}
                        <div className="flex space-x-2 mt-3">
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => updateItemStatus(order.id, item.id, "preparing")}
                              className="bg-blue-600 hover:bg-blue-700 flex-1"
                            >
                              Start Cooking
                            </Button>
                          )}
                          {item.status === "preparing" && (
                            <Button
                              size="sm"
                              onClick={() => updateItemStatus(order.id, item.id, "ready")}
                              className="bg-green-600 hover:bg-green-700 flex-1"
                            >
                              Mark Ready
                            </Button>
                          )}
                          {item.status === "ready" && (
                            <div className="flex items-center justify-center flex-1 text-green-600 text-sm font-medium">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Ready for Pickup
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="border-t pt-4">
                    {allItemsReady ? (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Order Complete!</span>
                        </div>
                        <p className="text-sm text-gray-600">Ready for staff pickup</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          onClick={() => markOrderComplete(order.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          Mark All Items Ready
                        </Button>
                        <div className="text-center text-sm text-gray-600">
                          {order.items.filter((item) => item.status === "ready").length} of {order.items.length} items
                          ready
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {displayOrders.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeTab === "active" ? "No Active Orders" : "No Completed Orders"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "active"
                ? "All caught up! New orders will appear here."
                : "Completed orders will show up here."}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
