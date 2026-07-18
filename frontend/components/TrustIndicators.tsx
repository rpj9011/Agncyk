'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TrustIndicators() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const clients = [
    { name: 'TechStart Solutions', logo: '/TechStart.png' },
    { name: 'RetailHub India', logo: '/RetailHub.png' },
    { name: 'FinanceGrow', logo: '/FinanceGrow.png' },
    { name: 'HealthPlus Clinics', logo: '/HealthPlus.png' },
    { name: 'LuxuryStay Hotels', logo: '/LuxuryStay.png' },
    { name: 'EduTech Academy', logo: '/EduTech.png' },
  ]

  return (
    <section
      className="relative py-[80px] overflow-hidden"
      style={{ backgroundColor: '#16130e' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Horizontal hairline dividers */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px]"
        style={{ backgroundColor: 'rgba(77,70,57,0.5)' }}
      />
      <div
        className="absolute bottom-0 left-8 right-8 h-[1px]"
        style={{ backgroundColor: 'rgba(77,70,57,0.5)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,194,119,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="label-caps mb-4" style={{ color: 'rgba(153,143,128,0.6)' }}>
            Select Partnerships
          </p>
          <div className="w-12 h-[1px] mx-auto mb-6" style={{ backgroundColor: 'rgba(230,194,119,0.35)' }} />
          <h3
            className="font-display font-semibold text-[#e9e1d8] tracking-[0.05em]"
            style={{ fontSize: '22px' }}
          >
            Trusted by Growing Brands
          </h3>
        </motion.div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {clients.map((client, index) => {
            const isHovered = hoveredIdx === index
            return (
              <motion.div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Sharp container */}
                <div
                  className="relative h-16 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? '#2d2924' : 'rgba(34,31,26,0.6)',
                    border: `1px solid ${isHovered ? 'rgba(230,194,119,0.35)' : 'rgba(128,128,128,0.15)'}`,
                    borderRadius: '0px',
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full p-3">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain transition-all duration-300"
                      style={{
                        filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    />
                  </div>

                  {/* Gold bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                    style={{
                      height: '2px',
                      backgroundColor: '#e6c277',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
