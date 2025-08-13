import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import { createClient } from "@/src/utils/supabase/server";

export default async function Home() {
  const supabase = createClient()
  const { data: blogs } = await supabase.from("blogs").select("*");
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
}
