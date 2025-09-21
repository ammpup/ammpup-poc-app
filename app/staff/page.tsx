"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Clock, DollarSign, Plus, Search } from "lucide-react"

interface Table {
  id: string
  number: number
  status: "available" | "occupied" | "needs-cleaning"
  customers: number
  orderValue: number
  timeOccupied: string
}

const tables: Table[] = [
  { id: "1", number: 1, status: "available", customers: 0, orderValue: 0, timeOccupied: "" },
  { id: "2", number: 2, status: "occupied", customers: 4, orderValue: 12500, timeOccupied: "45 min" },
  { id: "3", number: 3, status: "needs-cleaning", customers: 0, orderValue: 0, timeOccupied: "" },
  { id: "4", number: 4, status: "occupied", customers: 2, orderValue: 7187, timeOccupied: "20 min" },
  { id: "5", number: 5, status: "available", customers: 0, orderValue: 0, timeOccupied: "" },
  { id: "6", number: 6, status: "occupied", customers: 3, orderValue: 8900, timeOccupied: "1h 15min" },
  { id: "7", number: 7, status: "available", customers: 0, orderValue: 0, timeOccupied: "" },
  { id: "8", number: 8, status: "needs-cleaning", customers: 0, orderValue: 0, timeOccupied: "" },
]

export default function StaffDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.number.toString().includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || table.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200"
      case "needs-cleaning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "occupied":
        return "Occupied"
      case "needs-cleaning":
        return "Needs Cleaning"
      default:
        return status
    }
  }

  const occupiedTables = tables.filter((t) => t.status === "occupied").length
  const totalRevenue = tables.reduce((sum, t) => sum + t.orderValue, 0)

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
                <h1 className="text-xl font-bold text-gray-900">Staff Dashboard</h1>
                <p className="text-sm text-gray-600">Table Management System</p>
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
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                Tables
              </Button>
            </Link>
            <Link href="/staff/orders">
              <Button variant="ghost">Orders</Button>
            </Link>
            <Link href="/staff/payments">
              <Button variant="ghost">Payments</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Occupied Tables</p>
                  <p className="text-2xl font-bold text-gray-900">{occupiedTables}/8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Table Time</p>
                  <p className="text-2xl font-bold text-gray-900">42 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search table number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === "available" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("available")}
              className={selectedStatus === "available" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Available
            </Button>
            <Button
              variant={selectedStatus === "occupied" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("occupied")}
              className={selectedStatus === "occupied" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Occupied
            </Button>
            <Button
              variant={selectedStatus === "needs-cleaning" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("needs-cleaning")}
              className={selectedStatus === "needs-cleaning" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              Cleaning
            </Button>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <Card key={table.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">Table {table.number}</h3>
                  <Badge className={getStatusColor(table.status)}>{getStatusText(table.status)}</Badge>
                </div>

                {table.status === "occupied" && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customers:</span>
                      <span className="font-medium">{table.customers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Value:</span>
                      <span className="font-medium text-green-600">₦{table.orderValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{table.timeOccupied}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {table.status === "available" && (
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Assign Table
                    </Button>
                  )}

                  {table.status === "occupied" && (
                    <>
                      <Link href={`/staff/table/${table.id}`}>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                        Process Payment
                      </Button>
                    </>
                  )}

                  {table.status === "needs-cleaning" && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                      Mark as Clean
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
