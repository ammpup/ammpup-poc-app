"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, CreditCard, Banknote, Smartphone, Search, Receipt } from "lucide-react"

interface Payment {
  id: string
  tableNumber: number
  customerName: string
  orderNumber: string
  amount: number
  method: "card" | "cash" | "transfer"
  status: "pending" | "paid" | "split"
  items: { name: string; quantity: number; price: number }[]
  orderTime: string
}

const payments: Payment[] = [
  {
    id: "1",
    tableNumber: 2,
    customerName: "John Doe",
    orderNumber: "AMP-ABC123",
    amount: 7187,
    method: "card",
    status: "pending",
    items: [
      { name: "Jollof Rice", quantity: 2, price: 2500 },
      { name: "Pepper Soup", quantity: 1, price: 1800 },
    ],
    orderTime: "2:30 PM",
  },
  {
    id: "2",
    tableNumber: 4,
    customerName: "Jane Smith",
    orderNumber: "AMP-DEF456",
    amount: 3487,
    method: "cash",
    status: "paid",
    items: [
      { name: "Suya", quantity: 1, price: 1500 },
      { name: "Chapman", quantity: 2, price: 800 },
    ],
    orderTime: "2:15 PM",
  },
  {
    id: "3",
    tableNumber: 6,
    customerName: "Mike Johnson",
    orderNumber: "AMP-GHI789",
    amount: 12500,
    method: "transfer",
    status: "split",
    items: [
      { name: "Pounded Yam & Egusi", quantity: 2, price: 3000 },
      { name: "Jollof Rice", quantity: 1, price: 2500 },
      { name: "Chapman", quantity: 3, price: 800 },
    ],
    orderTime: "1:45 PM",
  },
]

export default function StaffPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.tableNumber.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "split":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />
      case "cash":
        return <Banknote className="w-4 h-4" />
      case "transfer":
        return <Smartphone className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case "card":
        return "Card"
      case "cash":
        return "Cash"
      case "transfer":
        return "Transfer"
      default:
        return method
    }
  }

  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)

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
                <h1 className="text-xl font-bold text-gray-900">Payment Processing</h1>
                <p className="text-sm text-gray-600">Manage table bills and payments</p>
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
              <Button variant="ghost">Orders</Button>
            </Link>
            <Link href="/staff/payments">
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                Payments
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">₦{totalPending.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-green-600">₦{totalPaid.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Bills</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {payments.filter((p) => p.status !== "paid").length}
                  </p>
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
              placeholder="Search by order, customer, or table..."
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
              variant={statusFilter === "paid" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("paid")}
              className={statusFilter === "paid" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Paid
            </Button>
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{payment.orderNumber}</h3>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status === "pending"
                          ? "Pending Payment"
                          : payment.status === "paid"
                            ? "Paid"
                            : "Split Payment"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Table</p>
                        <p className="font-medium">Table {payment.tableNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium">{payment.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <div className="flex items-center space-x-1">
                          {getMethodIcon(payment.method)}
                          <span className="font-medium">{getMethodText(payment.method)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Time</p>
                        <p className="font-medium">{payment.orderTime}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                            View Bill Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Bill Details - {payment.orderNumber}</DialogTitle>
                          </DialogHeader>
                          {selectedPayment && (
                            <div className="space-y-4">
                              <div>
                                <p className="font-medium mb-2">Items:</p>
                                <div className="space-y-2">
                                  {selectedPayment.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span>
                                        {item.quantity}x {item.name}
                                      </span>
                                      <span>₦{(item.quantity * item.price).toLocaleString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t pt-2">
                                <div className="flex justify-between font-semibold">
                                  <span>Total Amount:</span>
                                  <span>₦{selectedPayment.amount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <p className="text-xl font-bold text-green-600">₦{payment.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:w-48">
                    {payment.status === "pending" && (
                      <>
                        <Button className="bg-green-600 hover:bg-green-700">Process Payment</Button>
                        <Button variant="outline" size="sm">
                          Split Bill
                        </Button>
                      </>
                    )}
                    {payment.status === "paid" && <Button variant="outline">Print Receipt</Button>}
                    {payment.status === "split" && (
                      <Button className="bg-blue-600 hover:bg-blue-700">Manage Split</Button>
                    )}
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
