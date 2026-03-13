"use client";

import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";
import { useState } from "react";

type AuthMode = "signin" | "register";

export default function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-105">
        <div className="bg-[#FCFBF8] border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#13322B] rounded-md rounded-tr-xl flex items-center justify-center text-white font-bold text-[10px]">
                F
              </div>
              <span className="text-xl font-bold text-[#13322B] font-serif tracking-tight">
                Foodio.
              </span>
            </div>
            <p className="text-gray-500 text-sm">Premium flavors, delivered.</p>
          </div>

          <div className="flex bg-[#F3F0E9] rounded-lg p-1 mb-8">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "signin"
                  ? "bg-white text-[#13322B] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "register"
                  ? "bg-white text-[#13322B] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {mode === "signin" ? <LoginForm /> : <RegisterForm />}
        </div>

        {mode === "register" && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>For accessing Admin Panel press A from your keyboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
