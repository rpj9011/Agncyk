'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const projects = [
    {
      client: 'TechStart Solutions',
      logo: '/TechStart.png',
      industry: 'SaaS',
      category: 'web',
      problem: 'Low conversion rate on landing page',
      solution: 'Redesigned UX with A/B tested conversion funnels',
      metrics: [
        { label: 'Conversion Rate', value: '+187%', positive: true },
        { label: 'Revenue Growth', value: '+142%', positive: true },
      ],
    },
    {
      client: 'RetailHub India',
      logo: '/RetailHub.png',
      industry: 'E-commerce',
      category: 'web',
      problem: 'Slow website affecting sales',
      solution: 'Built high-performance Next.js e-commerce platform',
      metrics: [
        { label: 'Revenue Growth', value: '+89%', positive: true },
        { label: 'Load Time', value: '-65%', positive: true },
      ],
    },
    {
      client: 'FinanceGrow',
      logo: '/FinanceGrow.png',
      industry: 'Financial Services',
      category: 'marketing',
      problem: 'High CAC, low quality leads',
      solution: 'Implemented targeted SEO and Google Ads strategy',
      metrics: [
        { label: 'CAC Reduction', value: '-62%', positive: true },
        { label: 'Lead Quality', value: '+210%', positive: true },
      ],
    },
    {
      client: 'HealthPlus Clinics',
      logo: '/HealthPlus.png',
      industry: 'Healthcare',
      category: 'marketing',
      problem: 'Zero online visibility',
      solution: 'Local SEO + Google My Business optimization',
      metrics: [
        { label: 'Organic Traffic', value: '+320%', positive: true },
        { label: 'Appointments', value: '+156%', positive: true },
      ],
    },
    {
      client: 'LuxuryStay Hotels',
      logo: '/LuxuryStay.png',
      industry: 'Hospitality',
      category: 'branding',
      problem: 'Outdated brand identity',
      solution: 'Complete brand refresh with digital strategy',
      metrics: [
        { label: 'Direct Bookings', value: '+78%', positive: true },
        { label: 'Brand Recall', value: '+94%', positive: true },
      ],
    },
    {
      client: 'EduTech Academy',
      logo: '/EduTech.png',
      industry: 'Education',
      category: 'web',
      problem: 'Complex enrollment process',
      solution: 'Custom LMS with automated workflows',
      metrics: [
        { label: 'Enrollments', value: '+210%', positive: true },
        { label: 'Process Time', value: '-73%', positive: true },
      ],
    },
  ]

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'web', label: 'Web' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'branding', label: 'Branding' },
    { id: 'performance', label: 'Performance' },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

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
      {/* Header Section */}
      <section
        id="portfolio"
        ref={sectionRef}
        className="relative py-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
        style={{ backgroundColor: '#100e09' }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(230,194,119,0.05) 0%, transparent 70%)' }} />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#e6c277]" />
              <span className="label-caps" style={{ color: '#e6c277' }}>Case Studies</span>
              <div className="w-8 h-[1px] bg-[#e6c277]" />
            </div>

            <h2
              className="font-display font-bold text-[#e9e1d8] leading-tight"
              style={{ fontSize: '52px', letterSpacing: '-0.02em' }}
            >
              Selected Work
            </h2>
            <div className="w-16 h-[1px] mt-10 mx-auto" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
            <p className="text-[#d0c5b4] mt-8 text-base max-w-2xl mx-auto font-light leading-loose">
              Real projects. Measurable results. Sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        className="relative pb-[120px] px-8 sm:px-12 lg:px-16 overflow-hidden"
        style={{ backgroundColor: '#100e09' }}
      >
        <div className="relative max-w-[1200px] mx-auto">
          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="relative px-6 py-2.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-[9999px]"
                style={{
                  backgroundColor: filter === cat.id
                    ? '#e6c277'
                    : 'rgba(34,31,26,0.8)',
                  color: filter === cat.id
                    ? '#402d00'
                    : '#998f80',
                  border: `1px solid ${filter === cat.id ? '#e6c277' : 'rgba(77,70,57,0.5)'}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredIdx === index
              return (
                <div
                  key={`${project.client}-${index}`}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative overflow-hidden transition-all duration-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    borderRadius: '0px',
                    border: `1px solid ${isHovered ? 'rgba(230,194,119,0.4)' : 'rgba(128,128,128,0.2)'}`,
                    backgroundColor: isHovered ? '#221f1a' : '#1e1b16',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  }}
                >
                  {/* Visual Preview */}
                  <div className="relative h-64 overflow-hidden" style={{ backgroundColor: '#16130e' }}>
                    {/* Logo Display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={project.logo}
                        alt={project.client}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                      />
                    </div>

                    {/* Grain texture */}
                    <div
                      className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Category pill badge */}
                    <div
                      className="absolute top-5 right-5 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase rounded-[9999px]"
                      style={{
                        backgroundColor: 'rgba(34,31,26,0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#e6c277',
                        border: '1px solid rgba(230,194,119,0.2)',
                      }}
                    >
                      {project.industry}
                    </div>

                    {/* Cobalt hover overlay tint */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ backgroundColor: 'rgba(46,91,255,0.06)', opacity: isHovered ? 1 : 0 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3
                        className="font-display text-2xl font-semibold transition-colors duration-300"
                        style={{ color: isHovered ? '#e6c277' : '#e9e1d8' }}
                      >
                        {project.client}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        style={{
                          color: isHovered ? '#e6c277' : '#4d4639',
                          transform: isHovered ? 'translate(2px, -2px)' : 'translate(0,0)',
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
                          marginLeft: '1rem',
                          marginTop: '4px',
                        }}
                      />
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="label-caps mb-1.5">Problem</p>
                        <p className="text-[#d0c5b4] text-sm leading-relaxed font-light">{project.problem}</p>
                      </div>
                      <div>
                        <p className="label-caps mb-1.5">Solution</p>
                        <p className="text-[#d0c5b4] text-sm leading-relaxed font-light">{project.solution}</p>
                      </div>
                    </div>

                    {/* Metrics with hairline dividers */}
                    <div className="pt-6" style={{ borderTop: '1px solid rgba(77,70,57,0.5)' }}>
                      <div className="flex items-stretch gap-0">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-stretch">
                            {idx > 0 && <div className="hairline mx-6" />}
                            <div>
                              <div
                                className="font-bold leading-none"
                                style={{
                                  fontFamily: 'Inter, system-ui, sans-serif',
                                  fontSize: '28px',
                                  letterSpacing: '-0.03em',
                                  color: '#00E676',
                                  transition: 'transform 0.3s ease',
                                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                  transformOrigin: 'left',
                                }}
                              >
                                {metric.value}
                              </div>
                              <div className="label-caps mt-1.5">{metric.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
