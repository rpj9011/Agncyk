'use client'

import { useState, useEffect, useRef } from 'react'
import { Code2, TrendingUp, Target, Palette, Lightbulb, Search } from 'lucide-react'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      tag: 'Engineering',
      description: 'High-performance platforms engineered for conversion and scale.',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      tag: 'Growth',
      description: 'Strategic campaigns that drive measurable revenue growth.',
    },
    {
      icon: Target,
      title: 'Performance Marketing',
      tag: 'Conversion',
      description: 'Data-driven optimization across every customer touchpoint.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      tag: 'Experience',
      description: 'Interfaces crafted for intuitive user experiences and high retention.',
    },
    {
      icon: Lightbulb,
      title: 'Branding & Strategy',
      tag: 'Identity',
      description: 'Cohesive brand systems built for market differentiation.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      tag: 'Organic',
      description: 'Technical SEO architecture for sustainable organic growth.',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section
        id="services"
        ref={sectionRef}
        className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
        style={{ backgroundColor: '#0F0F0F' }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(230,194,119,0.05) 0%, transparent 70%)' }} />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#e6c277]" />
              <span className="label-caps" style={{ color: '#e6c277' }}>What We Do</span>
              <div className="w-8 h-[1px] bg-[#e6c277]" />
            </div>

            <h2
              className="font-display font-bold text-[#e9e1d8] leading-tight"
              style={{ fontSize: '52px', letterSpacing: '-0.02em' }}
            >
              Strategic Digital Services
              <br />
              <span className="text-[#e6c277] italic">That Drive Growth</span>
            </h2>
            <div className="w-16 h-[1px] mt-10 mx-auto" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
            <p className="text-[#d0c5b4] mt-8 text-base max-w-2xl mx-auto font-light leading-loose">
              Engineered solutions for ambitious brands ready to scale beyond conventional limits.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="relative py-[80px] px-8 sm:px-12 lg:px-16 overflow-hidden"
        style={{ backgroundColor: '#0F0F0F' }}
      >
        {/* Top hairline */}
        <div className="absolute top-0 left-8 right-8 h-[1px]" style={{ backgroundColor: 'rgba(77,70,57,0.5)' }} />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {services.map((service, index) => {
              const Icon = service.icon
              const isHovered = hoveredIdx === index
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative p-10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    border: '1px solid rgba(77,70,57,0.4)',
                    borderColor: isHovered ? 'rgba(230,194,119,0.4)' : 'rgba(77,70,57,0.4)',
                    backgroundColor: isHovered ? 'rgba(34,31,26,0.8)' : 'rgba(22,19,14,0.6)',
                    margin: '-0.5px',
                  }}
                >
                  {/* Category pill tag */}
                  <div
                    className="inline-block px-3 py-1 mb-6 text-[10px] font-semibold tracking-[0.1em] uppercase rounded-[9999px]"
                    style={{
                      backgroundColor: isHovered ? 'rgba(230,194,119,0.12)' : 'rgba(77,70,57,0.4)',
                      color: isHovered ? '#e6c277' : '#998f80',
                      border: `1px solid ${isHovered ? 'rgba(230,194,119,0.3)' : 'rgba(77,70,57,0.6)'}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {service.tag}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <Icon
                      className="transition-colors duration-300"
                      style={{ color: isHovered ? '#e6c277' : 'rgba(230,194,119,0.5)', width: 32, height: 32 }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-2xl font-semibold mb-4 leading-tight transition-colors duration-300"
                    style={{ color: isHovered ? '#e6c277' : '#e9e1d8' }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#998f80] text-sm leading-loose font-light">
                    {service.description}
                  </p>

                  {/* Expanding gold line */}
                  <div
                    className="mt-8 h-[1px] transition-all duration-700"
                    style={{
                      width: isHovered ? '3rem' : '0px',
                      backgroundColor: '#e6c277',
                    }}
                  />

                  {/* Cobalt hover accent dot */}
                  <div
                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? '#2E5BFF' : 'transparent',
                      boxShadow: isHovered ? '0 0 8px rgba(46,91,255,0.6)' : 'none',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
        style={{ backgroundColor: '#100e09' }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-[800px] mx-auto text-center">
          <div
            className="p-16"
            style={{
              backgroundColor: 'rgba(34,31,26,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(230,194,119,0.15)',
              borderRadius: '0px',
            }}
          >
            <h3
              className="font-display font-bold text-[#e9e1d8] leading-tight mb-4"
              style={{ fontSize: '40px', letterSpacing: '-0.02em' }}
            >
              Let&apos;s Build Something
              <br />
              <span className="text-[#e6c277] italic">That Converts</span>
            </h3>
            <div className="w-12 h-[1px] mx-auto mt-8 mb-10" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-4 px-12 py-5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 group rounded-[0.25rem]"
              style={{ backgroundColor: '#e6c277', color: '#402d00' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#c6a45c'
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(230,194,119,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#e6c277'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Your Project
              <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
