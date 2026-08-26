'use client'

import { Search, Filter, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  categories: string[]
  currentCategory: string
}

export default function SearchBar({
  onSearch,
  onCategoryFilter,
  categories,
  currentCategory,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'แอคชั่น': 'from-red-500 to-pink-500',
      'โรแมนติก': 'from-pink-500 to-rose-500',
      'ตลก': 'from-yellow-500 to-orange-500',
      'สยองขวัญ': 'from-purple-500 to-violet-500',
      'ไซไฟ': 'from-blue-500 to-cyan-500',
      'ดราม่า': 'from-gray-500 to-slate-500',
      'แอนิเมชัน': 'from-orange-500 to-amber-500',
      'ระทึกขวัญ': 'from-indigo-500 to-purple-500',
      'ผจญภัย': 'from-green-500 to-emerald-500',
      'อาชญากรรม': 'from-slate-700 to-gray-900',
      'เทรด Crypto': 'from-emerald-500 to-teal-500',
      'การลงทุน': 'from-teal-500 to-cyan-500',
      'การเงินส่วนบุคคล': 'from-cyan-500 to-blue-500',
      'หุ้น': 'from-sky-500 to-blue-500',
      'Forex': 'from-violet-500 to-purple-500',
      'NFT': 'from-fuchsia-500 to-pink-500',
      'DeFi': 'from-rose-500 to-red-500',
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
      <form onSubmit={handleSearch} className="flex items-center space-x-3 mb-4">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="ค้นหาหนัง, การเงิน, หรือหมวดหมู่..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>ค้นหา</span>
        </button>
        
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`p-4 rounded-xl transition-all duration-300 ${
            showFilters 
              ? 'bg-purple-100 text-purple-600 border-2 border-purple-500' 
              : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </form>

      {showFilters && (
        <div className="border-t border-gray-200 pt-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>หมวดหมู่ทั้งหมด</span>
            </h4>
            <span className="text-xs text-gray-500">{categories.length} หมวดหมู่</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
            <button
              onClick={() => onCategoryFilter('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentCategory === ''
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentCategory === category
                    ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}