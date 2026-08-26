'use client'

import { Movie } from '@/lib/supabase'
import { Star, ExternalLink, Trash2, Clock, Eye } from 'lucide-react'
import { useState } from 'react'

interface MovieCardProps {
  movie: Movie
  onDelete?: (id: string) => void
  onRate?: (id: string, rating: number) => void
}

export default function MovieCard({ movie, onDelete, onRate }: MovieCardProps) {
  const [currentRating, setCurrentRating] = useState(movie.rating)
  const [isHovering, setIsHovering] = useState(false)

  const handleRate = (rating: number) => {
    setCurrentRating(rating)
    onRate?.(movie.id, rating)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'แอคชั่น': 'bg-red-500',
      'โรแมนติก': 'bg-pink-500',
      'ตลก': 'bg-yellow-500',
      'สยองขวัญ': 'bg-purple-500',
      'ไซไฟ': 'bg-blue-500',
      'ดราม่า': 'bg-gray-500',
      'แอนิเมชัน': 'bg-orange-500',
      'ระทึกขวัญ': 'bg-indigo-500',
      'ผจญภัย': 'bg-green-500',
      'อาชญากรรม': 'bg-slate-700',
      'เทรด Crypto': 'bg-emerald-500',
      'การลงทุน': 'bg-teal-500',
      'การเงินส่วนบุคคล': 'bg-cyan-500',
      'หุ้น': 'bg-sky-500',
      'Forex': 'bg-violet-500',
      'NFT': 'bg-fuchsia-500',
      'DeFi': 'bg-rose-500',
    }
    return colors[category] || 'bg-gray-500'
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image section */}
      {movie.image_url ? (
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={movie.image_url}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Category badge */}
          <div className={`absolute top-3 right-3 ${getCategoryColor(movie.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-opacity-90`}>
            {movie.category}
          </div>
          
          {/* Rating badge */}
          {currentRating > 0 && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{currentRating}.0</span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-56 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ExternalLink className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium opacity-90">No Image</p>
          </div>
          <div className={`absolute top-3 right-3 ${getCategoryColor(movie.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
            {movie.category}
          </div>
        </div>
      )}

      {/* Content section */}
      <div className="relative p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
          {movie.title}
        </h3>
        
        {movie.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {movie.description}
          </p>
        )}
        
        {/* Rating section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                className="focus:outline-none transition-all duration-200 hover:scale-125 active:scale-95"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= currentRating
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                />
              </button>
            ))}
            <span className="text-sm text-gray-500 ml-2 font-medium">
              {currentRating > 0 ? `${currentRating}/5` : 'ยังไม่มีคะแนน'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <a
            href={movie.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            <span>ดูเลย</span>
          </a>
          
          {onDelete && (
            <button
              onClick={() => onDelete(movie.id)}
              className="group/delete flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(movie.created_at).toLocaleDateString('th-TH')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>ลิงก์ส่วนตัว</span>
          </div>
        </div>
      </div>
    </div>
  )
}