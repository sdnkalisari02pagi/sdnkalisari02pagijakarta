-- Database Schema for Games Edukasi (SDN Kalisari 02 Pagi)

-- 1. Game Categories Table
CREATE TABLE IF NOT EXISTS game_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Games Table
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    cover_url TEXT,
    difficulty VARCHAR(50) DEFAULT 'medium',
    xp_reward INTEGER DEFAULT 100,
    coin_reward INTEGER DEFAULT 10,
    enabled BOOLEAN DEFAULT true,
    total_levels INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Game Levels Table
CREATE TABLE IF NOT EXISTS game_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL,
    xp_required INTEGER DEFAULT 0,
    is_locked BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(game_id, level_number)
);

-- 4. Players Table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 100,
    hearts INTEGER DEFAULT 5,
    streak INTEGER DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE,
    avatar_url TEXT,
    frame_url TEXT,
    theme_id VARCHAR(100) DEFAULT 'default',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Player Progress Table
CREATE TABLE IF NOT EXISTS player_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    level_unlocked INTEGER DEFAULT 1,
    max_score INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(player_id, game_id)
);

-- 6. Question Bank Table
CREATE TABLE IF NOT EXISTS question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES game_categories(id) ON DELETE SET NULL,
    game_id UUID REFERENCES games(id) ON DELETE SET NULL,
    level_number INTEGER NOT NULL DEFAULT 1,
    question_id TEXT NOT NULL,
    question_en TEXT NOT NULL,
    explanation_id TEXT,
    explanation_en TEXT,
    hint_id TEXT,
    hint_en TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Question Options Table
CREATE TABLE IF NOT EXISTS question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE,
    option_a_id TEXT NOT NULL,
    option_a_en TEXT NOT NULL,
    option_b_id TEXT NOT NULL,
    option_b_en TEXT NOT NULL,
    option_c_id TEXT NOT NULL,
    option_c_en TEXT NOT NULL,
    option_d_id TEXT NOT NULL,
    option_d_en TEXT NOT NULL,
    correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Badges Table
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL,
    name_id VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    icon_url TEXT,
    xp_requirement INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Player Badges Table
CREATE TABLE IF NOT EXISTS player_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(player_id, badge_id)
);

-- 10. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    reward_xp INTEGER DEFAULT 50,
    reward_coins INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. Player Achievements Table
CREATE TABLE IF NOT EXISTS player_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(player_id, achievement_id)
);

-- 12. Daily Challenges Table
CREATE TABLE IF NOT EXISTS daily_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
    title_id VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    target_count INTEGER DEFAULT 1,
    challenge_type VARCHAR(50) NOT NULL,
    reward_xp INTEGER DEFAULT 100,
    reward_coins INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 13. Weekly Missions Table
CREATE TABLE IF NOT EXISTS weekly_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_id VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    target_count INTEGER DEFAULT 5,
    mission_type VARCHAR(50) NOT NULL,
    reward_xp INTEGER DEFAULT 300,
    reward_coins INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 14. Shop Items (Avatar, Theme, Frame) Table
CREATE TABLE IF NOT EXISTS shop_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('avatar', 'theme', 'frame')),
    name_id VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    cost INTEGER NOT NULL DEFAULT 50,
    item_url TEXT,
    item_value VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 15. Player Owned Items Table
CREATE TABLE IF NOT EXISTS player_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    item_id UUID REFERENCES shop_items(id) ON DELETE CASCADE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(player_id, item_id)
);

-- 16. Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    xp_gained INTEGER DEFAULT 0,
    coins_gained INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    wrong_answers INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_question_bank_game ON question_bank(game_id);
CREATE INDEX IF NOT EXISTS idx_question_options_q ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_player_progress_player ON player_progress(player_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_player ON game_sessions(player_id);

-- Enable RLS for Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on games" ON games FOR SELECT USING (true);
CREATE POLICY "Allow public select on players" ON players FOR SELECT USING (true);
CREATE POLICY "Allow public select on question_bank" ON question_bank FOR SELECT USING (true);
CREATE POLICY "Allow public select on question_options" ON question_options FOR SELECT USING (true);
CREATE POLICY "Allow public select on game_categories" ON game_categories FOR SELECT USING (true);
