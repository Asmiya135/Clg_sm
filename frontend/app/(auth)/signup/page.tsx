"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: connect to backend auth
    console.log("Signup attempt:", formData)
  }

  return (
    <div className="space-y-8">
      {/* Logo/Branding */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light tracking-tight">comiteex</h1>
        <p className="text-sm text-muted-foreground">Join your committees</p>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="h-10 border-border bg-input text-sm"
          required
        />

        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="h-10 border-border bg-input text-sm"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="h-10 border-border bg-input text-sm"
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="h-10 border-border bg-input text-sm"
          required
        />

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground font-medium text-sm rounded">
          Sign up
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent instagram-link">
          Log in
        </Link>
      </p>
    </div>
  )
}
