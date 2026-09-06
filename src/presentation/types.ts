export type SlideId =
  | 'title'
  | 'why-mini-apps'
  | 'idea-landscape'
  | 'recommended'
  | 'points-connection'
  | 'fragmentation'
  | 'connected-model'
  | 'recommendation'

export type IdeaCategory = 'Save & Plan' | 'Spend & Share' | 'Safety & Trust'
export type DependencyLevel = 'Very Low' | 'Low' | 'Medium'

export interface LandscapeIdea {
  id: string
  name: string
  concept: string
  category: IdeaCategory
  dependency: DependencyLevel
  isRecommended?: boolean
}

export interface ValueHypothesis {
  customer: string[]
  business: string[]
}

export interface RecommendedConcept {
  id: string
  name: string
  shortTag: string
  problem: string
  opportunity: string
  solution: string
  whyNeeded: string
  value: ValueHypothesis
  dependency: DependencyLevel
  targetDiscussionTime: string
}

export interface SlideDefinition {
  id: SlideId
  index: number
  title: string
  eyebrow: string
  summary: string
  keyTakeaways: string[]
}
