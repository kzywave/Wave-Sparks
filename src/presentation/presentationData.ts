import type {
  LandscapeIdea,
  RecommendedConcept,
  SlideDefinition,
} from './types'

export const SLIDES: SlideDefinition[] = [
  {
    id: 'title',
    index: 1,
    eyebrow: 'Wave Money · Mini App Strategy',
    title: 'Small Tools. Connected Value.',
    summary: 'Using Mini Apps to solve everyday money problems — while connecting what Wave already builds.',
    keyTakeaways: [
      'Focus on real customer utility before deep wallet integration.',
      'Connect existing campaigns, rewards, and Wave Points around customer goals.',
      'A low-dependency experimentation layer for product velocity.',
    ],
  },
  {
    id: 'why-mini-apps',
    index: 2,
    eyebrow: 'The Experimentation Layer',
    title: 'Why Mini Apps?',
    summary: 'We already possess a low-dependency foundation to test real customer problems.',
    keyTakeaways: [
      'Mini App framework already exists in production.',
      'Zero dependency on core wallet release cycles for MVP testing.',
      'AI-assisted development enables building prototypes in days.',
      'Quality rule: If we remove the WavePay logo, is it still useful?',
    ],
  },
  {
    id: 'idea-landscape',
    index: 3,
    eyebrow: 'Exploration Space',
    title: 'Opportunity Landscape',
    summary: '15 everyday money tools across three customer domains, evaluated by build dependency.',
    keyTakeaways: [
      'Save & Plan: 8 concepts helping customers manage future runway.',
      'Spend & Share: 5 concepts addressing social and group expenses.',
      'Safety & Trust: 2 concepts building pre-transfer confidence.',
      '3 high-conviction concepts prioritized for low-dependency validation.',
    ],
  },
  {
    id: 'recommended',
    index: 4,
    eyebrow: 'Priority Shortlist',
    title: 'Three Concepts to Test First',
    summary: 'High customer utility, low build friction, and natural pathways into WavePay actions.',
    keyTakeaways: [
      'Compact structure answering the 5 manager evaluation questions.',
      'Top 2 (Save for Something & Can I Afford This?) ready as interactive micro-apps.',
      'Every concept tests a specific behavioural hypothesis.',
    ],
  },
  {
    id: 'points-connection',
    index: 5,
    eyebrow: 'Rewards Architecture',
    title: 'Give the Reward a Purpose',
    summary: 'The incentive provides motivation; the Mini App gives that behaviour a personal purpose.',
    keyTakeaways: [
      'Wave Points rewards qualifying weekly balance behaviour.',
      'Customers save for personal milestones (phones, education, buffers), not abstract balance rules.',
      'Connecting goals to rewards turns a one-off promo into a recurring reason to return.',
    ],
  },
  {
    id: 'fragmentation',
    index: 6,
    eyebrow: 'Strategic Observation',
    title: 'We Do Not Have an Initiative Problem',
    summary: 'We have a connection problem. What is disconnected internally becomes visibly disconnected externally.',
    keyTakeaways: [
      'Internal initiatives (Promos, Points, Mini Apps, Cashback) are strong individually.',
      'To customers, uncoordinated initiatives feel like noise and disconnected banners.',
      'Mini Apps act as a cohesive tissue uniting utility and incentives.',
    ],
  },
  {
    id: 'connected-model',
    index: 7,
    eyebrow: 'System Blueprint',
    title: 'Connect Around the Customer Need',
    summary: 'Transitioning from campaign-led push to customer-need-led engagement loops.',
    keyTakeaways: [
      'Customer Need → Useful Mini App → Wave Action → Balance Behaviour → Reward → Progress.',
      'Mini Apps are not the center of WavePay; they are the lightweight connecting layer.',
      'Direct pathways into P2P transfers, merchant payments, and balance retention.',
    ],
  },
  {
    id: 'recommendation',
    index: 8,
    eyebrow: 'Action Plan',
    title: 'Start Small. Connect What Exists.',
    summary: 'Recommended experiment sequence and summary answers to the core evaluation questions.',
    keyTakeaways: [
      'Phase 1: Build & test Save for Something + Can I Afford This?.',
      'Phase 2: Money Calendar and Split It.',
      'Validate voluntary customer adoption first before investing in deep wallet plumbing.',
    ],
  },
]

