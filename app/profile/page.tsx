import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, User, MapPin, Phone, Mail, Star, Settings } from "lucide-react"

export default function CustomerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/menu">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Profile Info */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">John Doe</h2>
            <p className="text-gray-600">Regular Customer</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">4.8 Rating</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">+234 801 234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">john.doe@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Lagos, Nigeria</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link href="/orders">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <div className="w-6 h-6 mr-3">📋</div>
              Order History
            </Button>
          </Link>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Star className="w-5 h-5 mr-3" />
            Favorite Items
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Settings className="w-5 h-5 mr-3" />
            Account Settings
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
              <ArrowLeft className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link href="/menu" className="flex flex-col items-center py-2 text-gray-500">
              <div className="w-6 h-6 mb-1">🏠</div>
              <span className="text-xs">Menu</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center py-2 text-gray-500">
              <div className="w-6 h-6 mb-1">🛒</div>
              <span className="text-xs">Cart</span>
            </Link>
            <Link href="/orders" className="flex flex-col items-center py-2 text-gray-500">
              <div className="w-6 h-6 mb-1">📋</div>
              <span className="text-xs">Orders</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center py-2 text-green-600">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
