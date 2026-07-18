'use client'

import { Search, Lightbulb, Code2, Rocket, LineChart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Process() {
  const steps = [
    {
      iconName: 'Search',
      title: 'Discovery & Strategy',
      description: 'We analyze your business, competitors, and target audience to build a data-driven roadmap.',
      duration: '1–2 weeks',
      num: '01',
    },
    {
      iconName: 'Lightbulb',
      title: 'Planning & Design',
      description: 'Wireframes, prototypes, and strategic planning aligned with your business goals.',
      duration: '2–3 weeks',
      num: '02',
    },
    {
      iconName: 'Code2',
      title: 'Development',
      description: 'Clean, scalable code built with modern tech stack and engineering best practices.',
      duration: '4–8 weeks',
      num: '03',
    },
    {
      iconName: 'Rocket',
      title: 'Marketing & Launch',
      description: 'Strategic launch with SEO optimization, analytics setup, and initial campaigns.',
      duration: '1–2 weeks',
      num: '04',
    },
    {
      iconName: 'LineChart',
      title: 'Optimization & Growth',
      description: 'Continuous testing, optimization, and scaling based on performance data.',
      duration: 'Ongoing',
      num: '05',
    },
  ]

  const getIcon = (name: string) => {
    const icons = { Search, Lightbulb, Code2, Rocket, LineChart }
    return icons[name as keyof typeof icons]
  }

  return (
    <section
      id="process"
      className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
      style={{ backgroundColor: '#16130e' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,194,119,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#e6c277]" />
            <span className="label-caps" style={{ color: '#e6c277' }}>How We Work</span>
            <div className="w-8 h-[1px] bg-[#e6c277]" />
          </div>

          <h2
            className="font-display font-bold text-[#e9e1d8] leading-tight mb-6"
            style={{ fontSize: '52px', letterSpacing: '-0.02em' }}
          >
            Our Proven Process
          </h2>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
          <p className="text-[#d0c5b4] text-base max-w-2xl mx-auto font-light leading-loose">
            A systematic, engineering-grade approach to delivering exceptional results
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10 items-start">
            {steps.map((step, index) => {
              const Icon = getIcon(step.iconName)
              // Zig-zag: even cards (0,2,4) normal, odd cards (1,3) pushed down
              const isOffset = index % 2 === 1
              return (
                <motion.div
                  key={index}
                  className="relative"
                  style={{ marginTop: isOffset ? '56px' : '0px' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                >
                  {/* Connector line to next card (desktop only) */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-[5.5rem] left-full z-0 pointer-events-none"
                      style={{
                        width: '100%',
                        height: '1px',
                        background: 'linear-gradient(to right, rgba(230,194,119,0.3), rgba(230,194,119,0.1))',
                        transform: isOffset
                          ? 'translateY(28px)'  // line goes up from offset card
                          : 'translateY(-28px)', // line goes down to offset card
                        transformOrigin: 'left center',
                      }}
                    />
                  )}

                  {/* Card — sharp corners, tonal surface */}
                  <div
                    className="group relative p-7 transition-all duration-300"
                    style={{
                      backgroundColor: '#221f1a',
                      border: '1px solid rgba(128,128,128,0.2)',
                      borderRadius: '0px',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'rgba(230,194,119,0.4)'
                      el.style.backgroundColor = '#2d2924'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'rgba(128,128,128,0.2)'
                      el.style.backgroundColor = '#221f1a'
                    }}
                  >
                    {/* Large serif BG number */}
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      <span
                        style={{
                          fontFamily: 'Playfair Display, Georgia, serif',
                          fontSize: '140px',
                          fontWeight: '700',
                          lineHeight: '1',
                          color: 'rgba(230,194,119,0.04)',
                          position: 'absolute',
                          top: '-16px',
                          left: '-8px',
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-xs font-semibold z-20"
                      style={{
                        backgroundColor: '#e6c277',
                        color: '#402d00',
                        fontFamily: 'Inter, system-ui',
                        fontWeight: '700',
                        letterSpacing: '0.02em',
                        borderRadius: '0.25rem',
                        boxShadow: '0 4px 16px rgba(230,194,119,0.3)',
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6 mt-6 relative z-10">
                      <div
                        className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(230,194,119,0.4)]"
                        style={{
                          backgroundColor: 'rgba(230,194,119,0.08)',
                          border: '1px solid rgba(230,194,119,0.15)',
                          borderRadius: '0.25rem',
                        }}
                      >
                        <Icon
                          className="text-[#e6c277] group-hover:scale-110 transition-all duration-300"
                          size={20}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative text-center z-10">
                      <h3
                        className="font-display text-base font-semibold text-[#e9e1d8] mb-3 leading-tight group-hover:text-[#e6c277] transition-colors duration-300"
                      >
                        {step.title}
                      </h3>

                      <p className="text-[#998f80] text-xs leading-relaxed mb-5 font-light">
                        {step.description}
                      </p>

                      {/* Duration tag — cobalt accent */}
                      <div
                        className="inline-block px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase rounded-[9999px]"
                        style={{
                          backgroundColor: 'rgba(46,91,255,0.1)',
                          color: '#bec7dc',
                          border: '1px solid rgba(46,91,255,0.2)',
                        }}
                      >
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

