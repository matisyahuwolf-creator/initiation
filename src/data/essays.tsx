import type { ReactNode } from 'react'

export type Essay = {
  slug: string
  num: string
  title: string
  subtitle: string
  author: string
  date: string
  reading: string
  draft?: boolean
  abstract: string
  body: ReactNode
}

export const essays: Essay[] = [
  {
    slug: 'initiation-as-civilizational-threshold',
    num: '01',
    title: 'Initiation as a Civilizational Threshold',
    subtitle: 'A first-principles note from the commons',
    author: 'The commons',
    date: '2026-05-12',
    reading: '6 min',
    draft: true,
    abstract:
      'Why the safe development of AI is not, at root, a technical problem — and what older cultures knew about crossing thresholds that we are about to need.',
    body: (
      <>
        <p>
          The conversation about AI safety, as it is conducted in 2026, is
          almost entirely a conversation about systems — about evaluation
          benchmarks, alignment techniques, deployment policies, regulatory
          regimes. These are necessary. They are not, by themselves,
          sufficient. The thing this essay wants to say is that they are not
          sufficient because the question of safety is not, at its root, a
          technical question.
        </p>
        <p>
          To say that is not to dismiss the technical work. The technical work
          is some of the most important work being done anywhere. It is to
          say something subtler: that the technical work sits inside a larger
          question that very few of the people doing it have the practice to
          ask. The question is{' '}
          <em>what does it mean to bring something across a threshold safely.</em>
        </p>
        <h3>The older word</h3>
        <p>
          Initiation, in the older sense, is the rite by which a culture
          brought a person across a threshold safely. A child became an
          adult. A novice became a member. A patient became well. Every
          long-lived culture had some version of this — and the structure
          was always the same: a period of preparation, an encounter with
          something larger than the self, and a return, changed, into the
          community.
        </p>
        <p>
          The shape mattered. Without preparation, the encounter is
          shattering. Without an encounter, there is no real change. Without
          a return, the person is lost in the encounter and does not come
          back. Every step is required. Older cultures knew that the
          missing step is what produces the wound.
        </p>
        <blockquote>
          We are, as a species, in the encounter without the preparation.
          And nobody has thought seriously about the return.
        </blockquote>
        <h3>What Jung saw</h3>
        <p>
          A hundred years ago Carl Jung made a claim that has aged unusually
          well: that the modern West had built an outer civilization of
          enormous power while losing access to the inner work that older
          cultures kept alive. He was not pitting East against West as
          geographies. He was describing two functions inside every person
          — an outer, mechanistic, world-shaping function, and an inner,
          contemplative, world-receiving one — and arguing that we had
          severed them.
        </p>
        <p>
          The civilization that built AI is, predictably, the half of the
          human picture most cut off from the inner question. This is not
          an indictment. It is a description. The engineers building the
          most powerful technology in history are the inheritors of the
          tradition with the least practice in what it means to encounter
          something larger than oneself and not be deranged by it. They are
          asking, correctly, how to keep the system aligned. They are not,
          for the most part, asking what they themselves are being aligned
          to.
        </p>
        <h3>Why this matters now</h3>
        <p>
          Here is the operational consequence. If safety is only treated as
          a property of the system, then the work is to constrain the
          system. If safety is also treated as a property of the
          relationship between the system and the people building and
          deploying it, then the work is also to mature those people. The
          first is necessary. The second is what older cultures called
          initiation, and it is what we have almost no infrastructure for.
        </p>
        <p>
          The commons exists in the gap between those two sentences.
        </p>
        <h3>Three braided questions</h3>
        <p>
          Initiation, as a research commons, treats three questions as
          inseparable.{' '}
          <em>What does it mean to deploy intelligence safely</em> into a
          world that is itself out of balance.{' '}
          <em>What is the thing we are actually trying to align AI to</em> —
          and is AI itself the instrument by which we might finally study it.{' '}
          <em>What does a mature, balanced perspective look like</em> — in a
          person, in a lab, in a civilization — and how do we initiate
          ourselves into it.
        </p>
        <p>
          You cannot make progress on the first without the other two. You
          cannot make progress on any of them alone.
        </p>
        <h3>A commons, not a lab</h3>
        <p>
          The work has to be common. AI safety is the first problem in
          human history that admits no winner — a safe outcome is not
          something any single lab, company, or country can ship. It is a
          property of the whole. So Initiation is free, open-source, and
          unowned. The research, the writing, the questions themselves —
          held in common. The contribution is the work. There is nothing
          to buy and no equity to give up.
        </p>
        <p>
          This is the first essay. There will be more. If something here
          resonates, write the next one with us.
        </p>
      </>
    ),
  },
]
