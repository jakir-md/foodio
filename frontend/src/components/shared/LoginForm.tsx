"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, {
    message: null,
  });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#13322B] focus:ring-1 focus:ring-[#13322B] transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#13322B] focus:ring-1 focus:ring-[#13322B] transition-all"
        />
      </div>

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#13322B] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#1a453b] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
