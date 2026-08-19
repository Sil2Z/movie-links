'use client'

import { Search, Filter } from 'lucide-react'
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

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหาหนัง..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          ค้นหา
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </form>

      {showFilters && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">หมวดหมู่:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryFilter('')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                currentCategory === ''
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ทั้งหมด
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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