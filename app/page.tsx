'use client'

import { LandingPage } from '@/components/LandingPage'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleNavigate = (view: 'login' | 'signup') => {
    router.push(`/${view}`)
  }

  return <LandingPage onNavigate={handleNavigate} />
}