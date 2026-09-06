# Mini App Opportunity Presentation — Antigravity Build Brief

## 0. Source Repository

Build from the existing boilerplate:

- Repository: `https://github.com/kzywave/pwa-prototype-boilerplate`
- Primary presentation route: `/showcase`
- Core presentation file: `src/pages/ShowcasePage.tsx`
- Main styling: `src/styles.css`
- Shared configuration: `src/config.ts`
- Existing reusable pieces:
  - `src/components/Brand.tsx`
  - `src/components/DeviceFrame.tsx`
  - `src/components/PreviewSizeControl.tsx`
  - `src/ShellConfigContext.tsx`

The repository is already a React + TypeScript + Vite stakeholder prototype shell. Do **not** redesign it into a traditional PowerPoint-like website.

Use the existing `/showcase` experience as the design foundation.

---

# 1. What We Are Building

Create a **short interactive presentation inside `/showcase`** for a manager brainstorming session.

The presentation explores:

1. Customer problems that could be solved through Wave Mini Apps.
2. Low-dependency ideas that can be built and tested quickly.
3. A shortlist of recommended concepts.
4. How savings-related concepts could connect to the existing Wave Points / balance-based rewards programme.
5. A broader strategic observation:
   - Wave already runs many promotions, rewards and initiatives.
   - Internally, these initiatives can feel disconnected.
   - That fragmentation becomes visible to customers externally.
6. The opportunity to use Mini Apps as a lightweight layer that connects customer needs, Wave actions, promotions and rewards.

This is **not** a long strategy deck.

The ideas should be presented rapidly.

---

# 2. Original Homework — Must Be Answered

The presentation must clearly cover the manager's five questions:

1. **What customer problem or pain point are we trying to solve?**
2. **What opportunity have we identified?**
3. **What is the proposed idea or solution?**
4. **Why is this needed?**
5. **What business or customer value do we expect to achieve?**

Do not create a separate long answer for every idea.

For the five recommended ideas, surface these five questions as a compact repeatable structure.

Expected value should be framed as a **hypothesis to test**, not as a guaranteed outcome.

---

# 3. Main Thesis

Use this as the north star for the presentation:

> Wave already has many useful campaigns, rewards and services. Mini Apps give us a low-dependency way to solve real customer problems while connecting those existing pieces into experiences that feel coherent and useful to customers.

Shorter presentation line:

> **Small tools. Connected value.**

---

# 4. Core Strategic Observation

The deck should build toward this statement:

> **We do not have an initiative problem. We have a connection problem.**

Wave already invests effort and budget into things such as:

- promotions
- rewards
- Wave Points
- transaction incentives
- acquisition campaigns
- retention mechanics
- merchant activities
- partner campaigns
- Mini Apps
- financial services

The opportunity is **not simply to create another promotion or another Mini App**.

The opportunity is to connect existing pieces around actual customer needs.

Core analogy:

> **What feels disconnected internally becomes visibly disconnected externally.**

Do not blame teams.

Frame this as a system/design opportunity.

---

# 5. Why Mini Apps

Mini Apps are the proposed experimentation layer because:

- the framework already exists
- dependency on the core wallet can be lower
- experiments can be smaller
- delivery can be faster
- concepts can be built independently
- AI-assisted development can accelerate prototypes
- useful concepts can later integrate more deeply with WavePay

Mini Apps are **the delivery mechanism**, not the customer problem.

Always lead with customer utility.

---

# 6. Opportunity Filter

A Mini App concept is worth exploring when it meets most of these criteria:

### 1. Real customer utility

It solves an everyday problem a customer already has.

### 2. Standalone usefulness

The first version can still be useful without deep core-wallet integration.

### 3. Low dependency

It can be built and tested without requiring many teams or backend changes.

### 4. Repeat-use potential

There is a natural reason for the customer to return.

### 5. Natural Wave connection

Over time, it can connect to:

- payments
- transfers
- wallet balance
- Wave Points
- rewards
- merchant payments
- retention

