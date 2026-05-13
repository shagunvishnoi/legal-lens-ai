"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function ReloadRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If user reloads, land them on dashboard
    if (pathname !== "/dashboard" && pathname !== "/") {
      router.push("/dashboard")
    }
  }, [])

  return null
}
