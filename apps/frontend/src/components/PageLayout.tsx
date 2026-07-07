import type { ComponentProps, ReactNode } from 'react'
import { UtilityBar } from './UtilityBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { Breadcrumb } from './Breadcrumb'

// Shared page shell: UtilityBar + Header + optional Breadcrumb + main + Footer.
// `breadcrumbs` is omitted on pages with no breadcrumb (currently just HomePage).
export function PageLayout({
  breadcrumbs,
  headerProps,
  children,
}: {
  breadcrumbs?: Breadcrumb[]
  headerProps?: ComponentProps<typeof Header>
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header {...headerProps} />
      {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
