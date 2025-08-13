"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center p-10 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <button
          onClick={() => handleLogin("google")}
          className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded mb-3"
        >
          Login with Google
        </button>
        <button
          onClick={() => handleLogin("github")}
          className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
