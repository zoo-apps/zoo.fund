import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DAOOnboardingPage } from '@/components/dao-onboarding'

export const metadata = {
  title: 'Open a raise | Zoo Fund',
  description: 'Name the question your DAO exists to answer, and open a raise for it.',
  alternates: { canonical: '/launch' },
}

export default function LaunchPage() {
  return (
    <>
      <Header />
      <main>
        <DAOOnboardingPage />
      </main>
      <Footer />
    </>
  )
}
