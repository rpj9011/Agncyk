'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Testimonials() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      designation: 'CEO',
      company: 'TechStart Solutions',
      content: 'AgencyK transformed our digital presence completely. The new website increased our conversion rate by 187% in just 3 months. Their team understands business, not just technology.',
      rating: 5,
      metric: '+187%',
      metricLabel: 'Conversion',
    },
    {
      name: 'Priya Sharma',
      designation: 'Marketing Director',
      company: 'RetailHub India',
      content: 'Working with AgencyK was a game-changer. They delivered a lightning-fast e-commerce platform that handles our growing traffic effortlessly. Revenue is up 89% year-over-year.',
      rating: 5,
      metric: '+89%',
      metricLabel: 'Revenue',
    },
    {
      name: 'Amit Patel',
      designation: 'Founder',
      company: 'FinanceGrow',
      content: 'Finally, an agency that focuses on ROI instead of vanity metrics. Our cost per acquisition dropped by 62% while lead quality improved dramatically. Highly recommend.',
      rating: 5,
      metric: '-62%',
      metricLabel: 'CAC',
    },
    {
      name: 'Sneha Reddy',
      designation: 'Operations Head',
      company: 'HealthPlus Clinics',
      content: 'The local SEO strategy they implemented brought us from zero online visibility to page 1 rankings. Patient appointments increased by 95%. Professional team, measurable results.',
      rating: 5,
      metric: '+320%',
      metricLabel: 'Traffic',
    },
    {
      name: 'Vikram Singh',
      designation: 'Managing Director',
      company: 'LuxuryStay Hotels',
      content: 'AgencyK helped us modernize our brand and digital strategy. The results exceeded expectations—bookings up 78% and our average order value increased by 35%.',
      rating: 5,
      metric: '+78%',
      metricLabel: 'Bookings',
    },
  ]

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
    const isHovered = hoveredIdx === index
    return (
      <motion.div
        onMouseEnter={() => setHoveredIdx(index)}
        onMouseLeave={() => setHoveredIdx(null)}
        className="group relative p-8 transition-all duration-300"
        style={{
          backgroundColor: isHovered ? '#2d2924' : '#221f1a',
          border: `1px solid ${isHovered ? 'rgba(230,194,119,0.4)' : 'rgba(128,128,128,0.2)'}`,
          borderRadius: '0px',
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Gold top hairline */}
        <div
          className="absolute top-0 left-0 right-0 transition-all duration-500"
          style={{
            height: isHovered ? '2px' : '1px',
            background: 'linear-gradient(to right, #e6c277, #c6a45c)',
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Quote icon */}
        <Quote
          className="absolute top-6 right-6 transition-all duration-300"
          style={{ color: isHovered ? 'rgba(230,194,119,0.2)' : 'rgba(230,194,119,0.08)', width: 40, height: 40 }}
        />

        {/* Metric badge */}
        <div className="flex items-center justify-between mb-6">
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                style={{ color: '#e6c277', fill: '#e6c277', width: 14, height: 14 }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            ))}
          </div>

          {/* Metric chip */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-[9999px]"
            style={{
              backgroundColor: 'rgba(0,230,118,0.1)',
              border: '1px solid rgba(0,230,118,0.2)',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '-0.02em',
                color: '#00E676',
              }}
            >
              {testimonial.metric}
            </span>
            <span className="label-caps" style={{ fontSize: '9px', color: '#00E676' }}>
              {testimonial.metricLabel}
            </span>
          </div>
        </div>

        {/* Testimonial text */}
        <p className="text-[#d0c5b4] leading-relaxed text-sm mb-6 font-light relative z-10">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Divider */}
        <div
          className="mb-5 transition-colors duration-300"
          style={{ height: '1px', backgroundColor: isHovered ? 'rgba(230,194,119,0.3)' : 'rgba(77,70,57,0.5)' }}
        />

        {/* Client info */}
        <div className="relative z-10">
          <p
            className="font-display font-semibold text-base transition-colors duration-300"
            style={{ color: isHovered ? '#e6c277' : '#e9e1d8' }}
          >
            {testimonial.name}
          </p>
          <p className="text-[#998f80] text-xs mt-1 font-light tracking-wide">
            {testimonial.designation}, {testimonial.company}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section
      id="testimonials"
      className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,194,119,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#e6c277]" />
            <span className="label-caps" style={{ color: '#e6c277' }}>Client Success</span>
            <div className="w-8 h-[1px] bg-[#e6c277]" />
          </div>

          <h2
            className="font-display font-bold text-[#e9e1d8] leading-tight mb-6"
            style={{ fontSize: '52px', letterSpacing: '-0.02em' }}
          >
            What Our Clients Say
          </h2>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
          <p className="text-[#998f80] text-base max-w-2xl mx-auto font-light leading-loose">
            Real partnerships. Real measurable outcomes.
          </p>
        </motion.div>

        {/* Top 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Bottom 2 cards centered */}
        <div className="grid md:grid-cols-2 gap-4 max-w-[820px] mx-auto mb-20">
          {testimonials.slice(3).map((testimonial, index) => (
            <TestimonialCard key={index + 3} testimonial={testimonial} index={index + 3} />
          ))}
        </div>

        {/* Trust Row */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="label-caps mb-8" style={{ color: 'rgba(153,143,128,0.6)' }}>
            Trusted by 6+ Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10" style={{ opacity: 0.5 }}>
            {['TechStart', 'RetailHub', 'FinanceGrow', 'HealthPlus', 'LuxuryStay'].map((company, index) => (
              <div
                key={index}
                className="font-display font-light tracking-[0.05em] hover:opacity-100 transition-opacity duration-300 cursor-default"
                style={{ fontSize: '18px', color: '#e6c277' }}
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}