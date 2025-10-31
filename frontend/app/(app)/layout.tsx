import type React from "react"
import BottomNav from "@/components/navigation/bottom-nav"
import TopNav from "@/components/navigation/top-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <BottomNav />
      <main className="md:ml-64 mb-20 md:mb-0">{children}</main>
    </div>
  )
}
