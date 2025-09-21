import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, MessageCircle, Mail } from "lucide-react"

export default function PaymentConfirmationPage() {
  const orderNumber = "AMP-" + Math.random().toString(36).substr(2, 6).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We'll start preparing it right away.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Order #{orderNumber}</h2>
              <p className="text-sm text-gray-600">Table 5</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>2x Jollof Rice</span>
                <span>₦5,000</span>
              </div>
              <div className="flex justify-between">
                <span>1x Pepper Soup</span>
                <span>₦1,800</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (7.5%)</span>
                <span>₦387</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Paid</span>
                <span className="text-green-600">₦7,187</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Estimated Time</h3>
                <p className="text-sm text-gray-600">15-20 minutes</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                <strong>Status:</strong> Order received and being prepared
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share Receipt */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Share Receipt</h3>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/order-tracking" className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700">Track Your Order</Button>
          </Link>

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
