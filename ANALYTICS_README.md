# Analytics System for TechDecrypted Blog

This analytics system provides comprehensive tracking and insights for your blog posts, including view counts, unique visitors, device analytics, and more.

## 🚀 Features

- **Real-time View Counting**: Track total and unique views for each blog post
- **Device Analytics**: Monitor device types, browsers, and operating systems
- **Visitor Insights**: Track unique visitors, referrers, and session data
- **Time-based Analytics**: View daily, weekly, and monthly trends
- **Performance Metrics**: Identify top-performing posts and content
- **Admin Dashboard**: Beautiful charts and visualizations for data analysis

## 🗄️ Database Structure

### Tables Created

1. **`views`** - Main view count table
   - `slug`: Blog post identifier
   - `count`: Total view count
   - `created_at`, `updated_at`: Timestamps

2. **`view_analytics`** - Detailed analytics data
   - `slug`: Blog post identifier
   - `viewer_ip`: Visitor's IP address
   - `user_agent`: Browser/device information
   - `referrer`: Where visitor came from
   - `device_type`: Mobile, desktop, tablet
   - `browser`: Browser name and version
   - `os`: Operating system
   - `is_unique`: Whether this is a unique view
   - `session_id`: Unique session identifier

3. **`daily_views`** - Aggregated daily statistics
   - `slug`: Blog post identifier
   - `date`: Date of views
   - `total_views`: Total views for that day
   - `unique_views`: Unique views for that day

## 🛠️ Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-setup.sql`
4. Run the script to create all tables, functions, and triggers

### 2. Environment Variables

Ensure these environment variables are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install Dependencies

```bash
npm install recharts
```

## 📊 How It Works

### View Tracking

1. **Automatic Detection**: The system automatically detects:
   - Device type (mobile, tablet, desktop)
   - Browser (Chrome, Firefox, Safari, Edge, Opera)
   - Operating system (Windows, macOS, Linux, Android, iOS)
   - Referrer information
   - Session tracking

2. **Unique View Logic**: A view is considered unique if:
   - Same IP address hasn't viewed the same post within 24 hours
   - This prevents spam and provides accurate unique visitor counts

3. **Real-time Updates**: View counts update immediately when someone visits a blog post

### Analytics Collection

- **Page Load**: When someone visits a blog post, analytics data is automatically collected
- **Data Processing**: The system processes and stores:
  - View count increment
  - Device and browser information
  - Geographic data (if available)
  - Session tracking
- **Aggregation**: Daily statistics are automatically calculated and stored

## 🎯 Admin Dashboard

### Access

Navigate to `/admin/analytics` to view the analytics dashboard.

### Dashboard Features

1. **Overview Cards**
   - Total views across all posts
   - Unique visitors today
   - Total number of blog posts

2. **Top Performing Posts**
   - Ranked list of most popular content
   - View counts for each post

3. **Device Distribution**
   - Pie chart showing device type breakdown
   - Mobile vs. desktop vs. tablet usage

4. **Posts Analytics Table**
   - Comprehensive view of all posts
   - Recent activity (7, 30, or 90 days)
   - Total vs. unique view comparisons

5. **Individual Post Analytics**
   - Detailed charts for specific posts
   - Daily view trends
   - Device and browser breakdowns

## 🔧 API Endpoints

### View Counter
- `POST /api/views/[slug]` - Increment view count and collect analytics
- `GET /api/views/[slug]` - Get current view count

### Analytics
- `GET /api/analytics/overview` - Get overview statistics
- `GET /api/analytics/posts` - Get posts analytics (with optional slug filter)

## 📱 Frontend Integration

### ViewCounter Component

The `ViewCounter` component automatically:
- Tracks page views
- Collects device and browser information
- Sends analytics data to the API
- Displays current view count

### Usage

```jsx
import ViewCounter from '@/components/Blog/ViewCounter';

<ViewCounter slug="your-blog-post-slug" className="text-sm text-gray-600" />
```

## 📈 Data Insights

### What You Can Track

1. **Content Performance**
   - Which posts are most popular
   - View trends over time
   - Engagement patterns

2. **Audience Insights**
   - Device preferences
   - Browser usage
   - Geographic distribution (if enabled)

3. **Traffic Sources**
   - Referrer information
   - Direct vs. external traffic
   - Search engine traffic

4. **User Behavior**
   - Session patterns
   - Return visitor rates
   - Content consumption patterns

## 🚨 Important Notes

### Privacy & GDPR

- IP addresses are stored for unique visitor detection
- Consider implementing IP anonymization for GDPR compliance
- Session data is stored in browser sessionStorage

### Performance

- Analytics data is collected asynchronously
- View counts update in real-time
- Daily aggregations happen automatically via database triggers

### Security

- Row Level Security (RLS) is enabled
- Anonymous users can only insert/read analytics data
- No sensitive user information is collected

## 🔍 Troubleshooting

### Common Issues

1. **Views not incrementing**
   - Check Supabase connection
   - Verify environment variables
   - Check browser console for errors

2. **Analytics dashboard not loading**
   - Ensure all database tables exist
   - Check API endpoint responses
   - Verify recharts library is installed

3. **Database errors**
   - Run verification queries from the SQL script
   - Check Supabase logs
   - Ensure RLS policies are correctly set

### Debug Queries

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('views', 'view_analytics', 'daily_views');

-- Check recent analytics data
SELECT * FROM view_analytics ORDER BY viewed_at DESC LIMIT 10;

-- Check view counts
SELECT * FROM views ORDER BY count DESC;
```

## 🚀 Future Enhancements

Potential improvements to consider:
- Geographic IP location detection
- A/B testing analytics
- Content performance scoring
- Email analytics integration
- Social media traffic tracking
- Export functionality for reports

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your Supabase setup
3. Check browser console for JavaScript errors
4. Review the database setup script

---

**Happy Analytics! 📊✨**
