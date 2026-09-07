import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ConnectedModelSlide } from './ConnectedModelSlide'
import { FragmentationSlide } from './FragmentationSlide'
import { PointsConnectionSlide } from './PointsConnectionSlide'
import { RecommendationSlide } from './RecommendationSlide'
import { TitleSlide } from './TitleSlide'
import { WhyMiniAppsSlide } from './WhyMiniAppsSlide'

describe('TitleSlide placeholder & reveal behaviour', () => {
  it('renders all 3 pillars and quote as placeholders at step 0', () => {
    render(<TitleSlide step={0} />)

    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Real Customer Utility/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Low-Dependency Speed/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal Connected Ecosystem/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Click to reveal final quote/i })).toBeInTheDocument()

    expect(screen.queryByText('Real Customer Utility')).not.toBeInTheDocument()
    expect(screen.queryByText(/If we removed the WavePay logo/i)).not.toBeInTheDocument()
  })

  it('reveals pillar 1 at step 1 and keeps pillars 2 & 3 as placeholders', () => {
    render(<TitleSlide step={1} />)

    expect(screen.getByText('Real Customer Utility')).toBeInTheDocument()
    expect(screen.getByText(/Focus on practical money decisions/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Low-Dependency Speed/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal Connected Ecosystem/i })).toBeInTheDocument()
    expect(screen.queryByText(/If we removed the WavePay logo/i)).not.toBeInTheDocument()
  })

  it('reveals all pillars and quote at step 4', () => {
    render(<TitleSlide step={4} />)

    expect(screen.getByText('Real Customer Utility')).toBeInTheDocument()
    expect(screen.getByText('Low-Dependency Speed')).toBeInTheDocument()
    expect(screen.getByText('Connected Ecosystem')).toBeInTheDocument()
    expect(screen.getByText(/If we removed the WavePay logo/i)).toBeInTheDocument()
  })

  it('triggers onSelectStep when clicking on a placeholder pillar', async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<TitleSlide step={0} onSelectStep={handleSelect} />)

    const pillar2 = screen.getByRole('button', { name: /Point 2: Click to reveal Low-Dependency Speed/i })
    await user.click(pillar2)

    expect(handleSelect).toHaveBeenCalledWith(2)
  })

  it('triggers onSelectStep when clicking on the quote placeholder', async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<TitleSlide step={3} onSelectStep={handleSelect} />)

    const quotePlaceholder = screen.getByRole('button', { name: /Click to reveal final quote/i })
    await user.click(quotePlaceholder)

    expect(handleSelect).toHaveBeenCalledWith(4)
  })
})

describe('WhyMiniAppsSlide placeholder & reveal behaviour', () => {
  it('renders all 4 pillars and guiding principle banner as placeholders at step 0', () => {
    render(<WhyMiniAppsSlide step={0} />)

    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Existing Framework/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Smaller, Focused Scope/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal Less Core Dependency/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 4: Click to reveal Faster Build\/Test Loop/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Click to reveal guiding product principle/i })).toBeInTheDocument()

    expect(screen.queryByText('Existing Framework')).not.toBeInTheDocument()
    expect(screen.queryByText(/Solve the customer problem first/i)).not.toBeInTheDocument()
  })

  it('reveals pillars progressively and banner at step 5', () => {
    const { rerender } = render(<WhyMiniAppsSlide step={2} />)

    expect(screen.getByText('Existing Framework')).toBeInTheDocument()
    expect(screen.getByText('Smaller, Focused Scope')).toBeInTheDocument()
    expect(screen.queryByText('Less Core Dependency')).not.toBeInTheDocument()
    expect(screen.queryByText('Faster Build/Test Loop')).not.toBeInTheDocument()

    rerender(<WhyMiniAppsSlide step={5} />)
    expect(screen.getByText('Less Core Dependency')).toBeInTheDocument()
    expect(screen.getByText('Faster Build/Test Loop')).toBeInTheDocument()
    expect(screen.getByText(/Solve the customer problem first/i)).toBeInTheDocument()
  })

  it('triggers onSelectStep when clicking on a card placeholder', async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<WhyMiniAppsSlide step={0} onSelectStep={handleSelect} />)

    const card4 = screen.getByRole('button', { name: /Point 4: Click to reveal Faster Build\/Test Loop/i })
    await user.click(card4)

    expect(handleSelect).toHaveBeenCalledWith(4)
  })
})

describe('PointsConnectionSlide placeholder & reveal behaviour', () => {
  it('renders comparison cards, flow spine, and callout as placeholders at step 0', () => {
    render(<PointsConnectionSlide step={0} />)

    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Current Loyalty Programme/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Mini App Utility Layer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal The Connected Customer Journey/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 4: Click to reveal strategic takeaway/i })).toBeInTheDocument()

    expect(screen.queryByText('Current Loyalty Programme')).not.toBeInTheDocument()
    expect(screen.queryByText(/Mini App Utility Layer/i)).not.toBeInTheDocument()
  })

  it('reveals cards, journey spine, and strategic takeaway across steps 1 to 4', () => {
    const { rerender } = render(<PointsConnectionSlide step={1} />)
    expect(screen.getByText('Current Loyalty Programme')).toBeInTheDocument()
    expect(screen.queryByText('Mini App Utility Layer')).not.toBeInTheDocument()

    rerender(<PointsConnectionSlide step={2} />)
    expect(screen.getByText('Mini App Utility Layer')).toBeInTheDocument()
    expect(screen.queryByText('The Connected Customer Journey')).not.toBeInTheDocument()

    rerender(<PointsConnectionSlide step={3} />)
    expect(screen.getByText('The Connected Customer Journey')).toBeInTheDocument()
    expect(screen.queryByText(/We do not need to redesign the Wave Points engine/i)).not.toBeInTheDocument()

    rerender(<PointsConnectionSlide step={4} />)
    expect(screen.getByText(/We do not need to redesign the Wave Points engine/i)).toBeInTheDocument()
  })

  it('triggers onSelectStep when clicking placeholder elements', async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<PointsConnectionSlide step={0} onSelectStep={handleSelect} />)

    await user.click(screen.getByRole('button', { name: /Point 2: Click to reveal Mini App Utility Layer/i }))
    expect(handleSelect).toHaveBeenCalledWith(2)
  })
})

