import { Link, useParams } from 'react-router-dom'
import { essays } from '../data/essays'

const REPO = 'matisyahuwolf-creator/initiation'

export default function ResearchEssay() {
  const { slug } = useParams<{ slug: string }>()
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          Not found
        </p>
        <h1 className="mt-5 font-display text-[40px] font-medium leading-tight tracking-tight">
          This essay is not in the commons yet.
        </h1>
        <Link
          to="/research"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-5 py-2.5 text-[13px] font-medium text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
        >
          ← Back to research
        </Link>
      </section>
    )
  }

  const discussUrl = `https://github.com/${REPO}/discussions/new?category=essays&title=${encodeURIComponent(
    `Re: ${essay.title}`,
  )}`

  return (
    <article className="mx-auto max-w-2xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Link
        to="/research"
        className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66] transition hover:text-[#0a0a0a]"
      >
        ← Research
      </Link>

      <header className="mt-10">
        <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          Essay {essay.num} {essay.draft && '· draft'}
        </p>
        <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.05] tracking-tight sm:text-[60px]">
          {essay.title}
        </h1>
        <p className="mt-5 font-display text-[20px] italic leading-[1.45] text-[#3a3a35] sm:text-[22px]">
          {essay.subtitle}
        </p>
        <p className="init-mono mt-6 text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          {essay.author} · {essay.date} · {essay.reading}
        </p>
      </header>

      <div className="mt-12">
        <div className="init-rule h-px" />
      </div>

      <div className="init-prose mt-12">{essay.body}</div>

      {/* Discuss / share footer */}
      <div className="mt-20 rounded-2xl border border-[#e8e6df] bg-white p-8">
        <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
          Discuss this essay
        </p>
        <p className="mt-3 text-[15px] leading-[1.65] text-[#222]">
          Responses, disagreements, and notes happen in the commons — open,
          public, archived in GitHub Discussions.
        </p>
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href={discussUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
          >
            Open a thread
          </a>
          <a
            href={`https://github.com/${REPO}/discussions`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-5 py-2.5 text-[13px] font-medium tracking-wide text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
          >
            See all discussions
          </a>
        </div>
      </div>
    </article>
  )
}
