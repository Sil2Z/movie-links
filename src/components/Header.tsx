import Link from 'next/link'
import { Plus, Film, Sparkles, TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 animate-gradient-x"></div>
      
      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Film className="relative w-10 h-10 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                MovieLinks
              </h1>
              <div className="flex items-center space-x-1 text-xs text-purple-200">
                <Sparkles className="w-3 h-3" />
                <span>Ultimate Collection</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm text-white font-medium">Trending</span>
            </div>
            
            <Link
              href="/add"
              className="group relative flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative">เพิ่มหนัง</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}