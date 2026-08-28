'use client'

import { useState } from 'react'

interface DAOOnboardingFormData {
  name: string
  symbol: string
  tagline: string
  description: string
  mission: string
  focusArea: string
  fundingGoal: string
  multisig: string
  partners: string
  website: string
  twitter: string
  discord: string
  contactEmail: string
}

export function DAOOnboardingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<DAOOnboardingFormData>({
    name: '',
    symbol: '',
    tagline: '',
    description: '',
    mission: '',
    focusArea: 'marine',
    fundingGoal: '',
    multisig: '',
    partners: '',
    website: '',
    twitter: '',
    discord: '',
    contactEmail: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const focusAreas = [
    { value: 'marine', label: '🌊 Marine Conservation', icon: '🧬' },
    { value: 'terrestrial', label: '🌲 Terrestrial Wildlife', icon: '🐅' },
    { value: 'arctic', label: '❄️ Arctic Ecosystems', icon: '🐋' },
    { value: 'research', label: '🔬 Conservation Research', icon: '🧪' },
    { value: 'technology', label: '💻 Conservation Tech', icon: '🤖' },
    { value: 'other', label: '🌍 Other', icon: '🦁' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Opens the sender's mail client with the answers filled in. Plain, and it
  // arrives — which the previous version did not: it logged to the console,
  // waited two seconds to look like a network call, and then said a team would
  // reply within days. Nothing was sent and nobody was going to reply.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const body = [
      `DAO: ${formData.name}`,
      `Question it exists to answer: ${formData.mission}`,
      `Target: ${formData.fundingGoal}`,
      `Treasury: ${formData.multisig || 'not set up yet'}`,
      `Contact: ${formData.contactEmail}`,
      '',
      formData.description,
    ].join('\n')

    window.location.href =
      `mailto:contact@zoo.ngo?subject=${encodeURIComponent('Listing: ' + formData.name)}` +
      `&body=${encodeURIComponent(body)}`

    setSubmitted(true)
    setSubmitting(false)
  }


  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Your mail client should be open</h3>
        <p className="text-white/80 mb-6">
          Send the message and <strong>{formData.name}</strong> reaches us. If nothing
          opened, write to{' '}
          <a href="mailto:contact@zoo.ngo" className="text-[#667eea] hover:underline">
            contact@zoo.ngo
          </a>{' '}
          directly.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-6">
          <p className="text-sm text-white/60 leading-relaxed">
            We read it, and if it fits we publish a page for the DAO here. From
            there the DAO deploys its own contracts, holds its own treasury and
            runs its own raise — Zoo Labs Foundation lists it and takes nothing.
            No fee, no cut, and no contribution passes through this site.
          </p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setFormData({
            name: '',
            symbol: '',
            tagline: '',
            description: '',
            mission: '',
            focusArea: 'marine',
            fundingGoal: '',
            multisig: '',
            partners: '',
            website: '',
            twitter: '',
            discord: '',
            contactEmail: ''
          }) }}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  const totalSteps = 3

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white/70">Step {step} of {totalSteps}</span>
          <span className="text-sm text-white/50">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Basic Information</h3>
              <p className="text-white/60 text-sm">Tell us about your conservation DAO</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">DAO Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., CoralDAO, ElephantDAO"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label htmlFor="symbol" className="block text-sm font-medium mb-2">Token Symbol *</label>
              <input
                id="symbol"
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                placeholder="e.g., CORAL, ELEPHANT"
                maxLength={10}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] uppercase"
              />
            </div>

            <div>
              <label htmlFor="tagline" className="block text-sm font-medium mb-2">Tagline *</label>
              <input
                id="tagline"
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                required
                placeholder="One sentence describing your mission"
                maxLength={100}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label htmlFor="focusArea" className="block text-sm font-medium mb-2">Focus Area *</label>
              <select
                id="focusArea"
                name="focusArea"
                value={formData.focusArea}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              >
                {focusAreas.map(area => (
                  <option key={area.value} value={area.value} className="bg-black">
                    {area.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fundingGoal" className="block text-sm font-medium mb-2">Funding Goal (USD) *</label>
              <input
                id="fundingGoal"
                type="text"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
                placeholder="e.g., $250,000"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Mission & Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Mission & Details</h3>
              <p className="text-white/60 text-sm">Share your vision and strategy</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your conservation focus, approach, and what makes your DAO unique"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>

            <div>
              <label htmlFor="mission" className="block text-sm font-medium mb-2">Mission Statement *</label>
              <textarea
                id="mission"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                required
                rows={3}
                placeholder="What is your DAO's core mission?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>

            <div>
              <label htmlFor="partners" className="block text-sm font-medium mb-2">Partner Organizations</label>
              <textarea
                id="partners"
                name="partners"
                value={formData.partners}
                onChange={handleChange}
                rows={2}
                placeholder="List any partner organizations, research institutions, or field operators"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Technical & Contact */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Technical & Contact</h3>
              <p className="text-white/60 text-sm">Setup and communication details</p>
            </div>

            <div>
              <label htmlFor="multisig" className="block text-sm font-medium mb-2">Multisig Address *</label>
              <input
                id="multisig"
                type="text"
                name="multisig"
                value={formData.multisig}
                onChange={handleChange}
                required
                placeholder="0x... or zoo.eth"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea] font-mono text-sm"
              />
              <p className="text-xs text-white/40 mt-1">Your DAO's treasury wallet address</p>
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">Contact Email *</label>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">Website</label>
              <input
                id="website"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium mb-2">Twitter Handle</label>
                <input
                id="twitter"
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@yourdao"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
                />
              </div>

              <div>
                <label htmlFor="discord" className="block text-sm font-medium mb-2">Discord Invite</label>
                <input
                id="discord"
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="discord.gg/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#667eea]"
                />
              </div>
            </div>

            <div className="bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg p-4">
              <p className="text-sm text-white/80">
                <strong className="text-white">Note:</strong> After submission, the Zoo community will vote on your DAO proposal. Approved DAOs receive:
              </p>
              <ul className="text-sm text-white/70 mt-2 space-y-1 ml-4">
                <li>• Dedicated DAO page on Zoo Fund</li>
                <li>• Smart contract deployment support</li>
                <li>• Marketing and community promotion</li>
                <li>• Integration with Zoo Foundation infrastructure</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export function DAOOnboardingPage() {
  return (
    <div className="py-20">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#667eea]/10 border border-[#667eea]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#667eea] rounded-full animate-pulse"></span>
            <span className="text-sm text-[#667eea] font-semibold">Self-Service Onboarding</span>
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Launch Your Conservation DAO</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Join the decentralized conservation movement. Launch a specialized DAO, raise funds transparently, and coordinate conservation efforts globally.
          </p>
          <div className="flex items-center justify-center gap-12 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Fast approval process</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure multisig treasury</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Global community support</span>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <DAOOnboardingForm />

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What does Zoo take?',
                a: 'Nothing. No platform fee, no percentage of a raise, no cut of a treasury. Zoo Labs Foundation lists research DAOs because that is what a research foundation is for, and a fee taken out of money raised would make it something else.'
              },
              {
                q: 'Who runs the raise?',
                a: 'The DAO does. It deploys its own contracts, holds its own treasury and raises on its own terms. Nothing passes through this site and Zoo never holds a contribution.'
              },
              {
                q: 'What do you need from me?',
                a: 'One question worth answering, who is going to answer it, and where the money will be held. Research targets, not roadmaps.'
              },
              {
                q: 'How long does it take?',
                a: 'We read every submission and reply. We do not publish a turnaround time we would have to keep, and there is no committee vote to wait on.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white/3 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                <p className="text-white/70 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
