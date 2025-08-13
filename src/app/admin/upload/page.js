import UploadForm from "@/src/components/Admin/UploadForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Upload New Blog Post</h1>
      <UploadForm />
    </div>
  );
}
