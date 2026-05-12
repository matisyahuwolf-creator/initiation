import { Link } from 'react-router-dom'
import { essays } from '../data/essays'
import { papers } from '../data/papers'

const REPO = 'matisyahuwolf-creator/initiation'
const SUBMIT_URL = `https://github.com/${REPO}/issues/new?template=submit-research.yml`

export default function Research() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p className="init-mono text-[11px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The research
        </p>
        <h1 className="mt-5 font-display text-[48px] font-medium leading-[1.05] tracking-tight sm:text-[72px]">
          Essays, papers, and notes — held in common.
        </h1>
        <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.7] text-[#222]">
          This is a working research commons, not a journal. Essays are
          published in the open and revised in public. Papers and external
          writing we are reading are listed below. Anyone can contribute.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-[13px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
          >
            Submit research
            <span aria-hidden>→</span>
          </a>
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 px-6 py-3 text-[13px] font-medium tracking-wide text-[#0a0a0a] transition hover:border-[#0a0a0a]/45"
          >
            View the repo
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Essays */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          Essays
        </div>
        <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight sm:text-[44px]">
          Long-form writing from the commons.
        </h2>

        <ul className="mt-12 divide-y divide-[#e8e6df] border-y border-[#e8e6df]">
          {essays.map((essay) => (
            <li key={essay.slug}>
              <Link
                to={`/research/${essay.slug}`}
                className="group block py-8 transition hover:bg-white"
              >
                <div className="grid gap-3 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <div className="init-mono pt-1 text-[11px] uppercase tracking-[0.25em] text-[#6b6b66]">
                    {essay.num}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-[26px] font-medium leading-[1.15] tracking-tight text-[#0a0a0a] transition group-hover:underline sm:text-[32px]">
                        {essay.title}
                      </h3>
                      {essay.draft && (
                        <span className="init-mono rounded-full border border-[#0a0a0a]/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] text-[#6b6b66]">
                          draft
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#3a3a35]">
                      {essay.abstract}
                    </p>
                    <p className="init-mono mt-3 text-[10px] uppercase tracking-[0.25em] text-[#6b6b66]">
                      {essay.author} · {essay.date} · {essay.reading}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[34rem] text-[14px] leading-[1.65] text-[#3a3a35]">
          More essays are in progress. If you are writing something that
          belongs here, open a pull request on the{' '}
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            repo
          </a>
          .
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Papers / external reading */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          Papers we are reading
        </div>
        <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight sm:text-[44px]">
          External writing the commons is in dialogue with.
        </h2>

        {papers.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[#0a0a0a]/15 bg-white p-8 text-center">
            <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
              The reading list is open
            </p>
            <p className="mx-auto mt-4 max-w-[28rem] text-[15px] leading-[1.65] text-[#222]">
              We have not seeded this yet on purpose. If a paper has shaped how
              you think about safety, consciousness, integration, or quantum —
              submit it and tell us why it matters.
            </p>
            <a
              href={SUBMIT_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[12px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
            >
              Submit a paper
            </a>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {papers.map((p) => (
              <li
                key={p.url}
                className="rounded-2xl border border-[#e8e6df] bg-white p-6"
              >
                <p className="init-mono text-[10px] uppercase tracking-[0.25em] text-[#6b6b66]">
                  {p.topic} · {p.year}
                </p>
                <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-tight">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    {p.title}
                  </a>
                </h3>
                <p className="mt-1 text-[13px] text-[#6b6b66]">
                  {p.authors} · {p.venue}
                </p>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#222]">
                  {p.why}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
