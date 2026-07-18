'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Lock, Shield, Clock, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormErrors {
  name?: string
  company?: string
  email?: string
  phone?: string
  budget?: string
  services?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    services: [] as string[],
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [activeField, setActiveField] = useState<string | null>(null)

  const serviceOptions = [
    'Web Development',
    'Digital Marketing',
    'Performance Marketing',
    'UI/UX Design',
    'Branding & Strategy',
    'SEO Optimization',
    'Brand Identity',
    'E-commerce',
    'SEO',
    'Social Media',
  ]

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || value.length < 2) return 'Name must be at least 2 characters'
        break
      case 'company':
        if (!value) return 'Company name is required'
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || !emailRegex.test(value)) return 'Valid email is required'
        break
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        if (!value || !phoneRegex.test(value)) return 'Valid phone number required (no spaces)'
        break
      case 'budget':
        if (!value) return 'Please select a budget range'
        break
      case 'services':
        if (!Array.isArray(value) || value.length === 0) return 'Select at least one service'
        break
      case 'message':
        if (!value || value.length < 10) return 'Message must be at least 10 characters'
        if (value.length > 1000) return 'Message must not exceed 1000 characters'
        break
    }
    return undefined
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    setActiveField(null)
    const error = validateField(field, formData[field as keyof typeof formData])
    setErrors({ ...errors, [field]: error })
  }

  const handleFocus = (field: string) => {
    setActiveField(field)
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors({ ...errors, [field]: error })
    }
    if (field === 'message') {
      setCharCount(value.length)
    }
  }

  const handleServiceToggle = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service]

    handleChange('services', newServices)
  }

  const isFormValid = () => {
    const allErrors = Object.keys(formData).map(key =>
      validateField(key, formData[key as keyof typeof formData])
    )
    return allErrors.every(error => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    const allErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) allErrors[key as keyof FormErrors] = error
    })

    setErrors(allErrors)

    if (Object.keys(allErrors).length > 0) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', company: '', email: '', phone: '', budget: '', services: [], message: '' })
        setCharCount(0)
        setTouched({})
        setErrors({})
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputStyle = (field: string) => ({
    width: '100%',
    height: '52px',
    padding: '0.75rem 1rem',
    fontSize: '14px',
    fontFamily: 'Inter, system-ui',
    backgroundColor: 'rgba(30,27,22,0.8)',
    border: `1px solid ${errors[field as keyof FormErrors] && touched[field]
      ? '#ffb4ab'
      : activeField === field
        ? '#2E5BFF'
        : 'rgba(77,70,57,0.8)'}`,
    borderRadius: '0.25rem',
    color: '#e9e1d8',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: activeField === field
      ? '0 0 0 2px rgba(46,91,255,0.15), 0 0 12px rgba(46,91,255,0.1)'
      : 'none',
  })

  const labelStyle = (field: string) => ({
    display: 'block',
    marginBottom: '6px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: activeField === field ? '#2E5BFF' : errors[field as keyof FormErrors] && touched[field] ? '#ffb4ab' : '#998f80',
    transition: 'color 0.3s ease',
    fontFamily: 'Inter, system-ui',
  })

  // Active field indicator (cobalt monospaced label top-right)
  const FocusLabel = ({ field }: { field: string }) => (
    <AnimatePresence>
      {activeField === field && (
        <motion.span
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          className="absolute top-0 right-0 text-[9px] font-semibold tracking-[0.1em] uppercase"
          style={{
            color: '#2E5BFF',
            fontFamily: 'Inter, system-ui',
            transform: 'translateY(-100%)',
            paddingBottom: '4px',
          }}
        >
          FOCUS ACTIVE
        </motion.span>
      )}
    </AnimatePresence>
  )

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-8 sm:px-12 lg:px-16 relative overflow-hidden py-[120px]"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient gold glow */}
      <div
        className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,194,119,0.05) 0%, transparent 70%)' }}
      />
      {/* Cobalt glow left */}
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(46,91,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Messaging */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#e6c277]" />
                <span className="label-caps" style={{ color: '#e6c277' }}>Get in Touch</span>
              </div>

              <h2
                className="font-display font-bold text-[#e9e1d8] leading-tight mb-6"
                style={{ fontSize: '48px', letterSpacing: '-0.02em' }}
              >
                Begin the
                <br />
                <span className="text-[#e6c277] italic">Conversation</span>
              </h2>
              <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: 'rgba(230,194,119,0.6)' }} />
              <p className="text-[#d0c5b4] max-w-md leading-loose text-sm font-light">
                30-minute strategy session to identify growth opportunities and define your digital roadmap.
              </p>
            </div>

            {/* Contact info blocks */}
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Email', value: 'rpj9011@outlook.com', href: 'mailto:rpj9011@outlook.com' },
                { icon: Phone, label: 'Phone', value: '+91 9158853996', href: 'tel:+919158853996' },
                { icon: MapPin, label: 'Location', value: 'Pune, India', href: null },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-5 transition-all duration-400"
                  style={{
                    border: '1px solid rgba(77,70,57,0.5)',
                    backgroundColor: 'rgba(30,27,22,0.6)',
                    borderRadius: '0px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(230,194,119,0.3)'
                    e.currentTarget.style.backgroundColor = 'rgba(34,31,26,0.8)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(77,70,57,0.5)'
                    e.currentTarget.style.backgroundColor = 'rgba(30,27,22,0.6)'
                  }}
                >
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(230,194,119,0.08)', border: '1px solid rgba(230,194,119,0.15)', borderRadius: '0.25rem' }}
                  >
                    <item.icon style={{ color: '#e6c277', width: 16, height: 16 }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="label-caps mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[#e6c277] hover:text-[#c6a45c] transition-colors duration-300 font-light text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#d0c5b4] text-sm font-light">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow behind form */}
            <div
              className="absolute inset-0 blur-xl opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(230,194,119,0.08) 0%, rgba(46,91,255,0.06) 100%)',
                borderRadius: '0px',
              }}
            />

            {/* Form container */}
            <div
              className="relative p-10"
              style={{
                backgroundColor: 'rgba(34,31,26,0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(230,194,119,0.15)',
                borderRadius: '0px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={64} style={{ color: '#00E676' }} strokeWidth={1.5} className="mb-6" />
                    </motion.div>
                    <h3 className="font-display text-3xl font-semibold text-[#e9e1d8] mb-3">
                      Request Received
                    </h3>
                    <p className="text-[#d0c5b4] mb-8 text-sm font-light leading-relaxed max-w-sm">
                      We&apos;ll respond within 24 hours with next steps for your project.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="label-caps hover:text-[#e6c277] transition-colors duration-300"
                      style={{ color: '#998f80', cursor: 'pointer' }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name / Company */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle('name')}>Name *</label>
                        <div className="relative">
                          <FocusLabel field="name" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            onFocus={() => handleFocus('name')}
                            style={inputStyle('name')}
                            placeholder="Your name"
                            className={errors.name && touched.name ? 'animate-shake' : ''}
                          />
                        </div>
                        {errors.name && touched.name && (
                          <p className="text-[#ffb4ab] text-xs mt-1 font-light">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label style={labelStyle('company')}>Company *</label>
                        <div className="relative">
                          <FocusLabel field="company" />
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            onBlur={() => handleBlur('company')}
                            onFocus={() => handleFocus('company')}
                            style={inputStyle('company')}
                            placeholder="Company name"
                            className={errors.company && touched.company ? 'animate-shake' : ''}
                          />
                        </div>
                        {errors.company && touched.company && (
                          <p className="text-[#ffb4ab] text-xs mt-1 font-light">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    {/* Email / Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle('email')}>Email *</label>
                        <div className="relative">
                          <FocusLabel field="email" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            onFocus={() => handleFocus('email')}
                            style={inputStyle('email')}
                            placeholder="you@company.com"
                            className={errors.email && touched.email ? 'animate-shake' : ''}
                          />
                        </div>
                        {errors.email && touched.email && (
                          <p className="text-[#ffb4ab] text-xs mt-1 font-light">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label style={labelStyle('phone')}>Phone *</label>
                        <div className="relative">
                          <FocusLabel field="phone" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            onFocus={() => handleFocus('phone')}
                            style={inputStyle('phone')}
                            placeholder="+91XXXXXXXXXX"
                            className={errors.phone && touched.phone ? 'animate-shake' : ''}
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <p className="text-[#ffb4ab] text-xs mt-1 font-light">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label style={labelStyle('budget')}>Budget Range *</label>
                      <div className="relative">
                        <FocusLabel field="budget" />
                        <select
                          value={formData.budget}
                          onChange={(e) => handleChange('budget', e.target.value)}
                          onBlur={() => handleBlur('budget')}
                          onFocus={() => handleFocus('budget')}
                          style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}
                          className={errors.budget && touched.budget ? 'animate-shake' : ''}
                        >
                          <option value="" style={{ backgroundColor: '#1e1b16' }}>Select Budget</option>
                          <option value="1L-3L" style={{ backgroundColor: '#1e1b16' }}>₹1L – ₹3L</option>
                          <option value="3L-5L" style={{ backgroundColor: '#1e1b16' }}>₹3L – ₹5L</option>
                          <option value="5L-10L" style={{ backgroundColor: '#1e1b16' }}>₹5L – ₹10L</option>
                          <option value="10L-15L" style={{ backgroundColor: '#1e1b16' }}>₹10L – ₹15L</option>
                          <option value="15L+" style={{ backgroundColor: '#1e1b16' }}>₹15L+</option>
                        </select>
                      </div>
                      {errors.budget && touched.budget && (
                        <p className="text-[#ffb4ab] text-xs mt-1 font-light">{errors.budget}</p>
                      )}
                    </div>

                    {/* Services */}
                    <div>
                      <label
                        className="block mb-4"
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#e6c277',
                          fontFamily: 'Inter, system-ui',
                        }}
                      >
                        Services Needed *
                      </label>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {serviceOptions.map((service) => {
                          const isChecked = formData.services.includes(service)
                          return (
                            <label
                              key={service}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <div className="relative flex-shrink-0">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleServiceToggle(service)}
                                  className="sr-only"
                                />
                                <div
                                  className="w-4 h-4 flex items-center justify-center transition-all duration-300"
                                  style={{
                                    backgroundColor: isChecked ? '#e6c277' : 'transparent',
                                    border: `1.5px solid ${isChecked ? '#e6c277' : 'rgba(153,143,128,0.4)'}`,
                                    borderRadius: '0.125rem',
                                  }}
                                >
                                  {isChecked && (
                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" style={{ stroke: '#402d00' }} />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <span
                                className="text-xs font-light transition-colors group-hover:text-[#e9e1d8]"
                                style={{ color: isChecked ? '#e9e1d8' : '#d0c5b4' }}
                              >
                                {service}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                      {errors.services && touched.services && (
                        <p className="text-[#ffb4ab] text-xs mt-2 font-light">{errors.services}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label style={labelStyle('message')}>Project Details *</label>
                      <div className="relative">
                        <FocusLabel field="message" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          onBlur={() => handleBlur('message')}
                          onFocus={() => handleFocus('message')}
                          maxLength={1000}
                          rows={4}
                          className={errors.message && touched.message ? 'animate-shake' : ''}
                          style={{
                            ...inputStyle('message'),
                            height: 'auto',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            resize: 'none',
                          }}
                          placeholder="Tell us about your project goals..."
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        {errors.message && touched.message ? (
                          <p className="text-[#ffb4ab] text-xs font-light">{errors.message}</p>
                        ) : <div />}
                        <span className="text-xs font-light" style={{ color: '#998f80' }}>{charCount}/1000</span>
                      </div>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-4"
                          style={{
                            backgroundColor: 'rgba(255,180,171,0.08)',
                            border: '1px solid rgba(255,180,171,0.25)',
                            borderRadius: '0.25rem',
                          }}
                        >
                          <AlertCircle size={16} style={{ color: '#ffb4ab', flexShrink: 0 }} strokeWidth={1.5} />
                          <p className="text-xs font-light" style={{ color: '#ffb4ab' }}>{errorMessage}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading' || !isFormValid()}
                      className="w-full py-4 font-semibold text-xs tracking-[0.1em] uppercase flex items-center justify-center gap-3 group transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #e6c277 0%, #c6a45c 100%)',
                        color: '#402d00',
                        borderRadius: '0.25rem',
                        boxShadow: '0 4px 24px rgba(230,194,119,0.2)',
                        fontFamily: 'Inter, system-ui',
                      }}
                      onMouseEnter={e => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.boxShadow = '0 8px 40px rgba(230,194,119,0.4)'
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(230,194,119,0.2)'
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Your Project</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                        </>
                      )}
                    </button>

                    {/* Trust indicators */}
                    <div
                      className="flex flex-wrap items-center justify-center gap-6 pt-5"
                      style={{ borderTop: '1px solid rgba(77,70,57,0.5)' }}
                    >
                      {[
                        { icon: Lock, text: '100% Confidential' },
                        { icon: Shield, text: 'Secure Submission' },
                        { icon: Clock, text: '24h Response' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-light" style={{ color: '#998f80' }}>
                          <item.icon size={12} style={{ color: 'rgba(230,194,119,0.6)' }} strokeWidth={1.5} />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
