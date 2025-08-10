"use client";

import { useForm } from "react-hook-form";
import { supabase } from "@/src/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { title, description, body, author, tags, published_at, image } = data;
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      const file = image[0];
      const filePath = `public/${slug}-${file.name}`;

      // Upload image to Supabase Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (imageError) {
        throw imageError;
      }

      const imageUrl = supabase.storage.from("images").getPublicUrl(filePath)
        .data.publicUrl;

      // Insert blog post into Supabase table
      const { data: postData, error: postError } = await supabase
        .from("blogs")
        .insert([
          {
            title,
            description,
            body,
            author,
            tags: tags.split(",").map((tag) => tag.trim()),
            published_at,
            slug,
            image: { src: imageUrl },
          },
        ]);

      if (postError) {
        throw postError;
      }

      alert("Blog post uploaded successfully!");
      router.push(`/blogs/${slug}`);
    } catch (error) {
      console.error("Error uploading blog post:", error);
      alert("Error uploading blog post. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          {...register("title", { required: true })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.title && <span className="text-red-500">Title is required</span>}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="body" className="block font-medium">
          Body (Markdown)
        </label>
        <textarea
          id="body"
          {...register("body", { required: true })}
          rows={10}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.body && <span className="text-red-500">Body is required</span>}
      </div>

      <div>
        <label htmlFor="author" className="block font-medium">
          Author
        </label>
        <input
          id="author"
          {...register("author")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block font-medium">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          {...register("tags")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="published_at" className="block font-medium">
          Published Date
        </label>
        <input
          type="date"
          id="published_at"
          {...register("published_at", { required: true })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.published_at && (
          <span className="text-red-500">Published date is required</span>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block font-medium">
          Cover Image
        </label>
        <input
          type="file"
          id="image"
          {...register("image", { required: true })}
        />
        {errors.image && (
          <span className="text-red-500">Cover image is required</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
