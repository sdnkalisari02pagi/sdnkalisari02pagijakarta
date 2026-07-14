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

-- 2. Disable Row Level Security (RLS) to match other school tables
-- Since the Admin panel uses local localStorage-based authentication rather than Supabase Auth,
-- we do not restrict writes to Supabase Auth roles.
ALTER TABLE fasilitas DISABLE ROW LEVEL SECURITY;
