"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, Package } from "lucide-react";

interface CustomerOrder {
  id: string;
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  status: "pending" | "preparing" | "ready" | "completed";
  orderTime: string;
  estimatedTime: string;
  total: number;
  tableNumber: number;
}

const customerOrders: CustomerOrder[] = [
  // {
  //   id: "1",
  //   orderNumber: "AMP-ABC123",
  //   items: [
  //     { name: "Jollof Rice", quantity: 2, price: 2500 },
  //     { name: "Pepper Soup", quantity: 1, price: 1800 },
  //   ],
  //   status: "preparing",
  //   orderTime: "2:30 PM",
  //   estimatedTime: "10 min",
  //   total: 7187,
  //   tableNumber: 5,
  // },
  // {
  //   id: "2",
  //   orderNumber: "AMP-DEF456",
  //   items: [
  //     { name: "Suya", quantity: 1, price: 1500 },
  //     { name: "Chapman", quantity: 2, price: 800 },
  //   ],
  //   status: "completed",
  //   orderTime: "1:15 PM",
  //   estimatedTime: "Delivered",
  //   total: 3487,
  //   tableNumber: 5,
  // },
];

export default function CustomerOrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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
            <h1 className="text-lg font-semibold text-gray-900">My Orders</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {customerOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    {order.orderNumber}
                  </h3>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>
                        ₦{(item.quantity * item.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>
                    Table {order.tableNumber} • {order.orderTime}
                  </span>
                  <span className="font-medium text-orange-600">
                    {order.estimatedTime}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-semibold text-lg">
                    ₦{order.total.toLocaleString()}
                  </span>
                  {order.status === "preparing" && (
                    <Link href="/order-tracking">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Track Order
                      </Button>
                    </Link>
                  )}
                  {order.status === "completed" && (
                    <Button size="sm" variant="outline">
                      Reorder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {customerOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by browsing our delicious menu
            </p>
            <Link href="/menu">
              <Button className="bg-green-600 hover:bg-green-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link
              href="/menu"
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <div className="w-6 h-6 mb-1">🏠</div>
              <span className="text-xs">Menu</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <div className="w-6 h-6 mb-1">🛒</div>
              <span className="text-xs">Cart</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center py-2 text-green-600"
            >
              <div className="w-6 h-6 mb-1">📋</div>
              <span className="text-xs">Orders</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <div className="w-6 h-6 mb-1">👤</div>
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