export const LANDSCAPE_IDEAS: LandscapeIdea[] = [
  // Save & Plan
  {
    id: 'can-i-afford-this',
    name: 'Can I Afford This?',
    concept: 'Shows what a purchase means for the money a customer will have left after commitments.',
    category: 'Save & Plan',
    dependency: 'Very Low',
    isRecommended: true,
  },
  {
    id: 'my-money-plan',
    name: 'My Money Plan',
    concept: 'Lightweight weekly or monthly spending bucket allocation.',
    category: 'Save & Plan',
    dependency: 'Very Low',
  },
  {
    id: 'save-for-something',
    name: 'Save for Something',
    concept: 'Goal-based saving tracker with target amount, target date, and automated pace calculation.',
    category: 'Save & Plan',
    dependency: 'Very Low',
    isRecommended: true,
  },
  {
    id: 'saving-challenge',
    name: '30-Day Saving Challenge',
    concept: 'Gamified daily or weekly micro-saving challenge with visual streak progress.',
    category: 'Save & Plan',
    dependency: 'Very Low',
  },
  {
    id: 'emergency-builder',
    name: 'Emergency Money Builder',
    concept: 'Helps customers gradually build a 50,000 Ks or 100,000 Ks safety buffer.',
    category: 'Save & Plan',
    dependency: 'Very Low',
  },
  {
    id: 'money-calendar',
    name: 'Money Calendar',
    concept: 'Tracks upcoming bills, school fees, and recurring obligations before payday.',
    category: 'Save & Plan',
    dependency: 'Low',
    isRecommended: true,
  },
  {
    id: 'money-health-check',
    name: 'My Money Health Check',
    concept: 'Short 2-minute financial wellness checkup recommending one high-impact action.',
    category: 'Save & Plan',
    dependency: 'Very Low',
  },
  {
    id: 'money-coach',
    name: 'Money Coach',
    concept: 'Rules-based and AI-assisted everyday spending guidance and quick questions.',
    category: 'Save & Plan',
    dependency: 'Medium',
  },

  // Spend & Share
  {
    id: 'where-did-it-go',
    name: 'Where Did My Money Go?',
    concept: 'Simple spending summary and manual expense categorization.',
    category: 'Spend & Share',
    dependency: 'Low',
  },
  {
    id: 'split-it',
    name: 'Split It',
    concept: 'Instant bill splitting across people with direct per-person share amounts.',
    category: 'Spend & Share',
    dependency: 'Very Low',
  },
  {
    id: 'group-money',
    name: 'Group Money',
    concept: 'Shared expense ledger tracking who paid what and net balances.',
    category: 'Spend & Share',
    dependency: 'Very Low',
  },
  {
    id: 'how-much-to-send',
    name: 'How Much Should I Send?',
    concept: 'Reverse fee calculator to ensure recipient receives an exact net amount.',
    category: 'Spend & Share',
    dependency: 'Medium',
  },
  {
    id: 'goal-together',
    name: 'Goal Together',
    concept: 'Shared savings target for couples, friends, or family groups.',
    category: 'Spend & Share',
    dependency: 'Medium',
  },

  // Safety & Trust
  {
    id: 'scam-check',
    name: 'Scam Check',
    concept: 'Check suspicious payment requests or online offers against known red flags.',
    category: 'Safety & Trust',
    dependency: 'Medium',
  },
  {
    id: 'before-you-send',
    name: 'Before You Send',
    concept: 'A 3-second safety checklist before confirming large transfers.',
    category: 'Safety & Trust',
    dependency: 'Very Low',
  },
]

export const RECOMMENDED_CONCEPTS: RecommendedConcept[] = [
  {
    id: 'save-for-something',
    name: 'Save for Something',
    shortTag: 'Goal-based Saving',
    problem: 'Saving is abstract and difficult to sustain when not anchored to a concrete, emotional target.',
    opportunity: 'Turn balance retention into visible, milestone progress toward something the customer genuinely desires.',
    solution: 'Customer defines goal name, target amount, and timeline. The app calculates weekly saving targets and tracks visual progress.',
    whyNeeded: 'Gives customers a personal, meaningful reason to preserve funds in WavePay rather than viewing saving as a chore.',
    value: {
      customer: [
        'Tangible progress toward personal aspirations (phone, school fees, travel).',
        'Actionable weekly pace instead of vague monthly advice.',
      ],
      business: [
        'Naturally reinforces qualifying end-of-day balance retention.',
        'Provides a compelling personal use case for Wave Points rewards.',
        'High organic repeat engagement.',
      ],
    },
    dependency: 'Very Low',
    targetDiscussionTime: '30s',
  },
  {
    id: 'can-i-afford-this',
    name: 'Can I Afford This?',
    shortTag: 'Purchase Trade-off Calculator',
    problem: 'Wallet balance shows current funds, but gives zero foresight on whether a purchase today triggers hardship before next payday.',
    opportunity: 'Make the financial trade-off transparent: "If I spend this now, what will I have left for upcoming days and commitments?"',
    solution: 'Customer inputs current funds, upcoming obligations, and purchase cost. The tool displays remaining funds and daily safe spending buffer.',
    whyNeeded: 'Customers do not just ask "How much is in my account?"—they need to know "Will I be okay if I buy this right now?"',
    value: {
      customer: [
        'Immediate peace of mind and confident purchasing decisions.',
        'Prevents accidental pre-payday cash shortfalls.',
      ],
      business: [
        'Frequent return utility triggered at key moments of spend intent.',
        'Direct springboard into bill payments or micro-financing products.',
      ],
    },
    dependency: 'Very Low',
    targetDiscussionTime: '30s',
  },
  {
    id: 'money-calendar',
    name: 'Money Calendar',
    shortTag: 'Upcoming Obligations Map',
    problem: 'Customers see money in their wallet today and spend it, forgetting upcoming bills due in 5–10 days.',
    opportunity: 'Make future commitments visible so customers reserve necessary funds before spending on impulse.',
    solution: 'Simple list and calendar showing upcoming rent, phone bills, loan repayments, and school fees with a total "committed money" counter.',
    whyNeeded: 'Current balance is deceptive if significant recurring liabilities are due in the immediate days ahead.',
    value: {
      customer: [
        'Zero surprise bills; clear clarity on truly available spending money.',
        'Timely reminders before due dates.',
      ],
      business: [
        'Scheduled recurring opens throughout the month.',
        'Natural channel to automate WavePay utility/bill settlement.',
      ],
    },
    dependency: 'Low',
    targetDiscussionTime: '25s',
  },
]

