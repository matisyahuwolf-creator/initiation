export type Paper = {
  title: string
  authors: string
  venue: string
  year: string
  url: string
  why: string
  topic: 'Safety' | 'Consciousness' | 'Integration' | 'Quantum'
}

export const papers: Paper[] = []
