# MovieLinks - เว็บไซต์เก็บลิงก์หนัง

เว็บไซต์สำหรับเก็บลิงก์หนังจากเว็บไซต์ต่างๆ มารวมกันไว้ในที่เดียว สร้างด้วย Next.js และ Supabase

## ฟีเจอร์หลัก

- ✅ เพิ่ม/ลบ ลิงก์หนัง
- ✅ ค้นหาหนังตามชื่อและคำอธิบาย
- ✅ กรองตามหมวดหมู่ (แอคชั่น, โรแมนติก, ตลก, ฯลฯ)
- ✅ ให้คะแนนหนัง (1-5 ดาว)
- ✅ รองรับภาษาไทย
- ✅ Responsive design

## เทคโนโลยีที่ใช้

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Font**: Sarabun (Google Fonts)

## การติดตั้งและตั้งค่า

### 1. Clone โปรเจกต์

```bash
git clone <your-repo-url>
cd movie-links
```

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. ตั้งค่า Supabase

1. ไปที่ [supabase.com](https://supabase.com) และสร้าง project ใหม่ (ฟรี)
2. ไปที่ Settings > API และคัดลอก:
   - Project URL
   - anon public key
3. สร้างไฟล์ `.env.local` และใส่ค่า:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. สร้าง Database Schema

1. ไปที่ Supabase Dashboard > SQL Editor
2. รันคำสั่ง SQL จากไฟล์ `supabase-schema.sql`

หรือคัดลอกคำสั่ง SQL ต่อไปนี้:

```sql
-- เปิดใช้งาน UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ตาราง movies
CREATE TABLE movies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง categories
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- เพิ่มข้อมูลหมวดหมู่เริ่มต้น
INSERT INTO categories (name) VALUES 
('แอคชั่น'),
('โรแมนติก'),
('ตลก'),
('สยองขวัญ'),
('ไซไฟ'),
('ดราม่า'),
('แอนิเมชัน'),
('ระทึกขวัญ'),
('ผจญภัย'),
('อาชญากรรม');

-- สร้าง index
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_category ON movies(category);
CREATE INDEX idx_movies_rating ON movies(rating);
CREATE INDEX idx_movies_created_at ON movies(created_at DESC);

-- Function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_movies_updated_at BEFORE UPDATE ON movies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- เปิดใช้งาน RLS
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policy สำหรับ public access (สำหรับ demo)
CREATE POLICY "Public access for movies" ON movies
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public access for categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);
```

### 5. รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## การ Deploy

### Vercel (แนะนำ)

1. Push code ไปที่ GitHub
2. ไปที่ [vercel.com](https://vercel.com) และ import repository
3. ตั้งค่า environment variables ใน Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy อัตโนมัติ

## โครงสร้างโปรเจกต์

```
movie-links/
├── src/
│   ├── app/
│   │   ├── add/
│   │   │   └── page.tsx          # หน้าเพิ่มหนัง
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # หน้าหลัก
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx            # Header component
│   │   ├── MovieCard.tsx         # Movie card component
│   │   └── SearchBar.tsx         # Search and filter component
│   └── lib/
│       └── supabase.ts           # Supabase client และ types
├── supabase-schema.sql           # Database schema
└── .env.local                    # Environment variables (ไม่ commit)
```

## การใช้งาน

1. **เพิ่มหนัง**: คลิกปุ่ม "เพิ่มหนัง" และกรอกข้อมูล
2. **ค้นหา**: ใช้ช่องค้นหาเพื่อหาตามชื่อหรือคำอธิบาย
3. **กรอง**: คลิกปุ่ม filter เพื่อเลือกหมวดหมู่
4. **ให้คะแนน**: คลิกดาวเพื่อให้คะแนนหนัง
5. **ลบ**: คลิกปุ่มลบเพื่อลบหนัง

## Security Note

⚠️ **สำคัญ**: ใน production ควร:
- ตั้งค่า RLS policies ที่เข้มงวดกว่านี้
- เพิ่ม authentication
- จำกัดสิทธิ์การเข้าถึงข้อมูล
- ไม่เปิด public access โดยตรง

## License

MIT