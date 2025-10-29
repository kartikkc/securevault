'use client'

import { SignupPage } from '@/components/SignupPage'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  const handleSignup = (email: string) => {
    router.push('/dashboard')
  }

  const handleNavigate = (view: 'landing' | 'login') => {
    if (view === 'landing') {
      router.push('/')
    } else {
      router.push(`/${view}`)
    }
  }

  return <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />
}