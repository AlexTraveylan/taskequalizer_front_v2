"use client"

import { Input, InputProps } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"

export const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative">
      <Input {...props} className="pl-10" ref={ref} />
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Search strokeWidth={1.4} size={23} />
      </span>
    </div>
  )
})

InputSearch.displayName = "InputSearch"
