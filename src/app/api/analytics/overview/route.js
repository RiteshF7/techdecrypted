import { supabase } from "../../../../utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log('Analytics overview API called');
    
    // Get total views across all posts
    console.log('Querying views table...');
    const { data: totalViews, error: totalError } = await supabase
      .from("views")
      .select("count");

    if (totalError) {
      console.error('Error querying views table:', totalError);
      throw totalError;
    }

    console.log('Views data:', totalViews);
    const totalCount = totalViews?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
    console.log('Total count calculated:', totalCount);

    // Get unique visitors today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    console.log('Querying view_analytics table for unique visitors...');
    const { data: uniqueToday, error: uniqueError } = await supabase
      .from("view_analytics")
      .select("viewer_ip")
      .gte("viewed_at", today.toISOString());

    if (uniqueError) {
      console.error('Error querying view_analytics table:', uniqueError);
      throw uniqueError;
    }

    console.log('Unique visitors data:', uniqueToday);
    const uniqueVisitorsToday = new Set(uniqueToday?.map(item => item.viewer_ip) || []).size;
    console.log('Unique visitors count:', uniqueVisitorsToday);

    // Get top performing posts
    console.log('Querying for top posts...');
    const { data: topPosts, error: topError } = await supabase
      .from("views")
      .select("slug, count")
      .order("count", { ascending: false })
      .limit(5);

    if (topError) {
      console.error('Error querying for top posts:', topError);
      throw topError;
    }

    console.log('Top posts data:', topPosts);

    // Get device type distribution
    console.log('Querying for device stats...');
    const { data: deviceStats, error: deviceError } = await supabase
      .from("view_analytics")
      .select("device_type")
      .not("device_type", "is", null);

    if (deviceError) {
      console.error('Error querying device stats:', deviceError);
      throw deviceError;
    }

    console.log('Device stats data:', deviceStats);
    const deviceDistribution = deviceStats?.reduce((acc, item) => {
      const device = item.device_type || 'Unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {}) || {};

    // Get browser distribution
    console.log('Querying for browser stats...');
    const { data: browserStats, error: browserError } = await supabase
      .from("view_analytics")
      .select("browser")
      .not("browser", "is", null);

    if (browserError) {
      console.error('Error querying browser stats:', browserError);
      throw browserError;
    }

    console.log('Browser stats data:', browserStats);
    const browserDistribution = browserStats?.reduce((acc, item) => {
      const browser = item.browser || 'Unknown';
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {}) || {};

    const response = {
      totalViews: totalCount,
      uniqueVisitorsToday,
      topPosts: topPosts || [],
      deviceDistribution,
      browserDistribution,
    };

    console.log('Sending response:', response);
    return NextResponse.json(response);
    
  } catch (error) {
    console.error("Error in analytics overview API:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    
    return NextResponse.json(
      { 
        error: "Error fetching analytics data",
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}
