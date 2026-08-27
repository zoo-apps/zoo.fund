'use client'

import { useState } from 'react'
import type { DAO } from '@/lib/daos'

interface FundingCardProps {
  dao: DAO
}

/**
 * What Zoo does for a DAO, and what it does not.
 *
 * Zoo Labs Foundation lists research DAOs. It takes no fee, holds no
 * contribution, and prepares no transaction — each DAO runs its own raise and
 * keeps its own treasury. That is the whole arrangement, and it is stated here
 * rather than assumed, because a page with a progress bar and a button reads
 * like the place the money goes.
 *
 * This used to take an amount, ask for a wallet, transfer nothing, and then
 * show a thank-you citing the foundation's EIN. A receipt for a contribution
 * that did not happen is worse than no button at all, and on a charity's site
 * it is worse again.
 *
 * The goal is the DAO's own stated target. There is no raised-to-date figure:
 * it would be a dollar amount a reader expects to check against a treasury, and
 * no DAO here publishes an address yet.
 */
export function FundingCard({ dao }: FundingCardProps) {
  const [copied, setCopied] = useState(false)

  const share = `https://zoo.fund/${dao.id}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(share)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="bg-white/3 border border-white/10 rounded-2xl p-8 sticky top-20 animate-scaleIn">
      <div className="mb-6">
        <p className="text-sm text-white/60 mb-1">Target</p>
        <p className="text-3xl font-bold">{dao.goal}</p>
        <p className="text-xs text-white/40 mt-2">
          {dao.name}&rsquo;s own stated target for this work.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-white/70 leading-relaxed">
            {dao.name} runs its own raise and holds its own treasury. Zoo Labs
            Foundation lists it here and takes nothing — no fee, no cut, and no
            contribution passes through this site.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://x.com/intent/post?text=${encodeURIComponent(dao.name + ' — ' + dao.tagline)}&url=${encodeURIComponent(share)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-lg text-sm text-center hover:bg-white/8 transition-all duration-200"
          >
            Share on 𝕏
          </a>
          <button
            onClick={copy}
            className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-lg text-sm hover:bg-white/8 transition-all duration-200"
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  )
}
