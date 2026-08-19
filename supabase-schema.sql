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

-- ตาราง categories (สำหรับเก็บหมวดหมู่หนัง)
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

-- สร้าง index สำหรับการค้นหา
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_category ON movies(category);
CREATE INDEX idx_movies_rating ON movies(rating);
CREATE INDEX idx_movies_created_at ON movies(created_at DESC);

-- สร้าง function สำหรับอัปเดต updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_movies_updated_at BEFORE UPDATE ON movies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- เปิดใช้งาน Row Level Security (RLS)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- อนุญาตให้ทุกคนอ่านและเขียนข้อมูลได้ (สำหรับ demo)
-- ใน production ควรตั้งค่า security ที่เข้มงวดกว่านี้
CREATE POLICY "Public access for movies" ON movies
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for categories" ON categories
  FOR ALL USING (true)
  WITH CHECK (true);