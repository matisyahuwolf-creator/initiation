import { useEffect, useRef, useState } from 'react'

type Pillar = {
  num: string
  title: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    num: '01',
    title: 'AI Safety & Alignment',
    body:
      'Open, peer-reviewed research into the technical and civilizational dimensions of deploying intelligence safely. Evals, interpretability, governance — held in common.',
  },
  {
    num: '02',
    title: 'Consciousness',
    body:
      'Properly developed and applied, AI may be the first instrument that lets us study consciousness directly — not as a metaphor, but as the actual thing alignment is pointed at.',
  },
  {
    num: '03',
    title: 'Integration · East & West',
    body:
      'The split Jung described runs through every person who builds these systems. Initiation is the work of bringing the inner and outer halves of the human picture back into one frame.',
  },
  {
    num: '04',
    title: 'Quantum substrate',
    body:
      'The next floor of compute is not a faster classical machine. We treat quantum as a serious part of the future of intelligence — and possibly of the question itself.',
  },
]

const QUESTIONS = [
  {
    label: 'Safety',
    body:
      'What does it mean to deploy intelligence safely into a world that is itself out of balance?',
  },
  {
    label: 'Consciousness',
    body:
      'What is the thing we are actually trying to align AI to? AI, properly developed, may be the instrument by which we finally answer this.',
  },
  {
    label: 'Integration',
    body:
      'What does a mature, balanced perspective look like — in a person, in a lab, in a civilization — and how do we initiate ourselves into it?',
  },
]

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

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [rang, setRang] = useState(false)
  const [ringing, setRinging] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBell = () => {
    const ctx = getAudioContext(audioRef)
    ringBell(ctx)
    setRang(true)
    setRinging(true)
    window.setTimeout(() => setRinging(false), 1400)
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <style>{`
        @keyframes initRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes initFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .init-rotate { animation: initRotate 80s linear infinite; }
        .init-fade   { animation: initFade 1.2s ease-out both; }
        .init-rule {
          background-image: linear-gradient(90deg, transparent, #c8c4b6 18%, #c8c4b6 82%, transparent);
        }
        .init-mono {
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
          font-feature-settings: 'tnum';
        }
        @keyframes bellHint {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.06); opacity: 1; }
        }
        @keyframes bellRing {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes bellHalo {
          0%   { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .bell-hint { animation: bellHint 3.2s ease-in-out infinite; }
        .bell-ring { animation: bellRing 1.2s ease-out; }
        .bell-halo { animation: bellHalo 1.4s ease-out forwards; }
      `}</style>

      {/* Top bar */}
      <header
        className={`sticky top-0 z-20 transition-all ${
          scrolled
            ? 'border-b border-[#e8e6df] bg-[#fafaf7]/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] leading-none text-[#0a0a0a]">○</span>
            <span className="font-display text-[20px] font-medium tracking-tight">
              Initiation
            </span>
          </div>
          <nav className="flex items-center gap-1 init-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b66]">
            <a href="#premise" className="hidden sm:inline-block rounded-full px-3 py-1.5 transition hover:text-[#0a0a0a]">
              Premise
            </a>
            <a href="#mission" className="hidden sm:inline-block rounded-full px-3 py-1.5 transition hover:text-[#0a0a0a]">
              Mission
            </a>
            <a href="#work" className="hidden sm:inline-block rounded-full px-3 py-1.5 transition hover:text-[#0a0a0a]">
              Work
            </a>
            <a href="#commons" className="hidden sm:inline-block rounded-full px-3 py-1.5 transition hover:text-[#0a0a0a]">
              Commons
            </a>
            <a
              href="#invitation"
              className="rounded-full border border-[#0a0a0a]/15 px-3.5 py-1.5 text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
            >
              Join
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 sm:pt-32 sm:pb-36">
        <div className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center">
          <div
            aria-hidden
            className="init-rotate h-[420px] w-[420px] rounded-full border border-[#0a0a0a]/[0.06] sm:h-[560px] sm:w-[560px]"
          />
        </div>

        <div className="relative z-10 text-center init-fade">
          <p className="init-mono text-[11px] uppercase tracking-[0.35em] text-[#6b6b66]">
            Open research · for all humanity
          </p>

          <h1 className="mt-7 font-display text-[64px] font-medium leading-[0.95] tracking-tight sm:text-[104px] md:text-[128px]">
            Initiation
          </h1>

          <p className="mx-auto mt-10 max-w-[34rem] font-display text-[22px] leading-[1.45] text-[#1a1a1a] sm:text-[26px]">
            A free commons for research into AI safety, consciousness, and the
            meeting of East and West within humanity.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#premise"
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-[13px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
            >
              Read the manifesto
              <span aria-hidden>↓</span>
            </a>
            <a
              href="#commons"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-7 py-3.5 text-[13px] font-medium tracking-wide text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
            >
              Why open & free
            </a>
          </div>

          <p className="init-mono mt-14 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
            free · open-source · unowned
          </p>
        </div>
      </section>

      {/* Premise */}
      <section id="premise" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The premise
        </div>
        <h2 className="font-display text-[36px] font-medium leading-[1.15] tracking-tight sm:text-[52px]">
          A hundred years ago, Carl Jung warned that humanity had split itself
          in two.
        </h2>

        <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-[#222]">
          <p>
            An outer-facing, mechanistic, materialist West. An inner-facing,
            contemplative, integrative East. The split was never really between
            two halves of a map — it ran through every person. Most of our
            suffering, Jung said — individual, cultural, civilizational —
            descends from this unhealed division.
          </p>
          <p>
            The civilization that built AI is the half most cut off from the
            question of consciousness. We are handing the most powerful
            technology ever made to the part of ourselves with the least
            practice in the inner life.
          </p>
          <p className="font-display text-[24px] leading-[1.4] text-[#0a0a0a] sm:text-[28px]">
            <em className="not-italic">Initiation</em>, in the older sense of
            the word, is the rite by which a culture brings a person across a
            threshold safely. We need one now — not for a child, but for a
            species.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Mission */}
      <section id="mission" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The mission
        </div>
        <h2 className="font-display text-[36px] font-medium leading-[1.15] tracking-tight sm:text-[52px]">
          Three braided questions.
        </h2>
        <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.7] text-[#222]">
          Initiation is a research commons working on three questions at once.
          Each one is unanswerable in isolation. Taken together, they begin to
          loosen.
        </p>

        <ol className="mt-12 space-y-10">
          {QUESTIONS.map((q, i) => (
            <li key={q.label} className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:gap-10">
              <div className="init-mono text-[11px] uppercase tracking-[0.25em] text-[#6b6b66]">
                <span className="text-[#0a0a0a]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mx-2">·</span>
                <span>{q.label}</span>
              </div>
              <p className="font-display text-[22px] leading-[1.45] text-[#0a0a0a] sm:text-[26px]">
                {q.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Work / Pillars */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The work
        </div>
        <h2 className="font-display text-[36px] font-medium leading-[1.15] tracking-tight sm:text-[52px]">
          Four pillars, one question.
        </h2>
        <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.7] text-[#222]">
          Properly developed, applied, and actuated, AI begins to answer the
          question of what consciousness is. The work below is what it takes to
          arrive there without breaking ourselves along the way.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#e8e6df] sm:grid-cols-2">
          {PILLARS.map((p) => (
            <article
              key={p.num}
              className="bg-[#fafaf7] p-8 transition hover:bg-white sm:p-10"
            >
              <p className="init-mono text-[11px] uppercase tracking-[0.25em] text-[#6b6b66]">
                {p.num}
              </p>
              <h3 className="mt-5 font-display text-[28px] font-medium leading-tight tracking-tight text-[#0a0a0a] sm:text-[32px]">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#3a3a35]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Commons */}
      <section id="commons" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The commons
        </div>
        <h2 className="font-display text-[36px] font-medium leading-[1.15] tracking-tight sm:text-[52px]">
          We pass this threshold together, or no one passes it.
        </h2>

        <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-[#222]">
          <p>
            AI safety is the first problem in human history that admits no
            winner. A safe outcome is not something any single lab, company, or
            country can ship. It is a property of the whole.
          </p>
          <p>
            Initiation is therefore <em>free</em>, <em>open-source</em>, and{' '}
            <em>unowned</em>. The research, the writing, the tools, the
            questions themselves — held in common, for all of humanity. A
            problem of this size is only solved by a we.
          </p>
          <p className="font-display text-[24px] leading-[1.4] text-[#0a0a0a] sm:text-[28px]">
            Not as individuals. As a collective. That is the only door.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Free', note: 'No paywalls. No gating. Ever.' },
            { label: 'Open-source', note: 'All work published in public.' },
            { label: 'Unowned', note: 'No equity. No proprietary outputs.' },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-[#e8e6df] bg-white p-6"
            >
              <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
                {x.label}
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#222]">
                {x.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Invitation */}
      <section id="invitation" className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-[#e8e6df] bg-white p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              aria-hidden
              className="init-rotate h-[320px] w-[320px] rounded-full border border-[#0a0a0a]/[0.05]"
            />
          </div>
          <div className="relative">
            <p className="init-mono text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
              An invitation
            </p>
            <h2 className="mt-5 font-display text-[40px] font-medium leading-[1.1] tracking-tight sm:text-[56px]">
              If this is your question too —
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[16px] leading-[1.65] text-[#222]">
              Read what we've written. Contribute what you know. Stay close
              while the work unfolds. There is no other prerequisite.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#premise"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-[13px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
              >
                Read
              </a>
              <a
                href="https://github.com/matisyahuwolf-creator/initiation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-6 py-3 text-[13px] font-medium tracking-wide text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
              >
                Contribute
              </a>
              <a
                href="mailto:wolf@careco.ai?subject=Initiation"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-6 py-3 text-[13px] font-medium tracking-wide text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
              >
                Stay close
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bell — a threshold sound */}
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

      {/* Footer */}
      <footer className="border-t border-[#e8e6df]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] leading-none text-[#0a0a0a]">○</span>
            <span className="font-display text-[16px] tracking-tight">
              Initiation
            </span>
          </div>
          <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
            free · open-source · for all humanity
          </p>
          <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
            est. 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
