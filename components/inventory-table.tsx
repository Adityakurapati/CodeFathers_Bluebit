"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Droplets, Package, Tent, Utensils, Battery, AlertTriangle } from "lucide-react"

// Mock inventory data
const INVENTORY_ITEMS = [
  {
    id: 1,
    name: "Water Bottles (1L)",
    category: "water",
    icon: Droplets,
    color: "blue",
    current: 1250,
    target: 2000,
    unit: "bottles",
    location: "Main Warehouse",
    lastUpdated: "Today, 9:30 AM",
  },
  {
    id: 2,
    name: "Emergency Food Kits",
    category: "food",
    icon: Utensils,
    color: "amber",
    current: 350,
    target: 500,
    unit: "kits",
    location: "Main Warehouse",
    lastUpdated: "Yesterday, 4:15 PM",
  },
  {
    id: 3,
    name: "First Aid Supplies",
    category: "medical",
    icon: AlertTriangle,
    color: "red",
    current: 120,
    target: 200,
    unit: "kits",
    location: "Medical Storage",
    lastUpdated: "Today, 11:45 AM",
  },
  {
    id: 4,
    name: "Tents (4-Person)",
    category: "shelter",
    icon: Tent,
    color: "green",
    current: 85,
    target: 150,
    unit: "tents",
    location: "Distribution Center",
    lastUpdated: "2 days ago",
  },
  {
    id: 5,
    name: "Blankets",
    category: "shelter",
    icon: Tent,
    color: "green",
    current: 430,
    target: 600,
    unit: "units",
    location: "Distribution Center",
    lastUpdated: "Yesterday, 2:30 PM",
  },
  {
    id: 6,
    name: "Portable Power Banks",
    category: "equipment",
    icon: Battery,
    color: "purple",
    current: 95,
    target: 300,
    unit: "units",
    location: "Tech Storage",
    lastUpdated: "3 days ago",
  },
  {
    id: 7,
    name: "Hygiene Kits",
    category: "hygiene",
    icon: Package,
    color: "cyan",
    current: 280,
    target: 400,
    unit: "kits",
    location: "Main Warehouse",
    lastUpdated: "Today, 8:15 AM",
  },
]

export default function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")

  const filteredItems = INVENTORY_ITEMS.filter((item) => {
    // Search filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    // Stock level filter
    const stockLevel = (item.current / item.target) * 100
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && stockLevel < 50) ||
      (stockFilter === "medium" && stockLevel >= 50 && stockLevel < 80) ||
      (stockFilter === "high" && stockLevel >= 80)

    return matchesSearch && matchesCategory && matchesStock
  })

  const getItemIcon = (Icon: any, color: string) => {
    const colorClasses = {
      blue: "text-blue-400",
      red: "text-red-400",
      green: "text-green-400",
      amber: "text-amber-400",
      purple: "text-purple-400",
      cyan: "text-cyan-400",
    }

    return <Icon className={`h-5 w-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
  }

  const getStockLevelClass = (current: number, target: number) => {
    const percentage = (current / target) * 100

    if (percentage < 50) return "bg-red-500"
    if (percentage < 80) return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">Inventory Management</h2>

        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full rounded-md bg-slate-700 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="water">Water</option>
            <option value="food">Food</option>
            <option value="medical">Medical</option>
            <option value="shelter">Shelter</option>
            <option value="equipment">Equipment</option>
            <option value="hygiene">Hygiene</option>
          </select>

          <select
            className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock (&lt;50%)</option>
            <option value="medium">Medium Stock (50-80%)</option>
            <option value="high">High Stock (&gt;80%)</option>
          </select>

          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Item</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Category</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Stock Level</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Location</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Last Updated</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-700 last:border-0"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getItemIcon(item.icon, item.color)}
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="capitalize text-gray-300">{item.category}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.current / item.target) * 100}%` }}
                        className={`h-full ${getStockLevelClass(item.current, item.target)}`}
                      />
                    </div>
                    <span className="text-sm text-white">
                      {item.current}/{item.target} {item.unit}
                    </span>
                    {item.current < item.target * 0.5 && (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                        className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400"
                      >
                        Low
                      </motion.span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-300">{item.location}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-300">{item.lastUpdated}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded bg-slate-700 px-2 py-1 text-xs text-white hover:bg-slate-600">
                      Update
                    </button>
                    <button className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700">
                      Request
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