Quality test:

> **If we removed the WavePay logo, would customers still find this useful?**

If not, it may be a campaign mechanism rather than a genuine customer utility.

---

# 7. Idea Landscape

Show all ideas quickly.

Do not deeply explain these on the first pass.

Use dependency labels:

- `Very Low`
- `Low`
- `Medium`

Suggested grouping:

## Save & Plan

| Idea | Mini App concept | Dependency |
|---|---|---|
| **Can I Afford This?** | Shows what a purchase means for the money a customer will have left | Very Low |
| **My Money Plan** | Lightweight weekly or monthly budgeting | Very Low |
| **Save for Something** | Goal-based saving tracker with target amount, date and contribution plan | Very Low |
| **30-Day Saving Challenge** | Gamified daily or weekly saving challenge | Very Low |
| **Emergency Money Builder** | Helps customers gradually build an emergency buffer | Very Low |
| **Money Calendar** | Track upcoming bills, fees and recurring expenses | Low |
| **My Money Health Check** | Short financial wellness assessment with practical next actions | Very Low |
| **Money Coach** | Rules-based or AI-assisted everyday money guidance | Low / Medium |

## Spend & Share

| Idea | Mini App concept | Dependency |
|---|---|---|
| **Where Did My Money Go?** | Simple spending summary and manual expense categorisation | Low |
| **Split It** | Split a bill equally or unevenly across people | Very Low |
| **Group Money** | Track shared expenses and who owes whom | Very Low |
| **How Much Should I Send?** | Reverse fee calculator to reach an exact received amount | Medium |
| **Goal Together** | Shared savings target for friends or family | Medium |

## Safety & Trust

| Idea | Mini App concept | Dependency |
|---|---|---|
| **Scam Check** | Check suspicious payment requests, messages or offers for warning signs | Medium |
| **Before You Send** | Quick pre-transfer safety checklist | Very Low |

---

# 8. Recommended Concepts

Prioritise these five:

1. **Save for Something**
2. **Can I Afford This?**
3. **Money Calendar**
4. **Split It**
5. **My Money Health Check**

Do **not** turn them into five long presentation chapters.

On the presentation, treat them as one interactive recommendation section where the presenter can switch between concepts quickly.

Target: roughly **15–30 seconds per concept**.

---

# 9. Recommended Concept Content

Use the same compact structure for each recommended concept:

- Customer problem
- Opportunity
- Proposed Mini App
- Why needed
- Expected customer/business value
- Dependency

## 9.1 Save for Something

**Customer problem**

Saving is abstract and difficult to maintain when there is no concrete target.

**Opportunity**

Turn saving into visible progress toward something the customer actually wants or needs.

**Proposed Mini App**

Customer enters:

- what they are saving for
- target amount
- target date

The Mini App calculates:

- required weekly contribution
- progress
- amount remaining

Example goals:

- phone
- school fees
- emergency fund
- trip
- motorbike
- home purchase item

**Why needed**

A concrete goal gives customers a personal reason to maintain money rather than presenting saving only as a generic financial habit.

**Expected value hypothesis**

Customer:
- clearer saving behaviour
- visible progress
- practical financial planning

Business:
- repeat engagement
- stronger balance-retention opportunity
- natural Wave Points connection

**Dependency**

`Very Low` for standalone MVP.

---

## 9.2 Can I Afford This?

**Customer problem**

A wallet balance tells customers what they have now, but not whether spending today will create a problem later.

**Opportunity**

Help customers answer:

> **If I buy this now, will I still be okay later?**

**Proposed Mini App**

Customer enters:

- available money
- next payday / planning period
- upcoming expenses
- desired purchase

Output examples:

- `You will have 82,000 Ks left for the next 8 days.`
- `This purchase uses most of the money remaining after your upcoming bills.`

Avoid pretending the app can objectively decide whether a purchase is "good" or "bad".

It should make the trade-off visible.

**Why needed**

The customer's real decision is often not "How much do I have?" but "What happens if I spend this?"

