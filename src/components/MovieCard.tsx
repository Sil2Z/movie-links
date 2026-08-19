'use client'

import { Movie } from '@/lib/supabase'
import { Star, ExternalLink, Trash2 } from 'lucide-react'
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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {movie.image_url && (
        <div className="relative h-48 bg-gray-200">
          <img
            src={movie.image_url}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {movie.category}
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
        {movie.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{movie.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= currentRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="text-sm text-gray-500 ml-2">({currentRating}/5)</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a
            href={movie.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">ดูหนัง</span>
          </a>
          {onDelete && (
            <button
              onClick={() => onDelete(movie.id)}
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">ลบ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}