import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Private Equity On Chain — ZOO',
  description:
    'A compliant path to tokenize and distribute GPU-backed AI infrastructure. $113 trillion total addressable private markets opportunity, brought on chain by ZOO.',
}

// ---------------------------------------------------------------------------
// Why-Now bullets (Frame 17)
// ---------------------------------------------------------------------------
const whyNow = [
  {
    icon: ChartUpIcon,
    title: 'AI infrastructure demand is exploding',
    body: 'Compute is the new oil of the digital economy.',
  },
  {
    icon: BankIcon,
    title: 'Private valuations are reaching public-market scale',
    body: 'Top private AI companies are already worth hundreds of billions to trillions.',
  },
  {
    icon: ShieldIcon,
    title: 'Tokenization rails are finally mature',
    body: 'Regulation, compliance, and infrastructure are aligning for mainstream access.',
  },
]

// ---------------------------------------------------------------------------
// Private AI at Public Scale grid (Frame 18)
// ---------------------------------------------------------------------------
const marketCells = [
  { value: '$1.75T', label: 'Hedge Funds', gradient: 'from-amber-300 via-yellow-200 to-amber-100' },
  { value: '$852B', label: 'Venture Capital', gradient: 'from-orange-400 via-pink-400 to-fuchsia-400' },
  { value: '$1.2T', label: 'Private Credit', gradient: 'from-lime-300 via-emerald-300 to-cyan-300' },
  { value: '$134B', label: 'Real Estate', gradient: 'from-emerald-200 via-teal-200 to-cyan-200' },
  { value: '$159B', label: 'Infrastructure', gradient: 'from-fuchsia-400 via-pink-400 to-rose-400' },
  { value: '$5.38T', label: 'NVIDIA', sub: '(publicly traded)', gradient: 'from-zinc-800 via-zinc-900 to-black', dark: true },
]

// ---------------------------------------------------------------------------
// AI-native private companies (Frame 21)
// ---------------------------------------------------------------------------
const companies = [
  { name: 'SpaceX', valuation: '1.75 Trillion' },
  { name: 'OpenAI', valuation: '852 Billion' },
  { name: 'Anthropic', valuation: '1.2 Trillion' },
  { name: 'Databricks', valuation: '134 Billion' },
  { name: 'Stripe', valuation: '159 Billion' },
]

