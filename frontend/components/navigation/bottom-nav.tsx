"use client"

import { Home, Search, Video, Calendar, Bell, User, MessageCircle, SquarePlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Video, label: "Reels", href: "/reels" },
    { icon: MessageCircle, label: "Messages", href: "/messages" },
    { icon: SquarePlus, label: "Create", href: "/create" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: User, label: "Profile", href: "/profile" },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:w-64 md:h-screen md:border-r md:border-border md:flex md:flex-col md:p-4 md:bg-card">
        <div className="mb-8">
          <h1 className="text-2xl font-light tracking-tight">comiteex</h1>
        </div>

        <nav className="flex-1 space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded text-base instagram-link ${
                    isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex justify-center">
              <div className={`p-3 instagram-link ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                <item.icon className="w-6 h-6" />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
