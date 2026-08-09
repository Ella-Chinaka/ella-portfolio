import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Portfolio | Frontend Developer', template: '%s | Portfolio' },
  description: 'A frontend developer portfolio featuring QueueWise and Meal Planner.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="flex min-h-screen flex-col"><SiteHeader /><div className="flex-1">{children}</div><SiteFooter /></body></html>
}
