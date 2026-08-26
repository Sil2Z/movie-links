'use client'

import { useState, useEffect } from 'react'
import { supabase, Movie } from '@/lib/supabase'
import Header from '@/components/Header'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { Film, Sparkles, TrendingUp, Clock, X } from 'lucide-react'
import Link from 'next/link'

const DEFAULT_CATEGORIES = [
  // หมวดหมู่หนังแบบดั้งเดิม
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
  // หมวดหมู่หนังตามประเทศ
  'หนังไทย',
  'หนังเกาหลี',
  'หนังญี่ปุ่น',
  'หนังจีน',
  'หนังอินเดีย',
  'หนังฝรั่ง',
  'หนังฮ่องกง',
  // หมวดหมู่การเงิน
  'เทรด Crypto',
  'การลงทุน',
  'การเงินส่วนบุคคล',
  'หุ้น',
  'Forex',
  'NFT',
  'DeFi',
  // หมวดหมู่อื่นๆ
  'การศึกษา',
  'บันเทิง',
  'ข่าว',
  'กีฬา',
  'เกม',
  'เทคโนโลยี',
  'สุขภาพ',
  'อาหาร',
  'ท่องเที่ยว',
  'ดนตรี',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />
      <div className="relative container mx-auto px-4 py-8">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ทั้งหมด</p>
                <p className="text-3xl font-bold text-gray-800">{movies.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">หมวดหมู่</p>
                <p className="text-3xl font-bold text-gray-800">{DEFAULT_CATEGORIES.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ล่าสุด</p>
                <p className="text-lg font-bold text-gray-800">
                  {movies.length > 0 ? new Date(movies[0].created_at).toLocaleDateString('th-TH') : '-'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          categories={DEFAULT_CATEGORIES}
          currentCategory={selectedCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-6">
              <Film className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchQuery || selectedCategory
                ? 'ไม่พบลิงก์ที่ค้นหา'
                : 'ยังไม่มีลิงก์ในระบบ'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory
                ? 'ลองค้นหาด้วยคำสำคัญอื่นหรือเลือกหมวดหมู่อื่น'
                : 'เริ่มเก็บลิงก์โปรดของคุณได้เลย!'}
            </p>
            {!searchQuery && !selectedCategory && (
              <Link
                href="/add"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>เพิ่มลิงก์แรกของคุณ</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <span>
                    {selectedCategory ? selectedCategory : 'ลิงก์ทั้งหมด'}
                  </span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredMovies.length} รายการ
                  {searchQuery && ` • ค้นหา: "${searchQuery}"`}
                </p>
              </div>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryFilter('')}
                  className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>ล้างตัวกรอง</span>
                </button>
              )}
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