describe('FragmentationSlide placeholder & reveal behaviour', () => {
  it('renders initiatives, inspector, and observation callout as placeholders at step 0', () => {
    render(<FragmentationSlide step={0} />)

    expect(screen.getAllByRole('button', { name: /Point 1: Click to reveal/i })).toHaveLength(4)
    expect(screen.getAllByRole('button', { name: /Point 2: Click to reveal/i })).toHaveLength(4)
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal External Preview Inspector/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 4: Click to reveal design observation/i })).toBeInTheDocument()

    expect(screen.queryByText('Wave Points Balance Tiers')).not.toBeInTheDocument()
  })

  it('reveals batches progressively and observation callout at step 4', () => {
    const { rerender } = render(<FragmentationSlide step={1} />)
    expect(screen.getByText('Wave Points Balance Tiers')).toBeInTheDocument()
    expect(screen.queryByText('Food & Dining Week')).not.toBeInTheDocument()

    rerender(<FragmentationSlide step={2} />)
    expect(screen.getByText('Food & Dining Week')).toBeInTheDocument()
    expect(screen.queryByText('External Symptom Generated')).not.toBeInTheDocument()

    rerender(<FragmentationSlide step={3} />)
    expect(screen.getByText('External Symptom Generated')).toBeInTheDocument()
    expect(screen.queryByText(/This is an architecture opportunity/i)).not.toBeInTheDocument()

    rerender(<FragmentationSlide step={4} />)
    expect(screen.getByText(/This is an architecture opportunity/i)).toBeInTheDocument()
  })
})

describe('ConnectedModelSlide placeholder & reveal behaviour', () => {
  it('renders push model, connected loop, scenarios, and banner as placeholders at step 0', () => {
    render(<ConnectedModelSlide step={0} />)

    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Traditional Promotion-Led pattern/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Customer-Need-Led Connected Model/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal Everyday Scenarios/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 4: Click to reveal strategic takeaway/i })).toBeInTheDocument()

    expect(screen.queryByText(/Traditional Promotion-Led/i)).not.toBeInTheDocument()
  })

  it('reveals push pattern, pull loop, scenarios, and rule banner across steps 1 to 4', () => {
    const { rerender } = render(<ConnectedModelSlide step={1} />)
    expect(screen.getByText(/Traditional Promotion-Led/i)).toBeInTheDocument()
    expect(screen.queryByText(/Customer-Need-Led Connected Model/i)).not.toBeInTheDocument()

    rerender(<ConnectedModelSlide step={2} />)
    expect(screen.getByText(/Customer-Need-Led Connected Model/i)).toBeInTheDocument()
    expect(screen.queryByText(/How the Loop Works Across Everyday Moments/i)).not.toBeInTheDocument()

    rerender(<ConnectedModelSlide step={3} />)
    expect(screen.getByText(/How the Loop Works Across Everyday Moments/i)).toBeInTheDocument()
    expect(screen.queryByText(/Mini Apps do not replace WavePay's core transaction features/i)).not.toBeInTheDocument()

    rerender(<ConnectedModelSlide step={4} />)
    expect(screen.getByText(/Mini Apps do not replace WavePay's core transaction features/i)).toBeInTheDocument()
  })
})

describe('RecommendationSlide placeholder & reveal behaviour', () => {
  it('renders Phase 1, Phase 2, and homework evaluation as placeholders at step 0', () => {
    render(<RecommendationSlide step={0} />)

    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Phase 1 Immediate Prototyping/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 2: Click to reveal Phase 2 Secondary Sequence/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Point 3: Click to reveal Summary Answers to Evaluation Questions/i })).toBeInTheDocument()

    expect(screen.queryByText('Phase 1 · Immediate Prototyping')).not.toBeInTheDocument()
  })

  it('reveals Phase 1, Phase 2, and Evaluation Answers across steps 1 to 3', () => {
    const { rerender } = render(<RecommendationSlide step={1} />)
    expect(screen.getByText('Phase 1 · Immediate Prototyping')).toBeInTheDocument()
    expect(screen.queryByText('Phase 2 · Secondary Sequence')).not.toBeInTheDocument()

    rerender(<RecommendationSlide step={2} />)
    expect(screen.getByText('Phase 2 · Secondary Sequence')).toBeInTheDocument()
    expect(screen.queryByText(/Summary Answers to Product Evaluation Questions/i)).not.toBeInTheDocument()

    rerender(<RecommendationSlide step={3} />)
    expect(screen.getByText(/Summary Answers to Product Evaluation Questions/i)).toBeInTheDocument()
  })
})
