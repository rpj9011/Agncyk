'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const metrics = [
    { value: '6+', label: 'Projects Delivered', color: 'gold' },
    { value: '98%', label: 'Client Retention', color: 'gold' },
    { value: '3.5x', label: 'Average Growth', color: 'success' },
  ]

  return (
    <section
      className="relative min-h-screen hero-mobile flex items-center px-8 sm:px-12 lg:px-16 overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,194,119,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(46,91,255,0.04) 0%, transparent 70%)' }} />

      {/* Top hairline */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(230,194,119,0.3)] to-transparent" />

      <div className="max-w-[1200px] mx-auto w-full py-32">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Typography */}
          <div className={`space-y-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-8">
              {/* Label tag */}
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#e6c277]" />
                <span className="label-caps" style={{ color: '#e6c277' }}>Precision Growth Engine</span>
              </div>

              <h1
                className="font-display font-bold text-[#e9e1d8] leading-[1.1]"
                style={{ fontSize: '64px', letterSpacing: '-0.02em' }}
              >
                Engineering Growth
                <br />
                <span className="block mt-3">for Ambitious</span>
                <br />
                <span className="text-[#e6c277] italic">Brands</span>
              </h1>

              <div className="w-16 h-[1px] bg-[rgba(230,194,119,0.6)]" />

              <p className="text-[#d0c5b4] leading-loose max-w-md font-light text-lg">
                Strategic systems built for scale. Conversion-first architecture for measurable revenue growth.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 text-[#402d00] px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-[0.25rem] transition-all duration-300 group"
                style={{ backgroundColor: '#e6c277', boxShadow: '0 2px 12px rgba(230,194,119,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(230,194,119,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(230,194,119,0.25)')}
              >
                Begin the Conversation
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-[#d0c5b4] px-10 py-4 border border-[rgba(198,199,194,0.25)] hover:border-[rgba(46,91,255,0.6)] hover:bg-[rgba(46,91,255,0.08)] hover:text-[#e9e1d8] transition-all duration-300 text-[11px] font-light tracking-[0.1em] uppercase rounded-[0.25rem]"
              >
                View Selected Work
              </a>
            </div>

            {/* Metric Blocks with hairline dividers */}
            <div className="mt-16 pt-12 border-t border-[rgba(77,70,57,0.6)]">
              <div className="flex items-stretch gap-0">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-stretch">
                    {idx > 0 && <div className="hairline mx-8" />}
                    <div>
                      <div
                        className="metric-num"
                        style={{ color: metric.color === 'success' ? '#00E676' : '#e6c277' }}
                      >
                        {metric.value}
                      </div>
                      <div className="label-caps mt-2">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editorial Image */}
          <div className={`relative ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="relative flex justify-center lg:justify-end">
              {/* Depth card */}
              <div
                className="absolute -top-8 -right-8 w-[380px] h-[480px] lg:w-[420px] lg:h-[540px] pointer-events-none"
                style={{ backgroundColor: 'rgba(230,194,119,0.04)', backdropFilter: 'blur(4px)' }}
              />

              {/* Main Image Container — sharp corners */}
              <div
                className="relative w-[400px] h-[500px] lg:w-[460px] lg:h-[580px] overflow-hidden"
                style={{ border: '1px solid rgba(230,194,119,0.2)', borderRadius: '0px', backgroundColor: '#1e1b16' }}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <img
                    src="/Hero_image.jpg"
                    alt="Digital Excellence"
                    className="w-full h-full object-cover opacity-90"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15,15,15,0.3)' }} />

                  {/* Film grain */}
                  <div
                    className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Cobalt accent corner tag */}
                  <div
                    className="absolute top-6 left-6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase rounded-[9999px]"
                    style={{ backgroundColor: 'rgba(46,91,255,0.15)', color: '#bec7dc', border: '1px solid rgba(46,91,255,0.3)' }}
                  >
                    Conversion-First
                  </div>
                </div>

                {/* Bottom badge */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-8 py-6"
                  style={{
                    backgroundColor: 'rgba(15,15,15,0.95)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(230,194,119,0.2)',
                  }}
                >
                  <div className="label-caps mb-2">Engineering Focus</div>
                  <div className="font-display font-light text-2xl text-[#e6c277]">Conversion-First Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