// ===========================================================================
// Page
// ===========================================================================
export default function PrivateEquityOnChain() {
  return (
    <>
      <Header />

      <main className="bg-white text-zinc-900">
        {/* ============================================================
          HERO  (Frame 22)
          Mobile-first: text scales from 4xl on small phones to 9xl on
          large desktops. Padding is fluid via clamp-like jumps.
        ============================================================ */}
        <section className="relative px-5 sm:px-8 md:px-12 lg:px-20 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl">
            {/* Gradient pill subhead (Frame 23) */}
            <div className="mb-8 sm:mb-12">
              <span className="inline-block rounded-md bg-gradient-to-r from-amber-200 via-fuchsia-300 to-cyan-200 px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-sm sm:px-6 sm:py-3 sm:text-sm md:text-base">
                Private Equity on Chain
              </span>
            </div>

            <h1 className="font-black leading-[0.95] tracking-tight text-zinc-900 text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
              Imagine bringing{' '}
              <span className="whitespace-nowrap">$113</span>{' '}
              <span className="whitespace-nowrap">Trillion Dollars</span>{' '}
              on chain<span className="text-zinc-400">…</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base text-zinc-600 sm:mt-8 sm:text-lg md:text-xl">
              A compliant path to tokenize and distribute GPU-backed AI infrastructure
              on chain.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="#why-now"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 sm:text-base"
              >
                Why now
              </Link>
              <Link
                href="/launch"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900 sm:text-base"
              >
                Read the pitch
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
          WHY NOW  (Frame 17)
          Mobile: stacked rows. Desktop: rows with icon column.
        ============================================================ */}
        <section
          id="why-now"
          className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 border-t border-zinc-200"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-sm">
              Why now
            </h2>

            <ul className="mt-8 divide-y divide-zinc-200 border-t border-b border-zinc-200 sm:mt-12">
              {whyNow.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="grid grid-cols-[56px_1fr] gap-4 py-6 sm:grid-cols-[96px_1fr] sm:gap-8 sm:py-10"
                >
                  <div className="flex items-start justify-center pt-1">
                    <Icon className="h-10 w-10 text-zinc-900 sm:h-14 sm:w-14" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase tracking-tight text-zinc-900 sm:text-xl md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 sm:mt-2 sm:text-base md:text-lg">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================
          PRIVATE AI AT PUBLIC SCALE  (Frame 18)
          Mobile: 1 col. sm: 2 col. md+: 3 col grid of gradient cards.
        ============================================================ */}
        <section className="bg-black text-white px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-sm md:text-base">
              Private AI at Public Scale
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {marketCells.map((cell) => (
                <div
                  key={cell.label}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cell.gradient} aspect-[4/3] p-6 sm:p-8 md:p-10`}
                >
                  <div className={`flex h-full flex-col justify-between ${cell.dark ? 'text-white' : 'text-zinc-900'}`}>
                    <div className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                      {cell.value}
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wide sm:text-base">
                        {cell.label}
                      </div>
                      {cell.sub && (
                        <div className="mt-0.5 text-[10px] opacity-70 sm:text-xs">
                          {cell.sub}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
          AI-NATIVE PRIVATE COMPANIES  (Frame 21)
          Horizontal rows; gradient background swatch per row.
          Mobile: name + valuation stacked. Desktop: 3-col grid row.
        ============================================================ */}
        <section className="bg-gradient-to-b from-amber-50 via-pink-50 to-cyan-50 px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-base font-bold uppercase tracking-wider text-zinc-900 sm:text-lg md:text-xl">
              AI-native private companies are already
              <br className="hidden sm:inline" />{' '}
              valued like public mega-caps.
            </h2>

            <ul className="mt-10 divide-y divide-zinc-300/60 sm:mt-14">
              {companies.map(({ name, valuation }, i) => (
                <li
                  key={name}
                  className={`grid grid-cols-[1fr_auto] items-center gap-4 px-2 py-5 sm:grid-cols-[1fr_1fr_auto] sm:gap-8 sm:py-7 ${companyRowBg(i)}`}
                >
                  {/* Portrait placeholder — colored circle with initials. Replace with
                      real assets when licensing is sorted. */}
                  <div className="hidden sm:flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm md:h-14 md:w-14 md:text-base ${companyAvatarBg(i)}`}
                      aria-hidden="true"
                    >
                      {initials(name)}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl md:text-3xl">
                    {name}
                  </div>
                  <div className="text-right text-base font-medium text-zinc-700 sm:text-lg md:text-xl">
                    {valuation}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================
          TOTAL ADDRESSABLE MARKET  (Frame 19)
          Mobile: stacked. md+: 2-col split.
        ============================================================ */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 border-t border-zinc-200">
          <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <p className="text-lg leading-relaxed text-zinc-900 sm:text-xl md:text-2xl">
                ZOO brings a compliant path to tokenize and distribute GPU-backed AI
                infrastructure on chain.
              </p>

              <blockquote className="mt-8 border-l-2 border-zinc-300 pl-5 text-sm italic text-zinc-600 sm:mt-12 sm:text-base">
                “While smaller, private equity has historically generated higher long-term
                net returns, often outpacing the S&amp;P 500 over 10- and 20-year periods.”
                <footer className="mt-2 not-italic text-xs text-zinc-500">— Start Engine</footer>
              </blockquote>
            </div>

            <div className="border-t border-zinc-200 pt-8 md:border-l md:border-t-0 md:pt-0 md:pl-12">
              <div className="text-6xl font-black tracking-tight text-zinc-900 sm:text-7xl md:text-8xl">
                $113T
              </div>
              <div className="mt-4 text-sm font-bold uppercase tracking-wider text-zinc-900 sm:text-base">
                Total Addressable
              </div>
              <p className="mt-4 max-w-sm text-sm text-zinc-600 sm:text-base">
                The private markets opportunity we can bring on chain.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
          CLOSING HEADLINE  (Frame 20)
          Mobile-first giant text that scales up.
        ============================================================ */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-20 py-20 sm:py-32 md:py-40 border-t border-zinc-200">
          <div className="mx-auto max-w-6xl">
            <p className="font-black leading-[0.95] tracking-tight text-zinc-900 text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
              This will be the{' '}
              <span className="underline decoration-zinc-900 decoration-[3px] underline-offset-[10px] sm:decoration-4 sm:underline-offset-[14px] md:decoration-[6px] md:underline-offset-[20px]">
                largest redistribution
              </span>{' '}
              <span className="underline decoration-zinc-900 decoration-[3px] underline-offset-[10px] sm:decoration-4 sm:underline-offset-[14px] md:decoration-[6px] md:underline-offset-[20px]">
                of wealth the
              </span>{' '}
              <span className="underline decoration-zinc-900 decoration-[3px] underline-offset-[10px] sm:decoration-4 sm:underline-offset-[14px] md:decoration-[6px] md:underline-offset-[20px]">
                world has ever seen.
              </span>
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:gap-4">
              <Link
                href="/launch"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-7 py-3 text-base font-semibold text-white transition hover:bg-zinc-700 sm:px-8 sm:py-4 sm:text-lg"
              >
                Join the launch
              </Link>
              <Link
                href="/zoolabs"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-7 py-3 text-base font-semibold text-zinc-900 transition hover:border-zinc-900 sm:px-8 sm:py-4 sm:text-lg"
              >
                About ZOO Labs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// ===========================================================================
// Helpers
// ===========================================================================
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

function companyAvatarBg(i: number): string {
  const palette = [
    'bg-zinc-900',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-rose-600',
    'bg-indigo-600',
  ]
  return palette[i % palette.length]
}

function companyRowBg(i: number): string {
  // Soft gradient stripe per row, alternating subtly.
  const palette = [
    'bg-gradient-to-r from-amber-100/60 to-transparent',
    'bg-gradient-to-r from-fuchsia-100/60 to-transparent',
    'bg-gradient-to-r from-cyan-100/60 to-transparent',
    'bg-gradient-to-r from-emerald-100/60 to-transparent',
    'bg-gradient-to-r from-rose-100/60 to-transparent',
  ]
  return palette[i % palette.length]
}

// ===========================================================================
// Icons (inline SVG, no external deps)
// ===========================================================================
type IconProps = { className?: string }

function ChartUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 56h48" />
      <rect x="12" y="40" width="8" height="16" fill="currentColor" />
      <rect x="24" y="32" width="8" height="24" fill="currentColor" />
      <rect x="36" y="20" width="8" height="36" fill="currentColor" />
      <path d="M48 14l8-6m0 0v8m0-8h-8" />
    </svg>
  )
}

function BankIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 24l26-14 26 14" />
      <path d="M10 24v22" />
      <path d="M22 24v22" />
      <path d="M34 24v22" />
      <path d="M46 24v22" />
      <path d="M54 24v22" />
      <path d="M4 50h56" />
      <path d="M2 54h60" />
    </svg>
  )
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M32 6l22 8v16c0 14-10 24-22 28-12-4-22-14-22-28V14l22-8z" />
      <path d="M22 32l8 8 14-16" />
    </svg>
  )
}
