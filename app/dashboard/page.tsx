'use client'

import { useState, useEffect } from 'react'
import { Dashboard } from '@/components/Dashboard'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { getPasswords, type PasswordItem } from '@/lib/api'



interface User {
  name: string
}

interface password {
  website: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [passwords, setPasswords] = useState<PasswordItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user authentication
    const userData = sessionStorage.getItem('auth_token')
    if (userData) {
      const decoded = jwtDecode<{ name: string }>(userData)
      const user1 = { name: decoded.name }
      setUser(user1);
      getPasswords(userData)
        .then((items) => setPasswords(items))
        .catch(() => setPasswords([]))
    } else {
      // Redirect to landing if not authenticated
      router.push('/')
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token')
    setUser(null)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-secondary/10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null // This will be brief as useEffect will redirect
  }

  return <Dashboard user={user} passwords={passwords} onLogout={handleLogout} />
}