**Expected value hypothesis**

Customer:
- better financial visibility
- more confident decisions
- repeat utility

Business:
- increased engagement
- potential balance-retention connection
- future pathway into relevant Wave services

**Dependency**

`Very Low`.

---

## 9.3 Money Calendar

**Customer problem**

Customers may have money today but forget obligations that are coming later.

**Opportunity**

Make upcoming financial commitments visible before money is spent elsewhere.

**Proposed Mini App**

Simple calendar/list for:

- rent
- internet
- phone
- school fees
- subscriptions
- loan repayment
- family commitments
- other recurring payments

Useful summary:

> **Money needed before next payday: 515,000 Ks**

Potential later enhancement:

> **Safe-to-spend amount after upcoming commitments**

**Why needed**

Current balance is not necessarily the same as money that is truly available to spend.

**Expected value hypothesis**

Customer:
- planning
- fewer forgotten commitments
- better visibility

Business:
- recurring Mini App usage
- future bill/payment integration
- potential retention value

**Dependency**

`Low`.

---

## 9.4 Split It

**Customer problem**

Shared expenses require manual calculation and follow-up.

**Opportunity**

Turn a common social money task into a very small utility.

**Proposed Mini App**

- enter bill total
- enter people
- split equally or unevenly
- show what each person owes

Later:

- `Pay with WavePay`
- `Request with WavePay`

**Why needed**

This solves an immediate everyday problem and has a direct path into P2P transactions.

**Expected value hypothesis**

Customer:
- convenience
- easier group payment coordination

Business:
- P2P transaction opportunity
- repeat social utility
- low-cost experiment

**Dependency**

`Very Low` for calculation.

Higher only when payment/request integration is added.

---

## 9.5 My Money Health Check

**Customer problem**

Generic financial education does not tell a customer which behaviour matters most for them right now.

**Opportunity**

Turn financial education into one personalised next action.

**Proposed Mini App**

A short assessment around:

- running out of money before payday
- emergency buffer
- awareness of monthly spending
- saving habit
- upcoming obligations

Output should be human, not overly clinical.

Example:

> **Unexpected expenses are your biggest risk right now.**

Then:

> **One thing to try this week: put 20,000 Ks aside before spending on non-essential items.**

**Why needed**

Advice becomes more useful when it is specific and actionable.

**Expected value hypothesis**

Customer:
- financial awareness
- clearer next action
- trust

Business:
- engagement
- service discovery
- potential connection into savings/rewards journeys

**Dependency**

`Very Low` for rules-based MVP.

---

# 10. Wave Points Context — Background Only, Not a Presentation Topic

Antigravity should understand the current Wave Points / Wave Pocket Points programme so the presentation does not contradict it.

**Important:** This section is implementation/background context only.  
Do **not** turn it into a detailed Wave Points slide or explain the programme mechanics unless needed to support the Mini App idea.

## Current working programme context

At a high level:

- Wave Pocket Points is a **balance-driven loyalty programme**.
- The working qualification cycle is a shared **Monday–Sunday Myanmar-time week**.
- Qualification uses **7 of 7 daily end-of-day balance snapshots**, captured at 23:59.
- Intraday highs/lows do not determine qualification.
- Customers also need to complete the configured eligible transaction requirement.
- Tier progression is sequential; customers do not skip tiers.
- Weekly outcomes distinguish between:
  - maintaining the current tier
  - stepping up to the assigned next tier
- Step-up and maintenance do not normally stack in the same cycle.
- Rewards are claimed manually in the Mini App.
- Claimed points can later be used in eligible payment journeys.
- The current working point-payment direction uses **1 Point = 1 Cash Unit**, while the exact cash-unit definition is still an open decision.

The current working tier model is:

`Starter → Silver → Gold → Platinum → Diamond`

Do not expose detailed thresholds, reward amounts, grace logic, cooldown rules, caps, expiry or claim-state mechanics in this presentation unless they are directly needed.

## How the Mini App ideas should connect conceptually

