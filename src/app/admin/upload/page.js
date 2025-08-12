import UploadForm from "@/src/components/Admin/UploadForm";

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Upload New Blog Post</h1>
      <UploadForm />
    </div>
  );
}
