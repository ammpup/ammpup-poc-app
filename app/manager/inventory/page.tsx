"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ShoppingCart,
  AlertTriangle,
  Package,
  TrendingDown,
  Search,
  Plus,
  Edit,
  Menu,
  BarChart,
  Users,
  TrendingUp,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Rice (Local)",
    category: "Grains",
    currentStock: 25,
    minStock: 50,
    unit: "kg",
    costPerUnit: 800,
    supplier: "Lagos Rice Mills",
    lastRestocked: "2024-01-10",
    status: "low-stock",
  },
  {
    id: "2",
    name: "Chicken (Whole)",
    category: "Protein",
    currentStock: 0,
    minStock: 20,
    unit: "pieces",
    costPerUnit: 3500,
    supplier: "Fresh Poultry Ltd",
    lastRestocked: "2024-01-08",
    status: "out-of-stock",
  },
  {
    id: "3",
    name: "Palm Oil",
    category: "Oils",
    currentStock: 15,
    minStock: 10,
    unit: "liters",
    costPerUnit: 1200,
    supplier: "Golden Palm Co.",
    lastRestocked: "2024-01-12",
    status: "in-stock",
  },
  {
    id: "4",
    name: "Tomatoes (Fresh)",
    category: "Vegetables",
    currentStock: 8,
    minStock: 15,
    unit: "kg",
    costPerUnit: 600,
    supplier: "Farm Fresh Supplies",
    lastRestocked: "2024-01-11",
    status: "low-stock",
  },
  {
    id: "5",
    name: "Beef (Fresh)",
    category: "Protein",
    currentStock: 12,
    minStock: 10,
    unit: "kg",
    costPerUnit: 4500,
    supplier: "Premium Meat Co.",
    lastRestocked: "2024-01-12",
    status: "in-stock",
  },
]

export default function InventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "out-of-stock":
        return "Out of Stock"
      default:
        return status
    }
  }

  const categories = ["all", ...Array.from(new Set(inventoryItems.map((item) => item.category)))]
  const lowStockItems = inventoryItems.filter((item) => item.status === "low-stock" || item.status === "out-of-stock")
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-green-600 to-orange-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-white font-bold text-lg">AMMPUP Manager</span>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link href="/manager" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <BarChart className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/manager/inventory"
              className="flex items-center px-4 py-3 text-gray-700 bg-green-50 border-r-4 border-green-500 rounded-l-lg"
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-gray-600 mt-2">Track stock levels and manage suppliers</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                    <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-green-600">₦{totalValue.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                  </div>
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Cost/Unit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Supplier</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Last restocked: {item.lastRestocked}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.category}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">
                              {item.currentStock} {item.unit}
                            </p>
                            <p className="text-sm text-gray-600">
                              Min: {item.minStock} {item.unit}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                        </td>
                        <td className="py-4 px-4 font-medium">₦{item.costPerUnit.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-600">{item.supplier}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Restock Item</DialogTitle>
                                </DialogHeader>
                                {selectedItem && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Item Name</Label>
                                      <Input value={selectedItem.name} disabled />
                                    </div>
                                    <div>
                                      <Label>Current Stock</Label>
                                      <Input value={`${selectedItem.currentStock} ${selectedItem.unit}`} disabled />
                                    </div>
                                    <div>
                                      <Label>Restock Quantity</Label>
                                      <Input placeholder="Enter quantity to add" />
                                    </div>
                                    <div>
                                      <Label>Supplier</Label>
                                      <Input value={selectedItem.supplier} />
                                    </div>
                                    <Button className="w-full bg-green-600 hover:bg-green-700">Update Stock</Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {item.status !== "in-stock" && (
                              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