The Wave Points programme already answers a question like:

> **What incentive do I get for maintaining qualifying balance behaviour?**

A Mini App such as **Save for Something** can answer a different question:

> **What personal goal am I trying to make progress toward?**

That is the connection this presentation should make.

Use the idea:

> **The reward mechanic provides an incentive.  
> The Mini App can give that behaviour a personal purpose.**

Possible conceptual journey:

`Personal saving goal`
→
`Plan how much money to keep aside`
→
`Maintain qualifying balance behaviour`
→
`Complete eligible activity`
→
`Earn Wave Points`
→
`Continue progressing toward the goal`

This is a **future connection opportunity**, not a claim that the current Wave Points product already allocates points directly into savings goals.

## Guardrails for the presentation

Do not:

- make Wave Points the main topic
- show the full state machine
- explain all tiers
- present illustrative reward values as final economics
- say points determine tier
- say a customer can skip tiers
- say a points-funded transaction counts as the weekly qualifying transaction
- imply saving-goal allocation already exists
- state `1 Point = 1 MMK` as an approved rule; use the working wording `1 Point = 1 Cash Unit` if conversion is mentioned at all

For Slide 5, keep the Wave Points connection intentionally high-level.

The audience should understand only:

**personal goal → useful balance behaviour → existing reward mechanic → more meaningful reason to return**

# 11. Bigger Theme — Disconnected Internally, Disconnected Externally

Use one strong visual.

## Internal view

Show separate initiative blocks such as:

- Promotions
- Wave Points
- Mini Apps
- Merchant campaigns
- Acquisition
- Retention
- Partner campaigns
- Transactions

They are individually useful but visually disconnected.

## Customer view

Show what that can become externally:

`Banner`
→
`Offer`
→
`Campaign`
→
`Reward`
→
`Another Mini App`
→
`Another banner`

No persistent customer story connects them.

Core statement:

> **What is disconnected internally becomes visibly disconnected externally.**

Do not claim there is zero coordination internally.

This is a design/system observation, not an organisational accusation.

---

# 12. Connected Opportunity

Show a before/after model.

## Promotion-led pattern

`Promotion`
→
`Banner`
→
`Transaction`
→
`Reward`
→
`End`

## Customer-need-led pattern

`Customer need`
→
`Useful Mini App`
→
`Relevant Wave action`
→
`Transaction / balance behaviour`
→
`Reward`
→
`Progress toward something meaningful`
→
`Return`

Examples:

### Save for Something

`Personal goal`
→
`Maintain balance`
→
`Wave Points`
→
`Goal progress`

### Money Calendar

`Upcoming bill`
→
`Prepare money`
→
`Pay through Wave`
→
`Record completed`

### Split It

`Shared bill`
→
`Calculate`
→
`Wave transfer / request`

### Money Health Check

`Identify gap`
→
`Recommended action`
→
`Relevant Mini App / Wave service`

---

# 13. Recommended Presentation Structure

Target **8 main slides**.

The presentation should feel fast and conversational.

## Slide 1 — Small Tools. Connected Value.

Main line:

> **Small tools. Connected value.**

Supporting copy:

Using Mini Apps to solve useful everyday money problems — and connect more of what Wave already does.

Keep this slide minimal.

---

## Slide 2 — Why Mini Apps?

Headline:

> **We already have a low-dependency way to experiment.**

Show 4 reasons:

- Existing framework
- Smaller scope
- Less core dependency
- Faster build/test loop

Secondary line:

> Solve the customer problem first. Integrate deeper only after the utility proves itself.

---

## Slide 3 — Opportunity Landscape

Show all ideas from Section 7.

This should be the densest slide.

Recommended presentation:

- grouped by `Save & Plan`, `Spend & Share`, `Safety & Trust`
- compact cards or rows
- one-line concept
- dependency badge
- recommended ideas visually marked

Do not read every description aloud.

Move through this slide rapidly.

---

## Slide 4 — Five Ideas Worth Exploring First

