"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Jollof Rice",
    description: "Traditional Nigerian jollof rice with chicken and plantain",
    price: 2500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/jollof-rice-chicken-IGFJlrGQItq1qKZpgurdlkehaHLu4a.png",
    category: "Mains",
    available: true,
  },
  {
    id: "2",
    name: "Pepper Soup",
    description: "Spicy Nigerian pepper soup with assorted meat",
    price: 1800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/nigerian-pepper-soup-OyRuoWiWqyv4zxiw3fYMsBMbS2DL9l.jpg",
    category: "Starters",
    available: true,
  },
  {
    id: "3",
    name: "Suya",
    description: "Grilled spiced meat skewers with onions",
    price: 1500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/nigerian-suya-meat-skewers-WuRw8RCLeSmsohc2NDLwYPDc45dsIZ.jpg",
    category: "Starters",
    available: true,
  },
  {
    id: "4",
    name: "Pounded Yam & Egusi",
    description: "Traditional pounded yam with rich egusi soup",
    price: 3000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/pounded-yam-and-egusi-soup-b4P6XK5Or0pZvIaMexBsRa7wgdAcZ1.jpg",
    category: "Mains",
    available: false,
  },
  {
    id: "5",
    name: "Chapman",
    description: "Refreshing Nigerian cocktail drink",
    price: 800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/chapman-cocktail-drink-U85i9yeASqzVOS84KqFzNVSUZkNoz3.jpg",
    category: "Drinks",
    available: true,
  },
  {
    id: "6",
    name: "Chin Chin",
    description: "Sweet fried pastry cubes",
    price: 500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/nigerian-chin-chin-pastry-vlRd8XgmINl8mBmXpDyQuQBmI6HseZ.jpg",
    category: "Desserts",
    available: true,
  },
];

const categories = ["All", "Starters", "Mains", "Drinks", "Desserts"];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartItemsCount = Object.values(cart).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Menu</h1>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-md mx-auto mb-20 px-4 py-6">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`${!item.available ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>

                    {item.available ? (
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          Available
                        </Badge>
                        <div className="flex items-center space-x-2">
                          {cart[item.id] > 0 && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {cart[item.id]}
                              </span>
                            </>
                          )}
                          <Button
                            size="sm"
                            onClick={() => addToCart(item.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-700"
                      >
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link
              href="/menu"
              className="flex flex-col items-center py-2 text-green-600"
            >
              <div className="w-6 h-6 mb-1">🏠</div>
              <span className="text-xs">Menu</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center py-2 text-gray-500 relative"
            >
              <ShoppingCart className="w-6 h-6 mb-1" />
              <span className="text-xs">Cart</span>
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center py-2 text-gray-500"
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
