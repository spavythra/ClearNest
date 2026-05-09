"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Package, Plus, AlertTriangle, Trash2 } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  min_quantity: number
  expiry_date?: string
  status: "ok" | "low" | "expired"
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Basmati Rice",
      category: "Grains",
      quantity: 8,
      unit: "kg",
      min_quantity: 2,
      status: "ok",
    },
    {
      id: "2",
      name: "Olive Oil",
      category: "Oils",
      quantity: 0.5,
      unit: "L",
      min_quantity: 1,
      status: "low",
      expiry_date: "2025-08-15",
    },
    {
      id: "3",
      name: "Turmeric Powder",
      category: "Spices",
      quantity: 0.2,
      unit: "kg",
      min_quantity: 0.5,
      status: "low",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Grains",
    quantity: 1,
    unit: "kg",
    min_quantity: 1,
    expiry_date: "",
  })

  const categories = [
    "Grains",
    "Oils",
    "Spices",
    "Canned Goods",
    "Vegetables",
    "Household",
  ]

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      const item: InventoryItem = {
        id: Math.random().toString(),
        ...newItem,
        status: newItem.quantity > newItem.min_quantity ? "ok" : "low",
      }
      setItems([...items, item])
      setNewItem({
        name: "",
        category: "Grains",
        quantity: 1,
        unit: "kg",
        min_quantity: 1,
        expiry_date: "",
      })
      setShowForm(false)
    }
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const lowStockItems = items.filter((i) => i.status === "low")
  const totalValue = items.length
  const goodStock = items.filter((i) => i.status === "ok").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "low":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "expired":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return ""
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-10 h-10 text-emerald-600 animate-float" />
              <h1 className="text-5xl font-bold text-gradient-gold">
                Inventory
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Track household items and supplies
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-luxe p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Total Items
              </p>
              <p className="text-4xl font-bold text-gradient-gold">
                {totalValue}
              </p>
            </div>
            <div className="card-luxe p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Good Stock
              </p>
              <p className="text-4xl font-bold text-gradient-gold">
                {goodStock}
              </p>
            </div>
            <div className="card-luxe p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Low Stock Alert
              </p>
              <p className="text-4xl font-bold text-red-600">
                {lowStockItems.length}
              </p>
            </div>
          </div>

          {/* Add Item Form */}
          {showForm && (
            <div className="card-luxe p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Add Inventory Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="e.g., Basmati Rice"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: parseFloat(e.target.value),
                        })
                      }
                      step="0.1"
                      min="0"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAddItem} className="btn-golden flex-1">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Item
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="btn-golden mb-12 py-3 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </Button>
          )}

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="card-luxe bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 p-6 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                    Low Stock Alert
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-3">
                    {lowStockItems.length} item(s) below minimum quantity
                  </p>
                  <ul className="space-y-1">
                    {lowStockItems.map((item) => (
                      <li key={item.id} className="text-sm text-yellow-800 dark:text-yellow-300">
                        {item.name} - Only {item.quantity} {item.unit} left
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`card-luxe p-6 border ${getStatusColor(item.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.category}
                    </p>
                  </div>
                  <span className="text-2xl">
                    {item.status === "ok" ? "✅" : item.status === "low" ? "⚠️" : "❌"}
                  </span>
                </div>

                <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-2xl font-bold text-gradient-gold">
                    {item.quantity}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.unit} (Min: {item.min_quantity})
                  </p>
                </div>

                {item.expiry_date && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    📅 Expires: {new Date(item.expiry_date).toLocaleDateString()}
                  </p>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteItem(item.id)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {items.length === 0 && !showForm && (
            <div className="card-luxe p-12 text-center">
              <Package className="w-16 h-16 text-emerald-600 opacity-30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Inventory Items</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Start tracking your household items
              </p>
              <Button onClick={() => setShowForm(true)} className="btn-golden">
                Add First Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
