import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Manifesto', end: true },
  { to: '/research', label: 'Research' },
  { to: '/community', label: 'Community' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-20 transition-all ${
        scrolled
          ? 'border-b border-[#e8e6df] bg-[#fafaf7]/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-[15px] leading-none text-[#0a0a0a]">○</span>
          <span className="font-display text-[20px] font-medium tracking-tight">
            Initiation
          </span>
        </Link>
        <nav className="flex items-center gap-1 init-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b66]">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? 'text-[#0a0a0a]'
                    : 'hover:text-[#0a0a0a]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
