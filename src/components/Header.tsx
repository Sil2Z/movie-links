import Link from 'next/link'
import { Plus, Film } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8" />
            <h1 className="text-2xl font-bold">MovieLinks</h1>
          </Link>
          <Link
            href="/add"
            className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>เพิ่มหนัง</span>
          </Link>
        </div>
      </div>
    </header>
  )
}