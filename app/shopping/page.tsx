"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Trash2, Check } from "lucide-react"

interface ShoppingItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  is_completed: boolean
  is_sticky: boolean
}

export default function ShoppingPage() {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      name: "Rice",
      category: "Groceries",
      quantity: 5,
      unit: "kg",
      is_completed: false,
      is_sticky: true,
    },
    {
      id: "2",
      name: "Milk",
      category: "Dairy",
      quantity: 2,
      unit: "L",
      is_completed: false,
      is_sticky: true,
    },
    {
      id: "3",
      name: "Spices Mix",
      category: "Spices",
      quantity: 1,
      unit: "pack",
      is_completed: true,
      is_sticky: false,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Groceries",
    quantity: 1,
    unit: "piece",
    is_sticky: false,
  })

  const categories = ["Groceries", "Dairy", "Spices", "Household", "Vegetables"]

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      const item: ShoppingItem = {
        id: Math.random().toString(),
        ...newItem,
        is_completed: false,
      }
      setItems([...items, item])
      setNewItem({
        name: "",
        category: "Groceries",
        quantity: 1,
        unit: "piece",
        is_sticky: false,
      })
      setShowForm(false)
    }
  }

  const toggleComplete = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, is_completed: !item.is_completed } : item
      )
    )
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const completed = items.filter((i) => i.is_completed).length
  const pending = items.filter((i) => !i.is_completed).length

  const groupedItems = categories.reduce(
    (acc, cat) => ({
      ...acc,
      [cat]: items.filter((i) => i.category === cat),
    }),
    {}
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen scenic-overlay bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="decoration-top-right" />
        <div className="decoration-bottom-left" />

        <div className="container-scenic py-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-10 h-10 text-blue-500 animate-float" />
              <h1 className="text-5xl font-bold text-gradient-brand">
                Shopping List
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Manage your family's shopping needs efficiently
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card-elevated p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-2">Pending</p>
              <p className="text-4xl font-bold text-gradient-brand">{pending}</p>
            </div>
            <div className="card-elevated p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Purchased
              </p>
              <p className="text-4xl font-bold text-gradient-blue">{completed}</p>
            </div>
          </div>

          {/* Add Item Form */}
          {showForm && (
            <div className="card-elevated p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Add Item to List</h2>
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
                    placeholder="e.g., Rice, Milk, Vegetables"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          quantity: parseInt(e.target.value),
                        })
                      }
                      min="1"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAddItem} className="btn-brand flex-1">
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
              className="btn-brand mb-12 py-3 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </Button>
          )}

          {/* Items by Category */}
          {Object.entries(groupedItems).map(([category, categoryItems]) =>
            (categoryItems as ShoppingItem[]).length > 0 ? (
              <div key={category} className="mb-8">
                <h3 className="text-2xl font-bold text-gradient-brand mb-4">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(categoryItems as ShoppingItem[]).map((item) => (
                    <div
                      key={item.id}
                      className={`card-elevated p-5 transition-all ${
                        item.is_completed
                          ? "opacity-75 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4
                            className={`font-bold text-lg ${
                              item.is_completed
                                ? "line-through text-slate-500"
                                : ""
                            }`}
                          >
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                        {item.is_sticky && (
                          <span className="text-2xl">📌</span>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleComplete(item.id)}
                          className={`flex-1 ${
                            item.is_completed
                              ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                              : ""
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem(item.id)}
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}

          {items.length === 0 && !showForm && (
            <div className="card-elevated p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-blue-500 opacity-30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Shopping List Empty</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Add items to your shopping list to get started
              </p>
              <Button onClick={() => setShowForm(true)} className="btn-brand">
                Add First Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
