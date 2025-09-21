import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QrCode, Utensils, Clock, Star, Users, ChefHat, BarChart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AMMPUP Food Services</h1>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/staff">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Staff Portal
                </Button>
              </Link>
              <Link href="/kitchen">
                <Button variant="outline" size="sm">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Kitchen
                </Button>
              </Link>
              <Link href="/manager">
                <Button variant="outline" size="sm">
                  <BarChart className="w-4 h-4 mr-2" />
                  Manager
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to AMMPUP Food Services</h2>
          <p className="text-lg text-gray-600 text-balance max-w-2xl mx-auto">
            Complete restaurant management platform for Nigerian food businesses. Scan QR codes to order, manage staff
            operations, track kitchen orders, and analyze business performance.
          </p>
        </div>

        {/* Customer Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">For Customers</h3>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Digital Menu</h4>
                <p className="text-sm text-gray-600">
                  Browse our full menu with photos, prices, and real-time availability
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quick Ordering</h4>
                <p className="text-sm text-gray-600">
                  Order and pay directly from your table with multiple payment options
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h4>
                <p className="text-sm text-gray-600">Track your order status and estimated delivery time live</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold">
                <QrCode className="w-5 h-5 mr-2" />
                View Menu & Order Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Staff Portals Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Staff Portal */}
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Staff Portal</h3>
                  <p className="text-sm text-gray-600">Waiter & Service Staff</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Table management & assignment
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Order queue & status tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Payment processing & billing
                </div>
              </div>

              <Link href="/staff">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Access Staff Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Kitchen Portal */}
          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Kitchen Display</h3>
                  <p className="text-sm text-gray-600">Kitchen Staff</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Active order queue with timers
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Item-level status tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Priority & special instructions
                </div>
              </div>

              <Link href="/kitchen">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Access Kitchen Display</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manager Portal */}
          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Manager Dashboard</h3>
                  <p className="text-sm text-gray-600">Owners & Managers</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Sales analytics & KPIs
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Inventory management
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Staff scheduling & reports
                </div>
              </div>

              <Link href="/manager">
                <Button className="w-full bg-green-600 hover:bg-green-700">Access Manager Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Quick Access */}
        <div className="md:hidden mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Access</h3>
          <div className="grid grid-cols-3 gap-4">
            <Link href="/staff">
              <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto bg-transparent">
                <Users className="w-6 h-6 mb-2" />
                <span className="text-xs">Staff</span>
              </Button>
            </Link>
            <Link href="/kitchen">
              <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto bg-transparent">
                <ChefHat className="w-6 h-6 mb-2" />
                <span className="text-xs">Kitchen</span>
              </Button>
            </Link>
            <Link href="/manager">
              <Button variant="outline" className="w-full flex flex-col items-center py-4 h-auto bg-transparent">
                <BarChart className="w-6 h-6 mb-2" />
                <span className="text-xs">Manager</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">AMMPUP Food Services</span>
            </div>
            <p className="text-sm text-gray-600">
              Complete restaurant management platform for Nigerian food businesses
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
