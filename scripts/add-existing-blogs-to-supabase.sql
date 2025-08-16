-- =====================================================
-- Add Existing Blogs to Supabase Views Table
-- Run this script in your Supabase SQL Editor
-- =====================================================

-- Insert all existing blog posts with initial view count of 0
INSERT INTO views (slug, count) VALUES 
    ('android-app-development-fundamentals', 0),
    ('android-app-memory-management-one', 0),
    ('android-dependency-injection-hilt', 0),
    ('android-large-heap-true', 0),
    ('android-mvvm-architecture', 0),
    ('android-networking-retrofit', 0),
    ('android-performance-optimization', 0),
    ('android-room-database', 0),
    ('android-security-best-practices', 0),
    ('android-testing-strategies', 0),
    ('best-practices-for-writing-clean-and-maintainable-code', 0),
    ('deligates-in-kotlin', 0),
    ('instagram-memory-management', 0),
    ('jetpack-compose-ui-development', 0),
    ('kotlin-vs-java-android-development', 0)
ON CONFLICT (slug) DO NOTHING;

-- Verify the insertion
SELECT slug, count, created_at FROM views ORDER BY created_at DESC;

-- Count total blogs added
SELECT COUNT(*) as total_blogs FROM views;
