'use client'

import { useState, useEffect } from 'react'
import { supabase, Movie } from '@/lib/supabase'
import Header from '@/components/Header'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { Film } from 'lucide-react'

const DEFAULT_CATEGORIES = [
  'แอคชั่น',
  'โรแมนติก',
  'ตลก',
  'สยองขวัญ',
  'ไซไฟ',
  'ดราม่า',
  'แอนิเมชัน',
  'ระทึกขวัญ',
  'ผจญภัย',
  'อาชญากรรม',
]

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    filterMovies()
  }, [movies, searchQuery, selectedCategory])

  const fetchMovies = async () => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMovies(data || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterMovies = () => {
    let filtered = movies

    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (movie.description &&
            movie.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((movie) => movie.category === selectedCategory)
    }

    setFilteredMovies(filtered)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('movies').delete().eq('id', id)
      if (error) throw error
      setMovies(movies.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const handleRate = async (id: string, rating: number) => {
    try {
      const { error } = await supabase
        .from('movies')
        .update({ rating })
        .eq('id', id)

      if (error) throw error

      setMovies(
        movies.map((movie) =>
          movie.id === id ? { ...movie, rating } : movie
        )
      )
    } catch (error) {
      console.error('Error rating movie:', error)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          categories={DEFAULT_CATEGORIES}
          currentCategory={selectedCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery || selectedCategory
                ? 'ไม่พบหนังที่ค้นหา'
                : 'ยังไม่มีหนังในระบบ'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || selectedCategory
                ? 'ลองค้นหาด้วยคำสำคัญอื่นหรือเลือกหมวดหมู่อื่น'
                : 'เริ่มเก็บลิงก์หนังโปรดของคุณได้เลย!'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                หนังทั้งหมด ({filteredMovies.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {selectedCategory && (
                  <>
                    <span>หมวดหมู่: {selectedCategory}</span>
                    <button
                      onClick={() => handleCategoryFilter('')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      ล้าง
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDelete}
                  onRate={handleRate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}