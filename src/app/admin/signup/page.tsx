"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom/customButton";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="fixed left-0 top-0 w-2 h-full bg-blue-900"></div>
      <div className="fixed right-0 top-0 w-2 h-full bg-blue-900"></div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">r</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Join Rhyzly Admin
        </h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="oluwaseunobioma@mail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Create Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <CustomButton
            type="submit"
            variant="auth"
            fullWidth
            height="48px"
            fontSize="16px"
          >
            Sign Up
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
