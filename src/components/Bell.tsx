import { useRef, useState } from 'react'

type AudioCtor = typeof AudioContext

function getAudioContext(ref: { current: AudioContext | null }) {
  if (!ref.current) {
    const Ctor: AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: AudioCtor }).webkitAudioContext
    ref.current = new Ctor()
  }
  if (ref.current.state === 'suspended') {
    void ref.current.resume()
  }
  return ref.current
}

function ringBell(ctx: AudioContext) {
  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.setValueAtTime(0, now)
  master.gain.linearRampToValueAtTime(0.32, now + 0.04)
  master.gain.exponentialRampToValueAtTime(0.0001, now + 7)
  master.connect(ctx.destination)

  const partials = [
    { freq: 196.0, gain: 1.0, decay: 6.0, detune: -0.5 },
    { freq: 392.0, gain: 0.55, decay: 5.0, detune: 0.4 },
    { freq: 587.33, gain: 0.28, decay: 3.8, detune: -0.7 },
    { freq: 783.99, gain: 0.16, decay: 3.0, detune: 0.9 },
    { freq: 1174.66, gain: 0.08, decay: 2.2, detune: -0.3 },
  ]

  partials.forEach((p) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = p.freq + p.detune
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(p.gain, now + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + p.decay)
    osc.connect(g).connect(master)
    osc.start(now)
    osc.stop(now + p.decay + 0.1)
  })
}

export default function Bell() {
  const [rang, setRang] = useState(false)
  const [ringing, setRinging] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)

  const handleBell = () => {
    const ctx = getAudioContext(audioRef)
    ringBell(ctx)
    setRang(true)
    setRinging(true)
    window.setTimeout(() => setRinging(false), 1400)
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
      {!rang && (
        <p className="init-mono pointer-events-none rounded-full bg-[#0a0a0a]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#fafaf7] backdrop-blur-sm">
          ring to begin
        </p>
      )}
      <button
        onClick={handleBell}
        aria-label="Ring the bell"
        className={`pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full border border-[#0a0a0a]/20 bg-[#fafaf7] text-[22px] text-[#0a0a0a] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] transition hover:border-[#0a0a0a]/55 hover:bg-white ${
          !rang ? 'bell-hint' : ''
        } ${ringing ? 'bell-ring' : ''}`}
      >
        ○
        {ringing && (
          <span
            aria-hidden
            className="bell-halo absolute inset-0 rounded-full border border-[#0a0a0a]/35"
          />
        )}
      </button>
    </div>
  )
}
