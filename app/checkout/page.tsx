"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Banknote, Smartphone } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [tableNumber, setTableNumber] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const total = 7187 // Mock total from cart

  const handlePayment = () => {
    // In real app, this would integrate with payment providers
    window.location.href = "/payment-confirmation"
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Customer Details */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="080XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="table">Table Number</Label>
                <Input
                  id="table"
                  placeholder="e.g., Table 5"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="paystack" id="paystack" />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="paystack" className="font-medium">
                      Card Payment
                    </Label>
                    <p className="text-sm text-gray-600">Pay with debit/credit card via Paystack</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <Label htmlFor="transfer" className="font-medium">
                      Bank Transfer
                    </Label>
                    <p className="text-sm text-gray-600">Transfer to our account</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="cash" id="cash" />
                  <Banknote className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <Label htmlFor="cash" className="font-medium">
                      Pay at Table
                    </Label>
                    <p className="text-sm text-gray-600">Pay with cash when served</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">2x Jollof Rice</span>
                <span>₦5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1x Pepper Soup</span>
                <span>₦1,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span>₦387</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-green-600">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Fixed Bottom Payment */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
            disabled={!customerName || !phoneNumber || !tableNumber}
          >
            {paymentMethod === "cash" ? "Place Order" : "Pay Now"} - ₦{total.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  )
}
