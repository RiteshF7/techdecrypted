-- =====================================================
-- Analytics Database Setup for TechDecrypted Blog
-- =====================================================

-- 1. Create the main views table (if not exists)
CREATE TABLE IF NOT EXISTS views (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the view_analytics table for detailed tracking
CREATE TABLE IF NOT EXISTS view_analytics (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL,
    viewer_ip INET NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id TEXT,
    is_unique BOOLEAN DEFAULT TRUE
);

-- 3. Create the daily_views table for aggregated analytics
CREATE TABLE IF NOT EXISTS daily_views (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL,
    date DATE NOT NULL,
    total_views BIGINT DEFAULT 0,
    unique_views BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(slug, date)
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_views_slug ON views(slug);
CREATE INDEX IF NOT EXISTS idx_view_analytics_slug ON view_analytics(slug);
CREATE INDEX IF NOT EXISTS idx_view_analytics_viewed_at ON view_analytics(viewed_at);
CREATE INDEX IF NOT EXISTS idx_view_analytics_ip_slug ON view_analytics(viewer_ip, slug);
CREATE INDEX IF NOT EXISTS idx_daily_views_slug_date ON daily_views(slug, date);

-- 5. Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_views_updated_at ON views;
CREATE TRIGGER update_views_updated_at 
    BEFORE UPDATE ON views 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_views_updated_at ON daily_views;
CREATE TRIGGER update_daily_views_updated_at 
    BEFORE UPDATE ON daily_views 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Create function to check if view is unique (same IP, same slug, within 24 hours)
CREATE OR REPLACE FUNCTION is_unique_view(viewer_ip_in INET, slug_in TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM view_analytics 
        WHERE viewer_ip = viewer_ip_in 
        AND slug = slug_in 
        AND viewed_at > NOW() - INTERVAL '24 hours'
    );
END;
$$ language 'plpgsql';

-- 8. Create function to update daily_views
CREATE OR REPLACE FUNCTION update_daily_views()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO daily_views (slug, date, total_views, unique_views)
    VALUES (NEW.slug, DATE(NEW.viewed_at), 1, 1)
    ON CONFLICT (slug, date)
    DO UPDATE SET
        total_views = daily_views.total_views + 1,
        unique_views = CASE 
            WHEN NEW.is_unique THEN daily_views.unique_views + 1
            ELSE daily_views.unique_views
        END,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create trigger to automatically update daily_views
DROP TRIGGER IF EXISTS trigger_update_daily_views ON view_analytics;
CREATE TRIGGER trigger_update_daily_views
    AFTER INSERT ON view_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_views();

-- 10. Enable Row Level Security (RLS)
ALTER TABLE views ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_views ENABLE ROW LEVEL SECURITY;

-- 11. Create RLS policies to allow anonymous access for analytics
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous read access on views" ON views;
DROP POLICY IF EXISTS "Allow anonymous insert/update on views" ON views;
DROP POLICY IF EXISTS "Allow anonymous read access on view_analytics" ON view_analytics;
DROP POLICY IF EXISTS "Allow anonymous insert on view_analytics" ON view_analytics;
DROP POLICY IF EXISTS "Allow anonymous read access on daily_views" ON daily_views;

-- Allow anonymous users to read view counts
CREATE POLICY "Allow anonymous read access on views" ON views
    FOR SELECT USING (true);

-- Allow anonymous users to insert/update view counts
CREATE POLICY "Allow anonymous insert/update on views" ON views
    FOR ALL USING (true);

-- Allow anonymous users to read analytics data
CREATE POLICY "Allow anonymous read access on view_analytics" ON view_analytics
    FOR SELECT USING (true);

-- Allow anonymous users to insert analytics data
CREATE POLICY "Allow anonymous insert on view_analytics" ON view_analytics
    FOR INSERT WITH CHECK (true);

-- Allow anonymous users to read daily views
CREATE POLICY "Allow anonymous read access on daily_views" ON daily_views
    FOR SELECT USING (true);

-- 12. Insert some sample data for testing (optional)
-- INSERT INTO views (slug, count) VALUES 
--     ('android-app-development-fundamentals', 0),
--     ('android-mvvm-architecture', 0),
--     ('android-performance-optimization', 0)
-- ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- Verification Queries (run these to test the setup)
-- =====================================================

-- Check if tables were created
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('views', 'view_analytics', 'daily_views');

-- Check if indexes were created
-- SELECT indexname, tablename FROM pg_indexes WHERE tablename IN ('views', 'view_analytics', 'daily_views');

-- Check if functions were created
-- SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public' AND routine_name IN ('update_updated_at_column', 'is_unique_view', 'update_daily_views');

-- Check if triggers were created
-- SELECT trigger_name, event_object_table FROM information_schema.triggers WHERE trigger_schema = 'public';

-- =====================================================
-- Notes:
-- =====================================================
-- 1. Run this script in your Supabase SQL Editor
-- 2. Make sure your environment variables are set:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 3. The system will automatically track:
--    - Page views with unique visitor detection
--    - Device types, browsers, and operating systems
--    - Referrer information
--    - Daily aggregated statistics
-- 4. Access analytics at: /admin/analytics