This should be **interactive inside one presentation slide**.

Do not create five separate main slides.

Use a concept selector:

1. Save for Something
2. Can I Afford This?
3. Money Calendar
4. Split It
5. My Money Health Check

Selecting a concept updates the main stage.

For each selection, show:

- small Mini App visual or simple mock
- problem
- opportunity
- idea
- why
- value
- dependency

This section should support rapid switching.

### Recommended default selection

`Save for Something`

---

## Slide 5 — Give the Reward a Purpose

Headline:

> **The reward mechanic provides the incentive. The Mini App can give that behaviour a personal purpose.**

Use **Save for Something** as the clearest example.

Main visual:

`Personal goal`
→
`Plan what to keep aside`
→
`Qualifying balance behaviour`
→
`Eligible activity`
→
`Wave Points`
→
`Continue toward the goal`

Keep this slide deliberately high-level.

Do **not** explain:

- tier thresholds
- reward amounts
- the full weekly state machine
- grace / downgrade mechanics
- claim lifecycle
- point expiry
- payment-burning rules

The Wave Points programme is context for the idea, not the subject of the presentation.

---

## Slide 6 — We Do Not Have an Initiative Problem

Headline:

> **We do not have an initiative problem. We have a connection problem.**

Show disconnected internal initiative blocks.

Then reveal the customer-facing consequence.

Supporting statement:

> **What is disconnected internally becomes visibly disconnected externally.**

This is the conceptual turning point of the presentation.

---

## Slide 7 — Connect Around the Customer Need

Show the connected journey:

`Customer Need`
→
`Useful Tool`
→
`Relevant Wave Action`
→
`Transaction / Balance`
→
`Reward`
→
`Meaningful Progress`
→
`Return`

Use 2–3 mini examples underneath.

Do not position Mini Apps as the centre of WavePay.

They are one lightweight connecting layer.

---

## Slide 8 — Start Small

Headline:

> **Start small. Connect what already exists.**

Recommendation:

### First experiments

1. **Save for Something**
2. **Can I Afford This?**

Why:

- very low dependency
- independently buildable
- clear customer utility
- easy to prototype with AI
- strong connection to existing Wave Points / balance-retention work

### Secondary experiments

- Money Calendar
- Split It
- My Money Health Check

End with the original homework summarized:

**Customer problem**  
Everyday money decisions are not always solved by a transaction-only experience.

**Opportunity**  
Use the existing Mini App framework as a low-dependency experimentation layer.

**Proposed solution**  
Test small financial utilities that solve one clear job and connect naturally into Wave.

**Why needed**  
Wave already invests in promotions and rewards, but customer value becomes stronger when those initiatives connect to something personally useful.

**Expected value hypothesis**  
More useful customer experiences, faster experimentation, repeat engagement, transaction opportunities and stronger use of existing reward investment.

---

# 14. How to Adapt the Existing `/showcase` Implementation

The current `ShowcasePage.tsx` should be **evolved**, not thrown away.

## Keep

Keep the visual and interaction language of:

- `.presentation-shell`
- `.shell-header`
- `.showcase-layout`
- `.preview-stage`
- `.walkthrough-panel`
- `.showcase-slides`
- `.callout`
- `.pager`
- `.shell-footer`
- existing typography
- existing border/radius system
- existing grid background
- existing yellow theme
- existing muted grey / white presentation palette

The existing right-side walkthrough panel is a good fit for speaker guidance and slide navigation.

## Change

### Replace placeholder `SCREENS`

Do not reuse the existing `Home / Detail / Success` placeholder data.

Create presentation-specific data, for example:

```ts
type PresentationSlideId =
  | 'title'
  | 'why-mini-apps'
  | 'idea-landscape'
  | 'recommended'
  | 'points-connection'
  | 'fragmentation'
  | 'connected-model'
  | 'recommendation'
```

Prefer a data-driven `PRESENTATION_SLIDES` array.

### Replace `PlaceholderScreen`

Create a new presentation canvas component.

