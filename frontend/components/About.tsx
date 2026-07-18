'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const metrics = [
    { value: '6+', label: 'Projects Delivered', color: '#e6c277' },
    { value: '98%', label: 'Client Retention', color: '#e6c277' },
    { value: '3.5x', label: 'Average Growth', color: '#00E676' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle, #e6c277 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,194,119,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#e6c277]" />
              <span className="label-caps" style={{ color: '#e6c277' }}>Our Philosophy</span>
              <div className="w-8 h-[1px] bg-[#e6c277]" />
            </div>

            <h2
              className="font-display font-bold text-[#e9e1d8] leading-tight mb-10"
              style={{ fontSize: '52px', letterSpacing: '-0.02em' }}
            >
              Most agencies promise results.
              <br />
              <span className="text-[#e6c277] italic">We engineer them.</span>
            </h2>

            <div className="w-12 h-[1px] mx-auto mb-12" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />

            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-[#d0c5b4] leading-loose font-light text-base">
                Since 2023, we&apos;ve partnered with ambitious businesses to architect digital systems that convert ambition into measurable revenue.
              </p>
              <p className="text-[#e9e1d8] text-lg font-light italic" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Make growth predictable and profitable.
              </p>
            </div>

            {/* Metric Blocks with hairline dividers */}
            <div
              className="flex justify-center mt-20 pt-12"
              style={{ borderTop: '1px solid rgba(77,70,57,0.6)' }}
            >
              <div className="flex items-stretch gap-0">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-stretch">
                    {index > 0 && <div className="hairline mx-10" />}
                    <div
                      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                    >
                      <div className="metric-num-sm" style={{ color: metric.color }}>
                        {metric.value}
                      </div>
                      <div className="label-caps mt-2">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
