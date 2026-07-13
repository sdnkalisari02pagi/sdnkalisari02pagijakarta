-- Database Schema for Fasilitas (SDN Kalisari 02 Pagi)

-- 1. Create Fasilitas Table
CREATE TABLE IF NOT EXISTS fasilitas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_id VARCHAR(255) NOT NULL,
    nama_en VARCHAR(255) NOT NULL,
    foto TEXT NOT NULL,
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE fasilitas ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Allow public select (read-only)
CREATE POLICY "Allow public read access to fasilitas" ON fasilitas
    FOR SELECT USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow authenticated full access to fasilitas" ON fasilitas
    FOR ALL USING (auth.role() = 'authenticated');
