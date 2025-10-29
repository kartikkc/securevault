'use client'

import { useState } from 'react'
import { LoginPage } from '@/components/LoginPage'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const handleLogin = (email: string) => {
    router.push('/dashboard')
  }

  const handleNavigate = (view: 'landing' | 'signup') => {
    if (view === 'landing') {
      router.push('/')
    } else {
      router.push(`/${view}`)
    }
  }

  return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
}