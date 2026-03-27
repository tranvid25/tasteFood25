"use client";
import * as React from "react";
import { ModeToggle } from "@/src/app/components/mode-toggle";
import { RegisterForm } from "./register-form";

import { LanguageSwitcher } from "@/src/app/components/language-switcher";

export default function RegisterPage() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop')",
      }}
    >
      {/* Dynamic Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-orange-900/40 backdrop-blur-sm z-0"></div>

      {/* Floating fast food elements in background (optional CSS animations could be added here) */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12 animate-pulse pointer-events-none">
        🍕
      </div>
      <div className="absolute bottom-20 right-20 text-7xl opacity-20 -rotate-12 animate-bounce pointer-events-none">
        🍦
      </div>
      <div className="absolute top-5 right-5 z-20 flex gap-4 items-center">
        <ModeToggle />
        <LanguageSwitcher />
      </div>
      
      {/* The Extracted Register Form Component */}
      <RegisterForm />
    </div>
  );
}

