import { supabase } from "../../../../utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const days = parseInt(searchParams.get('days') || '7');

  try {
    if (slug) {
      // Get analytics for a specific post
      const { data: postViews, error: postError } = await supabase
        .from("views")
        .select("count")
        .eq("slug", slug)
        .single();

      if (postError) throw postError;

      // Get daily views for the last N days
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data: dailyViews, error: dailyError } = await supabase
        .from("view_analytics")
        .select("viewed_at, is_unique")
        .eq("slug", slug)
        .gte("viewed_at", startDate.toISOString())
        .order("viewed_at", { ascending: true });

      if (dailyError) throw dailyError;

      // Aggregate daily data
      const dailyData = {};
      dailyViews?.forEach(view => {
        const date = new Date(view.viewed_at).toISOString().split('T')[0];
        if (!dailyData[date]) {
          dailyData[date] = { total: 0, unique: 0 };
        }
        dailyData[date].total += 1;
        if (view.is_unique) {
          dailyData[date].unique += 1;
        }
      });

      // Get device and browser stats for this post
      const { data: deviceStats, error: deviceError } = await supabase
        .from("view_analytics")
        .select("device_type, browser, os")
        .eq("slug", slug);

      if (deviceError) throw deviceError;

      const deviceDistribution = deviceStats?.reduce((acc, item) => {
        const device = item.device_type || 'Unknown';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {}) || {};

      const browserDistribution = deviceStats?.reduce((acc, item) => {
        const browser = item.browser || 'Unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      }, {}) || {};

      return NextResponse.json({
        slug,
        totalViews: postViews?.count || 0,
        dailyData,
        deviceDistribution,
        browserDistribution,
      });
    } else {
      // Get analytics for all posts
      const { data: allPosts, error: allError } = await supabase
        .from("views")
        .select("slug, count")
        .order("count", { ascending: false });

      if (allError) throw allError;

      // Get recent activity for each post
      const postsWithRecentActivity = await Promise.all(
        allPosts?.map(async (post) => {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - days);
          
          const { data: recentViews } = await supabase
            .from("view_analytics")
            .select("viewed_at, is_unique")
            .eq("slug", post.slug)
            .gte("viewed_at", startDate.toISOString());

          const recentTotal = recentViews?.length || 0;
          const recentUnique = recentViews?.filter(v => v.is_unique).length || 0;

          return {
            ...post,
            recentViews: recentTotal,
            recentUniqueViews: recentUnique,
          };
        }) || []
      );

      return NextResponse.json({
        posts: postsWithRecentActivity,
      });
    }
  } catch (error) {
    console.error("Error fetching post analytics:", error);
    return NextResponse.json(
      { error: "Error fetching post analytics" },
      { status: 500 }
    );
  }
}
