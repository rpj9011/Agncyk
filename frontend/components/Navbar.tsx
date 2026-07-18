'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Settings } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      {/* Gold glow behind the navbar */}
      <div
        className={`
          absolute top-2 left-1/2 -translate-x-1/2
          w-[70%] max-w-3xl h-16
          rounded-full
          bg-[radial-gradient(ellipse_at_center,_rgba(230,194,119,0.15)_0%,_rgba(230,194,119,0.05)_50%,_transparent_80%)]
          blur-2xl
          transition-opacity duration-700
          pointer-events-none
          ${scrolled ? 'opacity-100' : 'opacity-50'}
        `}
      />
      <nav
        className={`
          pointer-events-auto
          relative
          w-full max-w-5xl
          rounded-[0.5rem]
          transition-all duration-500 ease-out
          ${scrolled
            ? 'bg-[rgba(15,15,15,0.92)] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_2px_16px_rgba(0,0,0,0.4)] border border-[rgba(230,194,119,0.18)]'
            : 'bg-[rgba(15,15,15,0.6)] shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-[rgba(230,194,119,0.1)]'
          }
        `}
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="text-lg font-display font-light text-[#e9e1d8] tracking-[0.05em]">
                Agency<span className="text-[#e6c277] italic">K</span>
              </a>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-[11px] font-light uppercase tracking-[0.15em] text-[#d0c5b4]/80 hover:text-[#e9e1d8] transition-colors duration-300 rounded-sm hover:bg-white/[0.04]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right: CTA + Admin */}
            <div className="hidden md:flex items-center gap-3">
              {/* Admin icon button */}
              <a
                href="/admin"
                className="
                  flex items-center justify-center
                  w-9 h-9
                  rounded-sm
                  border border-[rgba(77,70,57,0.6)]
                  text-[#998f80] hover:text-[#e6c277]
                  hover:border-[rgba(230,194,119,0.3)]
                  hover:bg-[rgba(230,194,119,0.05)]
                  transition-all duration-300
                "
                aria-label="Admin Panel"
                title="Admin Panel"
              >
                <Settings size={15} strokeWidth={1.5} />
              </a>

              {/* Let's Talk CTA */}
              <a
                href="#contact"
                className="
                  relative px-5 py-2
                  text-[11px] font-semibold uppercase tracking-[0.1em]
                  text-[#402d00] bg-[#e6c277]
                  rounded-[0.25rem]
                  hover:bg-[#c6a45c]
                  transition-all duration-300
                  shadow-[0_2px_12px_rgba(230,194,119,0.25)]
                  hover:shadow-[0_4px_20px_rgba(230,194,119,0.4)]
                "
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#e9e1d8]/80 hover:text-[#e9e1d8] rounded-sm hover:bg-white/[0.05] transition-colors duration-300"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-400 ease-out
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-6 pb-5 pt-2 border-t border-white/[0.06]">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] font-light text-[#d0c5b4]/80 hover:text-[#e9e1d8] hover:bg-white/[0.04] rounded-sm transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
              <a
                href="#contact"
                className="block text-center px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#402d00] bg-[#e6c277] rounded-[0.25rem] hover:bg-[#c6a45c] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Talk
              </a>
              <a
                href="/admin"
                className="flex items-center justify-center gap-2 px-5 py-2 text-[10px] font-light uppercase tracking-[0.1em] text-[#998f80] border border-[rgba(77,70,57,0.5)] rounded-[0.25rem] hover:text-[#e6c277] hover:border-[rgba(230,194,119,0.3)] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={12} strokeWidth={1.5} />
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
