import { supabase } from "@/src/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { slug } = params;

  try {
    // Fetch the current view count
    const { data: existingViews, error: fetchError } = await supabase
      .from("views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 means no rows found, which is fine
      throw fetchError;
    }

    const newCount = (existingViews?.count || 0) + 1;

    // Upsert the new view count
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

    return NextResponse.json({ count: newCount });
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
