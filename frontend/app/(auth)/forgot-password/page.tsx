"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: connect to backend
    console.log("Password reset requested for:", email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight">comiteex</h1>
          <p className="text-sm text-muted-foreground">Password Reset</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-foreground">Check your email for a link to reset your password.</p>
          <Link href="/login" className="block">
            <Button className="w-full h-10 bg-primary text-primary-foreground font-medium text-sm rounded">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light tracking-tight">comiteex</h1>
        <p className="text-sm text-muted-foreground">Reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-muted-foreground">Enter the email address associated with your account.</p>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 border-border bg-input text-sm"
          required
        />

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground font-medium text-sm rounded">
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm">
        <Link href="/login" className="text-muted-foreground instagram-link">
          Back to login
        </Link>
      </p>
    </div>
  )
}
