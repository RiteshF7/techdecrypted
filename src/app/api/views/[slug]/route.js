import { supabase } from "../../../../utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { slug } = params;
  const { userAgent, referrer, sessionId, deviceType, browser, os } = await req.json();
  
  // Get client IP (you'll need to handle this based on your deployment)
  const clientIP = req.headers.get('x-forwarded-for') || 
                   req.headers.get('x-real-ip') || 
                   '127.0.0.1';

  try {
    // Check if this is a unique view (same IP, same slug, within 24 hours)
    const { data: existingViews, error: fetchError } = await supabase
      .from("view_analytics")
      .select("id")
      .eq("viewer_ip", clientIP)
      .eq("slug", slug)
      .gte("viewed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1);

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    const isUnique = !existingViews || existingViews.length === 0;

    // Insert analytics record
    const { error: analyticsError } = await supabase
      .from('view_analytics')
      .insert({
        slug: slug,
        viewer_ip: clientIP,
        user_agent: userAgent,
        referrer: referrer,
        session_id: sessionId,
        device_type: deviceType,
        browser: browser,
        os: os,
        is_unique: isUnique,
      });

    if (analyticsError) {
      throw analyticsError;
    }

    // Update the main views count (your existing logic)
    const { data: existingViewCount, error: fetchViewError } = await supabase
      .from("views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (fetchViewError && fetchViewError.code !== "PGRST116") {
      throw fetchViewError;
    }

    const newCount = (existingViewCount?.count || 0) + 1;

    const { error: upsertError } = await supabase.from("views").upsert(
      {
        slug: slug,
        count: newCount,
      },
      { onConflict: "slug" }
    );

    if (upsertError) {
      throw upsertError;
    }

    return NextResponse.json({ 
      count: newCount, 
      isUnique: isUnique 
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      { error: "Error updating view count" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const { data, error } = await supabase
      .from("views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({ count: data?.count || 0 });
  } catch (error) {
    console.error("Error fetching view count:", error);
    return NextResponse.json(
      { error: "Error fetching view count" },
      { status: 500 }
    );
  }
}
