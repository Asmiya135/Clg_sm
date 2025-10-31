"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: connect to backend auth
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="space-y-8">
      {/* Logo/Branding */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light tracking-tight">comiteex</h1>
        <p className="text-sm text-muted-foreground">College Committee Network</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 border-border bg-input text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 border-border bg-input text-sm"
            required
          />
        </div>

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground font-medium text-sm rounded">
          Log in
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center space-y-4">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-accent instagram-link">
            Sign up
          </Link>
        </p>
        <Link href="/forgot-password" className="block text-xs text-muted-foreground instagram-link">
          Forgot password?
        </Link>
      </div>
    </div>
  )
}