Suggested structure:

```txt
ShowcasePage
├── ShellHeader
├── PresentationStage
│   └── SlideCanvas
│       ├── TitleSlide
│       ├── WhyMiniAppsSlide
│       ├── IdeaLandscapeSlide
│       ├── RecommendedIdeasSlide
│       ├── PointsConnectionSlide
│       ├── FragmentationSlide
│       ├── ConnectedModelSlide
│       └── RecommendationSlide
└── WalkthroughPanel
```

Do not force the entire presentation into `DeviceFrame`.

### Use `DeviceFrame` selectively

The existing `DeviceFrame` is useful when a phone UI strengthens the concept.

Use it selectively on:

- Save for Something
- Can I Afford This?
- Money Calendar
- Split It
- Money Health Check

Do not use a phone frame on system/strategy slides.

### General Stage

For non-phone slides, the left stage should become a flexible canvas using the same visual language as the existing preview stage.

Suggested component:

```txt
PresentationStage
  ├── full-canvas diagram
  ├── card grid
  ├── process flow
  └── optional DeviceFrame
```

---

# 15. Recommended Interactive Behaviour

## Main slide navigation

Keep:

- right-side slide list
- Previous
- Next
- current slide count

Add keyboard support if easy:

- `ArrowLeft`
- `ArrowRight`

Do not make keyboard navigation a blocker.

## Recommended concept selector

Slide 4 should include a local selector for the five recommended concepts.

Selecting an idea should update the concept content **without changing the main slide number**.

This keeps the overall presentation short while allowing quick idea-by-idea discussion.

## Motion

Use restrained motion only.

Good uses:

- selected recommendation changes
- disconnected blocks connecting together
- before → after transition
- process-flow reveal

Avoid:

- decorative floating animation
- autoplay sequences
- long transitions
- animation that slows down presenting

---

# 16. Right Walkthrough Panel

The existing right panel should become the presenter/navigation layer.

For each main slide show:

- eyebrow: `Slide X of 8`
- slide title
- 1 short description
- slide list
- optional speaker cue/callout
- Previous / Next

Keep speaker copy short enough to scan while presenting.

Example callout for Slide 6:

**Presentation cue**

`The point isn't that our initiatives are bad individually. The customer simply doesn't experience our org chart — they experience one WavePay.`

Do not put entire speaker scripts in the panel.

---

# 17. Header / Footer Adjustments

## Header

Reuse the existing shell header and Brand treatment.

Suggested config:

**Name**

`Mini App Opportunities`

**Subtitle**

`Small tools. Connected value.`

The existing placeholder `P` brand mark may be replaced with a simple presentation mark or Wave asset if one already exists in the project.

Do not spend time creating new branding.

## Developer controls

The existing showcase has:

- Fit / 100%
- Prototype
- Config

For this presentation:

- keep `Prototype` only if it is useful to jump into a live Mini App demo
- `Config` can remain but should be visually secondary
- Fit / 100% should only matter when a device preview is visible
- it is acceptable to hide these controls on pure presentation slides

## Footer

Replace placeholder text with something minimal such as:

`Mini App Opportunities · Wave Money`

or remove the footer if it adds no value.

---

# 18. Visual Direction Based on the Existing Boilerplate

Preserve the current showcase feel:

- Geist typography
- cool grey canvas
- white surfaces
- thin neutral borders
- subtle grid stage background
- yellow accent / actions
- rounded compact controls
- muted secondary text
- narrow right walkthrough panel
- generous whitespace
- presentation-stage feel rather than website landing-page feel

Do not introduce:

- gradients unless already necessary for a visual
- glassmorphism
- huge marketing hero sections
- excessive shadows
- unrelated card styles
- a second design system

The deck should look like it belongs inside the existing boilerplate.

---

# 19. Slide-Specific Visual Direction

## Slide 1

Large statement in the stage.

Minimal supporting line.

Use whitespace.

No device frame required.

## Slide 2

Use a simple four-part diagram or four compact blocks.

