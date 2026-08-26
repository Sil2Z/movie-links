'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { ArrowLeft, Save, Sparkles, Film, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
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

export default function AddMoviePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'แอคชั่น',
    image_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: insertError } = await supabase.from('movies').insert([
        {
          title: formData.title,
          description: formData.description || null,
          url: formData.url,
          category: formData.category,
          image_url: formData.image_url || null,
          rating: 0,
        },
      ])

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเพิ่มหนัง กรุณาลองใหม่')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">กลับหน้าหลัก</span>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                เพิ่มลิงก์ใหม่
              </h1>
              <p className="text-gray-600">เก็บลิงก์หนัง การเงิน หรือเนื้อหาที่คุณชอบ</p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center space-x-3 animate-in slide-in-from-top-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium">บันทึกสำเร็จ! กำลังนำทาง...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Film className="w-4 h-4 text-purple-500" />
                  <span>ชื่อเรื่อง *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="ระบุชื่อเรื่อง..."
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>คำอธิบาย</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none"
                  placeholder="เพิ่มคำอธิบายเกี่ยวกับเรื่องนี้ (ไม่บังคับ)"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-purple-500" />
                  <span>ลิงก์ *</span>
                </label>
                <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="https://example.com/link"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>หมวดหมู่ *</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800"
                >
                  {DEFAULT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                  <span>URL รูปภาพปก</span>
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="https://example.com/image.jpg (ไม่บังคับ)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="relative">{loading ? 'กำลังบันทึก...' : 'บันทึกเลย'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}