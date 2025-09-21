"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, CheckCircle, ChefHat, Bell } from "lucide-react"

const orderStatuses = [
  { id: 1, name: "Order Received", icon: CheckCircle, completed: true },
  { id: 2, name: "Preparing", icon: ChefHat, completed: true },
  { id: 3, name: "Ready for Pickup", icon: Bell, completed: false },
]

export default function OrderTrackingPage() {
  const [currentStatus, setCurrentStatus] = useState(2)
  const [estimatedTime, setEstimatedTime] = useState(12) // minutes

  const orderNumber = "AMP-" + Math.random().toString(36).substr(2, 6).toUpperCase()

  // Simulate status updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStatus < 3) {
        setCurrentStatus(currentStatus + 1)
        setEstimatedTime(estimatedTime - 5)
      }
    }, 10000) // Update every 10 seconds for demo

    return () => clearTimeout(timer)
  }, [currentStatus, estimatedTime])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/payment-confirmation">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Track Order</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Order Info */}
        <Card className="mb-6">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Order #{orderNumber}</h2>
            <p className="text-gray-600 mb-4">Table 5</p>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-semibold text-orange-600">
                {estimatedTime > 0 ? `${estimatedTime} min remaining` : "Ready!"}
              </span>
            </div>

            <Badge
              className={`${currentStatus === 3 ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
            >
              {currentStatus === 3 ? "Ready for Pickup" : "Being Prepared"}
            </Badge>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              {orderStatuses.map((status, index) => {
                const isCompleted = index < currentStatus
                const isCurrent = index === currentStatus - 1
                const IconComponent = status.icon

                return (
                  <div key={status.id} className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : isCurrent
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"}`}>
                        {status.name}
                      </p>
                      {isCurrent && <p className="text-sm text-orange-600">In progress...</p>}
                      {isCompleted && index < currentStatus - 1 && <p className="text-sm text-green-600">Completed</p>}
                    </div>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Your Order</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>2x Jollof Rice</span>
                <span>₦5,000</span>
              </div>
              <div className="flex justify-between">
                <span>1x Pepper Soup</span>
                <span>₦1,800</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₦7,187</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          {currentStatus === 3 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-semibold mb-2">🎉 Your order is ready!</p>
              <p className="text-sm text-green-700">Please collect from the counter</p>
            </div>
          )}

          <Link href="/menu" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Order More Items
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