Make `Low dependency` visually prominent.

## Slide 3

Use the stage as a compact idea map/grid.

Dependency badges should be easy to scan.

Recommended ideas should receive a subtle highlight.

Do not use large phone mocks here.

## Slide 4

Preferred composition:

```txt
┌──────────────────────── Presentation Stage ────────────────────────┐
│                                                                    │
│  Selected Mini App Mock          Problem / Opportunity / Value     │
│  inside DeviceFrame              compact content                   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

Concept selector can live:

- at the top/bottom of the stage, or
- inside the right panel below the main slide navigation

Choose whichever is clearer without overcrowding.

## Slide 5

Use a linear goal/reward flow.

Make the line:

> `The campaign gives the incentive. The Mini App gives the incentive a purpose.`

the dominant content.

## Slide 6

Use two states:

### State A — internal

Disconnected initiative nodes.

### State B — customer

The same fragmentation appearing as disconnected customer touchpoints.

The visual should make the analogy obvious before the presenter explains it.

## Slide 7

Use one connected journey spine.

Customer need should be the starting point.

Avoid making technology the centre.

## Slide 8

Use a decisive recommendation hierarchy.

Make the first two concepts prominent.

Keep the original homework summary concise.

---

# 20. Mini App Mock Fidelity

For this presentation, concept mocks do not need full production fidelity.

Use enough UI to explain the customer job.

Recommended mock contents:

## Save for Something

- goal: `New Phone`
- target: `1,000,000 Ks`
- progress
- weekly amount
- next action

## Can I Afford This?

- available money
- upcoming commitments
- desired purchase
- remaining amount

## Money Calendar

- 3–4 upcoming commitments
- total required before next payday

## Split It

- total bill
- number of people
- per-person result

## Money Health Check

- short result
- one recommended action

If time is limited, prioritise **Save for Something** and **Can I Afford This?** mocks first.

---

# 21. Validation / Success Measures

Do not claim business impact before testing.

Potential metrics for future experiments:

## Customer utility

- Mini App task completion
- repeat opens
- return within 7 / 30 days
- goal creation
- calendar entries
- split calculations completed
- self-reported usefulness

## Business behaviour

Depending on concept:

- downstream Wave payment initiation
- P2P transfer initiation
- balance-retention behaviour
- average qualifying EOD balance
- Wave Points participation
- repeat transaction behaviour

The first validation question should be:

> **Do customers voluntarily use the utility?**

Only then evaluate deeper integration.

---

# 22. Guardrails

Do not:

- make this a 20-slide strategy deck
- deeply explain every brainstorm idea
- make every concept AI-powered
- make every concept depend on transaction history
- imply deep integration is required for MVP
- position Mini Apps as a replacement for the core WavePay app
- turn the pitch into a technology story
- frame existing promotions as failures
- blame internal teams
- claim expected business impact as proven
- expose detailed Wave Points tier logic unless needed
- force a DeviceFrame onto every presentation slide

---

# 23. Build Priority

If implementation time is limited, build in this order:

1. Rework `/showcase` into the 8-slide presentation.
2. Build Slide 3 idea landscape.
3. Build Slide 4 interactive recommended-concept selector.
4. Build simple `Save for Something` mock.
5. Build simple `Can I Afford This?` mock.
6. Build Slide 5 Wave Points connection.
7. Build Slide 6 disconnected → external analogy.
8. Build Slide 7 connected customer journey.
9. Add remaining three concept mocks if time permits.
10. Polish transitions and keyboard navigation last.

The presentation narrative matters more than building five fully interactive Mini Apps.

---

# 24. Final One-Sentence Direction for Antigravity

> **Use the existing `/showcase` stakeholder walkthrough shell as the presentation system, preserve its visual language, replace the generic placeholder slides with an 8-slide Mini App opportunity story, use the existing phone frame only for the recommended concept mocks, and build toward the thesis that Mini Apps can connect real customer needs with Wave's existing promotions, rewards and transaction ecosystem.**
