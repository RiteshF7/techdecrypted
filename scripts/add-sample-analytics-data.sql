-- =====================================================
-- Add Sample Analytics Data for Existing Blogs
-- Run this script in your Supabase SQL Editor AFTER running add-existing-blogs-to-supabase.sql
-- =====================================================

-- Add some sample view analytics data for the last 7 days
-- This will make your analytics dashboard show realistic data

-- Sample data for android-app-development-fundamentals (popular post)
INSERT INTO view_analytics (slug, viewer_ip, user_agent, referrer, device_type, browser, os, is_unique) VALUES
    ('android-app-development-fundamentals', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://google.com', 'desktop', 'Chrome', 'Windows', true),
    ('android-app-development-fundamentals', '192.168.1.101', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'https://twitter.com', 'mobile', 'Safari', 'iOS', true),
    ('android-app-development-fundamentals', '192.168.1.102', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'https://linkedin.com', 'desktop', 'Safari', 'macOS', true),
    ('android-app-development-fundamentals', '192.168.1.103', 'Mozilla/5.0 (Android 11; Mobile)', 'https://reddit.com', 'mobile', 'Chrome', 'Android', true),
    ('android-app-development-fundamentals', '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://github.com', 'desktop', 'Firefox', 'Windows', true);

-- Sample data for android-mvvm-architecture
INSERT INTO view_analytics (slug, viewer_ip, user_agent, referrer, device_type, browser, os, is_unique) VALUES
    ('android-mvvm-architecture', '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://stackoverflow.com', 'desktop', 'Chrome', 'Windows', true),
    ('android-mvvm-architecture', '192.168.1.106', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'https://medium.com', 'desktop', 'Chrome', 'macOS', true),
    ('android-mvvm-architecture', '192.168.1.107', 'Mozilla/5.0 (Android 12; Mobile)', 'https://youtube.com', 'mobile', 'Chrome', 'Android', true);

-- Sample data for android-performance-optimization
INSERT INTO view_analytics (slug, viewer_ip, user_agent, referrer, device_type, browser, os, is_unique) VALUES
    ('android-performance-optimization', '192.168.1.108', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://google.com', 'desktop', 'Edge', 'Windows', true),
    ('android-performance-optimization', '192.168.1.109', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)', 'https://twitter.com', 'mobile', 'Safari', 'iOS', true),
    ('android-performance-optimization', '192.168.1.110', 'Mozilla/5.0 (Linux x86_64)', 'https://dev.to', 'desktop', 'Firefox', 'Linux', true);

-- Sample data for kotlin-vs-java-android-development
INSERT INTO view_analytics (slug, viewer_ip, user_agent, referrer, device_type, browser, os, is_unique) VALUES
    ('kotlin-vs-java-android-development', '192.168.1.111', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://google.com', 'desktop', 'Chrome', 'Windows', true),
    ('kotlin-vs-java-android-development', '192.168.1.112', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'https://github.com', 'desktop', 'Safari', 'macOS', true);

-- Sample data for android-room-database
INSERT INTO view_analytics (slug, viewer_ip, user_agent, referrer, device_type, browser, os, is_unique) VALUES
    ('android-room-database', '192.168.1.113', 'Mozilla/5.0 (Android 11; Mobile)', 'https://stackoverflow.com', 'mobile', 'Chrome', 'Android', true),
    ('android-room-database', '192.168.1.114', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://medium.com', 'desktop', 'Chrome', 'Windows', true);

-- Update the main views table with realistic counts based on the analytics data
UPDATE views SET count = 5 WHERE slug = 'android-app-development-fundamentals';
UPDATE views SET count = 3 WHERE slug = 'android-mvvm-architecture';
UPDATE views SET count = 3 WHERE slug = 'android-performance-optimization';
UPDATE views SET count = 2 WHERE slug = 'kotlin-vs-java-android-development';
UPDATE views SET count = 2 WHERE slug = 'android-room-database';

-- Verify the data
SELECT 'Views Table:' as table_name;
SELECT slug, count, created_at FROM views ORDER BY count DESC;

SELECT 'View Analytics Table:' as table_name;
SELECT slug, COUNT(*) as total_views, 
       COUNT(CASE WHEN is_unique THEN 1 END) as unique_views,
       COUNT(DISTINCT device_type) as device_types,
       COUNT(DISTINCT browser) as browsers
FROM view_analytics 
GROUP BY slug 
ORDER BY total_views DESC;
