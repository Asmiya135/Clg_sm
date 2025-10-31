"use client"

import { useState } from "react"

interface Tab {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  onTabChange: (value: string) => void
}

export default function Tabs({ tabs, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onTabChange(value)
  }

  return (
    <div className="border-b border-border flex overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`px-4 md:px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === tab.value
              ? "text-foreground border-foreground"
              : "text-muted-foreground border-transparent instagram-link"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
