"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ChefHat,
  Star,
  AlertTriangle,
  Menu,
} from "lucide-react"

// Mock data for dashboard
const salesData = [
  { name: "Mon", revenue: 45000, orders: 32 },
  { name: "Tue", revenue: 52000, orders: 38 },
  { name: "Wed", revenue: 48000, orders: 35 },
  { name: "Thu", revenue: 61000, orders: 42 },
  { name: "Fri", revenue: 78000, orders: 55 },
  { name: "Sat", revenue: 89000, orders: 67 },
  { name: "Sun", revenue: 72000, orders: 51 },
]

const menuPerformance = [
  { name: "Jollof Rice", orders: 156, revenue: 390000 },
  { name: "Pepper Soup", orders: 89, revenue: 160200 },
  { name: "Suya", orders: 67, revenue: 100500 },
  { name: "Pounded Yam", orders: 45, revenue: 135000 },
  { name: "Chapman", orders: 134, revenue: 107200 },
]

const customerSatisfaction = [
  { name: "5 Stars", value: 68, color: "#10B981" },
  { name: "4 Stars", value: 22, color: "#F59E0B" },
  { name: "3 Stars", value: 7, color: "#EF4444" },
  { name: "2 Stars", value: 2, color: "#DC2626" },
  { name: "1 Star", value: 1, color: "#991B1B" },
]

export default function ManagerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const todayStats = {
    revenue: 89000,
    orders: 67,
    avgOrderValue: 1328,
    tableTurnover: 3.2,
    customerSatisfaction: 4.6,
    staffPerformance: 92,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-green-600 to-orange-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-white font-bold text-lg">AMMPUP Manager</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link
              href="/manager"
              className="flex items-center px-4 py-3 text-gray-700 bg-green-50 border-r-4 border-green-500 rounded-l-lg"
            >
              <BarChart className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/manager/inventory"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Inventory
            </Link>
            <Link
              href="/manager/staff"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Staff
            </Link>
            <Link
              href="/manager/reports"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Reports
            </Link>
            <Link
              href="/manager/settings"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Menu className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b lg:hidden">
          <div className="px-4 py-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your restaurant's performance</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₦{todayStats.revenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{todayStats.orders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">₦{todayStats.avgOrderValue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3.8%</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Table Turnover</p>
                    <p className="text-2xl font-bold text-gray-900">{todayStats.tableTurnover}x</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{todayStats.customerSatisfaction}/5</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.2</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Staff Performance</p>
                    <p className="text-2xl font-bold text-gray-900">{todayStats.staffPerformance}%</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.3%</span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Revenue & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSatisfaction}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerSatisfaction.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Menu Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuPerformance.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₦{item.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Low Stock Alert</p>
                      <p className="text-sm text-red-700">Rice running low - 2 days remaining</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Staff Schedule</p>
                      <p className="text-sm text-yellow-700">3 staff members scheduled for tomorrow</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Customer Feedback</p>
                      <p className="text-sm text-blue-700">New 5-star review received</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Sales Milestone</p>
                      <p className="text-sm text-green-700">Monthly target 85% achieved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
