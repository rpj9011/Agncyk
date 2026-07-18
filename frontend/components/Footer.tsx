'use client'

import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-20 pb-10" style={{ backgroundColor: '#100e09' }}>
      {/* Top hairline gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(230,194,119,0.25), transparent)' }}
      />

      {/* Subtle ambient glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,194,119,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-16">
        {/* Centered brand */}
        <div className="text-center mb-16">
          <h3
            className="font-display font-semibold mb-5 tracking-[0.05em]"
            style={{ fontSize: '28px', color: '#e9e1d8' }}
          >
            Agency<span style={{ color: '#e6c277', fontStyle: 'italic' }}>K</span>
          </h3>
          <div className="w-12 h-[1px] mx-auto mb-7" style={{ backgroundColor: 'rgba(230,194,119,0.5)' }} />
          <p className="text-[#d0c5b4] max-w-md mx-auto leading-loose font-light text-sm">
            Strategic systems built for ambitious brands. Conversion-first architecture.
          </p>
        </div>

        {/* Contact links */}
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16 pb-14"
          style={{ borderBottom: '1px solid rgba(77,70,57,0.5)' }}
        >
          <a
            href="mailto:rpj9011@outlook.com"
            className="flex items-center gap-3 text-sm font-light transition-colors duration-400"
            style={{ color: '#d0c5b4' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e6c277')}
            onMouseLeave={e => (e.currentTarget.style.color = '#d0c5b4')}
          >
            <Mail size={14} style={{ color: '#e6c277' }} />
            rpj9011@outlook.com
          </a>
          <a
            href="tel:+919158853996"
            className="flex items-center gap-3 text-sm font-light transition-colors duration-400"
            style={{ color: '#d0c5b4' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e6c277')}
            onMouseLeave={e => (e.currentTarget.style.color = '#d0c5b4')}
          >
            <Phone size={14} style={{ color: '#e6c277' }} />
            +91 91588 53996
          </a>
          <div className="flex items-center gap-3 text-sm font-light" style={{ color: '#d0c5b4' }}>
            <MapPin size={14} style={{ color: '#e6c277' }} />
            Pune, India
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-14">
          {[
            { href: 'https://www.linkedin.com/company/agencyk', icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://twitter.com/agencyk', icon: Twitter, label: 'Twitter' },
            { href: 'https://www.instagram.com/agencyk', icon: Instagram, label: 'Instagram' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{
                border: '1px solid rgba(77,70,57,0.6)',
                borderRadius: '0.25rem',
                color: '#998f80',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(230,194,119,0.4)'
                e.currentTarget.style.color = '#e6c277'
                e.currentTarget.style.backgroundColor = 'rgba(230,194,119,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(77,70,57,0.6)'
                e.currentTarget.style.color = '#998f80'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <social.icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-7 flex flex-col md:flex-row justify-between items-center gap-5 text-xs font-light"
          style={{ borderTop: '1px solid rgba(77,70,57,0.4)', color: '#998f80' }}
        >
          <p className="uppercase tracking-[0.15em]">© {currentYear} AgencyK</p>
          <div className="flex gap-7 uppercase tracking-[0.12em]">
            {[
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Admin', href: '/admin' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-400"
                style={{ color: '#998f80' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e6c277')}
                onMouseLeave={e => (e.currentTarget.style.color = '#998f80')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