export interface InternalInitiative {
  id: string
  team: string
  initiative: string
  description: string
  customerSymptom: string
  symptomDetail: string
}

export const INITIATIVE_MAPPINGS: InternalInitiative[] = [
  {
    id: 'points',
    team: 'Loyalty & Retention',
    initiative: 'Wave Points Balance Tiers',
    description: 'Weekly Monday–Sunday qualification tracking 7/7 balance snapshots to unlock reward claims.',
    customerSymptom: 'End-of-week points notification',
    symptomDetail: '"You have 1,200 points waiting! Claim before Sunday 23:59 or lose tier progress."',
  },
  {
    id: 'promo',
    team: 'Marketing Campaigns',
    initiative: 'Friday Cashback Blitz',
    description: 'Transaction incentive offering 500 Ks instant cashback on merchant QR transactions.',
    customerSymptom: 'Splash banner on app open',
    symptomDetail: '"⚡ Friday Flash! Scan QR to get 500 Ks cashback today only!"',
  },
  {
    id: 'partners',
    team: 'Partnerships',
    initiative: 'Telco Data Pack Discount',
    description: 'Co-branded campaign with telecommunications partner for mobile top-up bundles.',
    customerSymptom: 'Inbox promo message',
    symptomDetail: '"Get +25% bonus GB when buying your data package through WavePay."',
  },
  {
    id: 'gamification',
    team: 'Engagement Team',
    initiative: 'Lucky Wheel Spin',
    description: 'Daily login gamification wheel to increase daily active user counts.',
    customerSymptom: 'Floating overlay badge',
    symptomDetail: '"Spin & Win! Tap the floating gold wheel to win daily mystery coins!"',
  },
  {
    id: 'merchant',
    team: 'Merchant Acquisition',
    initiative: 'Food & Dining Week',
    description: 'Promotion of local restaurant network offering discounts on food bills.',
    customerSymptom: 'Carousel banner 3 of 6',
    symptomDetail: '"Hungry? Save 10% when dining at 150+ selected merchants in Yangon."',
  },
  {
    id: 'acquisition',
    team: 'Growth',
    initiative: 'Referral Cash Bonus',
    description: 'P2P referral incentive paying both inviter and invitee on first transfer.',
    customerSymptom: 'Home screen card popup',
    symptomDetail: '"Invite your friends! Send 1,000 Ks and both get 1,000 Ks bonus."',
  },
  {
    id: 'financial',
    team: 'Financial Services',
    initiative: 'Micro-Insurance Promo',
    description: 'Health and emergency micro-coverage awareness campaign.',
    customerSymptom: 'Push alert mid-afternoon',
    symptomDetail: '"Protect your family today. Coverage starts at just 300 Ks per day."',
  },
  {
    id: 'mini-apps',
    team: 'Mini App Platform',
    initiative: 'New Mini App Portal',
    description: 'Showcasing third-party gaming and lifestyle mini programs inside WavePay.',
    customerSymptom: 'Grid icon with red unread dot',
    symptomDetail: '"Explore 20+ exciting games and lifestyle tools inside Mini Apps!"',
  },
]

export const HOMEWORK_SUMMARY = [
  {
    question: '1. What customer problem or pain point are we trying to solve?',
    answer:
      'Everyday money decisions (deciding if a purchase is safe, saving for a milestone, planning bills) are not solved by transaction-only screens. Without tools, saving feels abstract and balance quickly drains.',
  },
  {
    question: '2. What opportunity have we identified?',
    answer:
      'Mini Apps provide a lightweight, existing experimentation canvas that can be deployed without heavy core wallet backend dependencies, testing real customer utility in days.',
  },
  {
    question: '3. What is the proposed idea or solution?',
    answer:
      'Launch focused micro-utilities (starting with "Save for Something" and "Can I Afford This?") that solve one immediate financial question and naturally connect into Wave actions.',
  },
  {
    question: '4. Why is this needed?',
    answer:
      'Wave already invests heavily in promotions, cashback, and Wave Points. Mini Apps give those incentives a personal customer purpose, connecting disjointed initiatives into a coherent journey.',
  },
  {
    question: '5. What business & customer value do we expect?',
    answer:
      'Hypothesis: Higher voluntary return frequency, stronger qualifying balance retention, increased P2P/merchant transfer initiation, and better ROI on existing rewards spend.',
  },
]
