'use client'

import { useState, useEffect } from 'react'
import { supabase, Movie } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import { ArrowLeft, Save, Sparkles, Film, Link as LinkIcon, Image as ImageIcon, Loader2, Edit2 } from 'lucide-react'
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

export default function EditMoviePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'แอคชั่น',
    image_url: '',
  })
  const [loading, setLoading] = useState(false)
  [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) {
        setNotFound(true)
        return
      }

      setFormData({
        title: data.title,
        description: data.description || '',
        url: data.url,
        category: data.category,
        image_url: data.image_url || '',
      })
    } catch (error) {
      console.error('Error fetching movie:', error)
      setError('ไม่พบข้อมูลหนัง')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: updateError } = await supabase
        .from('movies')
        .update({
          title: formData.title,
          description: formData.description || null,
          url: formData.url,
          category: formData.category,
          image_url: formData.image_url || null,
        })
        .eq('id', id)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการแก้ไข กรุณาลองใหม่')
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

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <Film className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">ไม่พบข้อมูล</h1>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </div>
    )
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                <Edit2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                แก้ไขลิงก์
              </h1>
              <p className="text-gray-600">แก้ไขข้อมูลลิงก์ที่คุณเก็บไว้</p>
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
                <span className="font-medium">แก้ไขสำเร็จ! กำลังนำทาง...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Film className="w-4 h-4 text-blue-500" />
                  <span>ชื่อเรื่อง *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="ระบุชื่อเรื่อง..."
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>คำอธิบาย</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none"
                  placeholder="เพิ่มคำอธิบายเกี่ยวกับเรื่องนี้ (ไม่บังคับ)"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-blue-500" />
                  <span>ลิงก์ *</span>
                </label>
                <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="https://example.com/link"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>หมวดหมู่ *</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800"
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
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  <span>URL รูปภาพปก</span>
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="https://example.com/image.jpg (ไม่บังคับ)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                )}
                <span className="relative">{loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}