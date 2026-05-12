import { useEffect, useState } from 'react'

const REPO = 'matisyahuwolf-creator/initiation'
const DISCUSSIONS_URL = `https://github.com/${REPO}/discussions`
const NEW_DISCUSSION_URL = `https://github.com/${REPO}/discussions/new/choose`
const SUBMIT_RESEARCH_URL = `https://github.com/${REPO}/issues/new?template=submit-research.yml`
const SUBMIT_QUESTION_URL = `https://github.com/${REPO}/issues/new?template=open-question.yml`

type Activity = {
  id: number
  type: 'issue' | 'pr'
  title: string
  user: string
  date: string
  url: string
  state: string
}

export default function Community() {
  const [activity, setActivity] = useState<Activity[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(
      `https://api.github.com/repos/${REPO}/issues?state=all&per_page=10&sort=updated`,
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(
        (
          rows: Array<{
            id: number
            number: number
            title: string
            html_url: string
            pull_request?: unknown
            state: string
            updated_at: string
            user: { login: string } | null
          }>,
        ) => {
          if (cancelled) return
          setActivity(
            rows.map((r) => ({
              id: r.id,
              type: r.pull_request ? 'pr' : 'issue',
              title: r.title,
              user: r.user?.login ?? 'someone',
              date: r.updated_at,
              url: r.html_url,
              state: r.state,
            })),
          )
        },
      )
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p className="init-mono text-[11px] uppercase tracking-[0.35em] text-[#6b6b66]">
          The commons
        </p>
        <h1 className="mt-5 font-display text-[48px] font-medium leading-[1.05] tracking-tight sm:text-[72px]">
          A place to read, write, and think together.
        </h1>
        <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.7] text-[#222]">
          Initiation is held in common. There is no app to log into, no
          private channel. The work happens in the open, on GitHub —
          essays in the repo, conversation in Discussions, contributions as
          pull requests. The medium is the message: open-source, attributed,
          archived, free.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Three doors */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          Three doors
        </div>
        <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight sm:text-[44px]">
          Choose the one that fits.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#e8e6df] md:grid-cols-3">
          {[
            {
              num: '01',
              title: 'Discuss',
              body:
                'Open a thread. Respond to an essay. Disagree in public, with attribution. Discussions are the conversation layer.',
              cta: 'Open a thread',
              href: NEW_DISCUSSION_URL,
              secondary: { label: 'See all discussions', href: DISCUSSIONS_URL },
            },
            {
              num: '02',
              title: 'Share research',
              body:
                'Submit a paper, essay, or finding the commons should be reading. We curate by relevance, not credential.',
              cta: 'Submit research',
              href: SUBMIT_RESEARCH_URL,
            },
            {
              num: '03',
              title: 'Ask a question',
              body:
                'Open questions are the engine. Post one — even, especially, the ones that feel naive. The naive ones are the ones we have not asked enough.',
              cta: 'Ask',
              href: SUBMIT_QUESTION_URL,
            },
          ].map((d) => (
            <article
              key={d.num}
              className="flex flex-col bg-[#fafaf7] p-8 transition hover:bg-white sm:p-10"
            >
              <p className="init-mono text-[11px] uppercase tracking-[0.25em] text-[#6b6b66]">
                {d.num}
              </p>
              <h3 className="mt-5 font-display text-[26px] font-medium leading-tight tracking-tight text-[#0a0a0a]">
                {d.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#3a3a35]">
                {d.body}
              </p>
              <div className="mt-6 flex flex-col items-start gap-2">
                <a
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-[12px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
                >
                  {d.cta} →
                </a>
                {d.secondary && (
                  <a
                    href={d.secondary.href}
                    target="_blank"
                    rel="noreferrer"
                    className="init-mono text-[10px] uppercase tracking-[0.25em] text-[#6b6b66] transition hover:text-[#0a0a0a]"
                  >
                    {d.secondary.label} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* Recent activity */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          Recent activity
        </div>
        <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight sm:text-[44px]">
          What the commons is working on.
        </h2>
        <p className="mt-6 max-w-[34rem] text-[15px] leading-[1.7] text-[#222]">
          Pulled live from the repo. Issues, pull requests, and submissions
          appear here as they come in.
        </p>

        <div className="mt-10">
          {error ? (
            <div className="rounded-2xl border border-[#e8e6df] bg-white p-6 text-[14px] text-[#6b6b66]">
              Could not reach GitHub right now. Try{' '}
              <a
                href={DISCUSSIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                opening Discussions directly
              </a>
              .
            </div>
          ) : activity === null ? (
            <div className="rounded-2xl border border-[#e8e6df] bg-white p-6 text-[14px] text-[#6b6b66]">
              Loading…
            </div>
          ) : activity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#0a0a0a]/15 bg-white p-8 text-center">
              <p className="init-mono text-[10px] uppercase tracking-[0.3em] text-[#6b6b66]">
                The commons is quiet
              </p>
              <p className="mx-auto mt-4 max-w-[26rem] text-[15px] leading-[1.65] text-[#222]">
                Be the first thread. Open a question, share a paper, or
                respond to the manifesto.
              </p>
              <a
                href={NEW_DISCUSSION_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[12px] font-medium tracking-wide text-[#fafaf7] transition hover:bg-[#1a1a1a]"
              >
                Begin
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-[#e8e6df] border-y border-[#e8e6df]">
              {activity.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block py-5 transition hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <span className="init-mono inline-flex items-center rounded-full border border-[#0a0a0a]/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] text-[#6b6b66]">
                        {a.type === 'pr' ? 'PR' : a.state}
                      </span>
                      <p className="flex-1 truncate font-display text-[20px] font-medium tracking-tight transition group-hover:underline">
                        {a.title}
                      </p>
                    </div>
                    <p className="init-mono mt-1 text-[10px] uppercase tracking-[0.25em] text-[#6b6b66]">
                      {a.user} · {new Date(a.date).toLocaleDateString()}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="init-rule h-px" />
      </div>

      {/* How the commons works */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="init-mono mb-6 text-[10px] uppercase tracking-[0.35em] text-[#6b6b66]">
          How the commons works
        </div>
        <h2 className="font-display text-[32px] font-medium leading-[1.15] tracking-tight sm:text-[44px]">
          One mechanism, many entry points.
        </h2>

        <ol className="mt-12 space-y-10">
          {[
            {
              n: 'I.',
              title: 'Everything is public',
              body:
                'Essays, discussions, papers, the source of this site itself — all published in the open, version-controlled, attributed. There is no private channel. If you cannot see the work, it is not in the commons.',
            },
            {
              n: 'II.',
              title: 'Nobody owns it',
              body:
                'There is no equity, no proprietary output, no closed model. Initiation is unowned by design. The license is permissive; the work belongs to whoever extends it.',
            },
            {
              n: 'III.',
              title: 'Contribution is the credential',
              body:
                'There is no gatekeeping by title. What you have written, submitted, or discussed in the open is what counts. The naive question and the rigorous proof are both welcome — the commons distinguishes them by reading, not by reputation.',
            },
          ].map((row) => (
            <li
              key={row.title}
              className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-8"
            >
              <div className="font-display text-[28px] font-medium leading-none text-[#6b6b66]">
                {row.n}
              </div>
              <div>
                <h3 className="font-display text-[24px] font-medium leading-tight tracking-tight">
                  {row.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#222]">
                  {row.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
