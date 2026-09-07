import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { ShellConfigProvider } from './ShellConfigContext'
import { ACCESS_STORAGE_KEY, CONFIG_STORAGE_KEY } from './storage'

const renderApp = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ShellConfigProvider><App /></ShellConfigProvider>
    </MemoryRouter>,
  )

const grantAccess = () => window.localStorage.setItem(ACCESS_STORAGE_KEY, 'granted')

describe('prototype starter', () => {
  it.each(['/prototype', '/config'])('protects %s with the access gate', async (path) => {
    renderApp(path)
    expect(await screen.findByRole('heading', { name: 'Prototype access' })).toBeInTheDocument()
  })

  it('allows direct access to /showcase presentation deck without access gate', async () => {
    renderApp('/showcase')
    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/Small tools/i)
    expect(screen.getAllByText(/Slide 1 of 8/).length).toBeGreaterThan(0)
  })

  it('accepts the development code and restores the intended route', async () => {
    const user = userEvent.setup()
    renderApp('/config')

    await user.type(await screen.findByLabelText('Access code'), '1337')
    await user.click(screen.getByRole('button', { name: 'Enter' }))

    expect(await screen.findByRole('heading', { name: 'Configure this prototype' })).toBeInTheDocument()
    expect(window.localStorage.getItem(ACCESS_STORAGE_KEY)).toBe('granted')
  })

  it('starts with the checked-in yellow desktop snapshot', async () => {
    grantAccess()
    renderApp('/config')

    await screen.findByRole('heading', { name: 'Configure this prototype' })
    expect(document.documentElement).toHaveAttribute('data-theme', 'yellow')
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#ffcb05')
    expect(screen.getByRole('combobox', { name: 'Preset' })).toHaveValue('yellow')
  })

  it('rejects an incorrect access code', async () => {
    const user = userEvent.setup()
    renderApp('/access')
    await user.type(screen.getByLabelText('Access code'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Enter' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Access code not accepted.')
  })

  it.each([
    ['/prototype/home', 'Home'],
    ['/prototype/detail', 'Detail'],
    ['/prototype/success', 'Success'],
  ])('renders the placeholder at %s', async (path, label) => {
    grantAccess()
    renderApp(path)
    expect(await screen.findByTestId('placeholder-screen')).toHaveTextContent('393×852')
    expect(screen.getByTestId('placeholder-screen')).toHaveTextContent(label)
  })

  it('navigates between prototype screens and preview sizes', async () => {
    const user = userEvent.setup()
    grantAccess()
    renderApp('/prototype')

    await user.click(await screen.findByRole('button', { name: 'Detail screen' }))
    expect(screen.getAllByRole('heading', { name: 'Detail' })).toHaveLength(2)

    const device = screen.getByLabelText('Mobile device frame')
    await user.click(screen.getByRole('button', { name: 'Actual size' }))
    expect(device).toHaveAttribute('data-preview-mode', 'actual')
  })

  it('moves through presentation slides and talking points in /showcase', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/Small tools/i)
    const nextButtons = screen.getAllByRole('button', { name: /Next/i })

    // Initially cards are placeholders with click-to-reveal accessible labels
    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Real Customer Utility/i })).toBeInTheDocument()

    // Step through Slide 1: 4 steps (3 pillars + 1 quote)
    await user.click(nextButtons[0]) // Point 1 revealed
    expect(screen.getAllByText(/Point 1\/4/).length).toBeGreaterThan(0)
    expect(screen.getByText('Real Customer Utility')).toBeInTheDocument()

    // Clicking directly on Point 3 placeholder reveals up to Point 3
    const point3Placeholder = screen.getByRole('button', { name: /Point 3: Click to reveal Connected Ecosystem/i })
    await user.click(point3Placeholder)
    expect(screen.getByText('Connected Ecosystem')).toBeInTheDocument()
    expect(screen.getAllByText(/Point 3\/4/).length).toBeGreaterThan(0)

    // Advance to step 4 (Quote)
    await user.click(nextButtons[0])
    expect(screen.getByText(/If we removed the WavePay logo/i)).toBeInTheDocument()

    // Advance to Slide 2
    await user.click(nextButtons[0])
    expect(await screen.findByRole('heading', { name: /We already have a low-dependency way to experiment\./i })).toBeInTheDocument()
    expect(screen.getAllByText(/Slide 2 of 8/).length).toBeGreaterThan(0)

    // Slide 2 initially has placeholder cards
    expect(screen.getByRole('button', { name: /Point 1: Click to reveal Existing Framework/i })).toBeInTheDocument()

    // Stepping back returns to Slide 1 fully revealed (step 4)
    const prevButtons = screen.getAllByRole('button', { name: /Prev/i })
    await user.click(prevButtons[0])
    expect(screen.getAllByText(/Point 4\/4/).length).toBeGreaterThan(0)
  })

  it('preserves stage scroll position when scrubbing or clicking to reveal, but resets on slide change', async () => {
    const user = userEvent.setup()
    grantAccess()
    renderApp('/presentation')

    const stage = document.querySelector('.deck-stage') as HTMLElement
    expect(stage).toBeInTheDocument()

    // Simulate the user scrolling down in the presentation stage
    stage.scrollTop = 320
    expect(stage.scrollTop).toBe(320)

    // Scrub talking point on current slide (Slide 1 Point 1)
    const nextButtons = screen.getAllByRole('button', { name: /Next/i })
    await user.click(nextButtons[0])
    expect(screen.getAllByText(/Point 1\/4/).length).toBeGreaterThan(0)

    // Scroll position MUST NOT be reset to 0
    expect(stage.scrollTop).toBe(320)

    // Click placeholder to reveal Point 2
    const point2Placeholder = screen.getByRole('button', { name: /Point 2: Click to reveal Low-Dependency Speed/i })
    await user.click(point2Placeholder)
    expect(screen.getAllByText(/Point 2\/4/).length).toBeGreaterThan(0)

    // Scroll position MUST still be preserved
    expect(stage.scrollTop).toBe(320)

    // Advance through the remaining points to Slide 2
    await user.click(nextButtons[0]) // Point 3
    expect(stage.scrollTop).toBe(320)
    await user.click(nextButtons[0]) // Point 4
    expect(stage.scrollTop).toBe(320)

    // Moving to Slide 2 (a new slide) should reset scroll position to 0
    await user.click(nextButtons[0])
    expect(screen.getAllByText(/Slide 2 of 8/).length).toBeGreaterThan(0)
    expect(stage.scrollTop).toBe(0)
  })

  it('persists config edits and resets to checked-in defaults', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    grantAccess()
    renderApp('/config')

    const name = await screen.findByLabelText('Project name')
    await user.clear(name)
    await user.type(name, 'Example Project')
    expect(screen.getAllByText('Example Project').length).toBeGreaterThan(0)
    expect(window.localStorage.getItem(CONFIG_STORAGE_KEY)).toContain('Example Project')

    await user.click(screen.getByRole('button', { name: 'Copy config' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Example Project'))
    expect(screen.getByRole('status')).toHaveTextContent('Configuration copied.')

    await user.click(screen.getByRole('button', { name: 'Reset defaults' }))
    expect(screen.getAllByText('Product Initiatives').length).toBeGreaterThan(0)
    expect(window.localStorage.getItem(CONFIG_STORAGE_KEY)).toBeNull()
    expect(document.documentElement).toHaveAttribute('data-theme', 'yellow')
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#ffcb05')
  })

  it('updates theme, accent, and device dimensions from config', async () => {
    const user = userEvent.setup()
    grantAccess()
    renderApp('/config')

    await user.selectOptions(await screen.findByLabelText('Preset'), 'yellow')
    await user.clear(screen.getByLabelText('Width'))
    await user.type(screen.getByLabelText('Width'), '430')
    await user.clear(screen.getByLabelText('Height'))
    await user.type(screen.getByLabelText('Height'), '932')

    expect(document.documentElement).toHaveAttribute('data-theme', 'yellow')
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#ffcb05')
    expect(screen.getByText('430×932')).toBeInTheDocument()
  })

  it('highlights only the 3 shortlisted concepts matching slide 4 on slide 3 table', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    // Navigate to Slide 3 (Opportunity Landscape)
    const slide3Button = screen.getByText('Opportunity Landscape').closest('button')!
    await user.click(slide3Button)

    expect(screen.getByText(/3 shortlisted for first testing/i)).toBeInTheDocument()
    expect(screen.getByText(/3 priority concepts/i)).toBeInTheDocument()

    // Query tinted rows with class landscape-row--recommended
    const recommendedRows = document.querySelectorAll('.landscape-row--recommended')
    expect(recommendedRows.length).toBe(3)

    // Verify the 3 tinted rows match slide 4 concepts
    const recommendedTitles = Array.from(recommendedRows).map((row) =>
      row.querySelector('.landscape-cell-title')?.textContent?.trim()
    )
    expect(recommendedTitles).toEqual([
      'Can I Afford This?',
      'Save for Something',
      'Money Calendar',
    ])

    // Verify Split It is present in the table but not tinted
    const splitItCell = screen.getByText('Split It')
    const splitItRow = splitItCell.closest('tr')
    expect(splitItRow).not.toHaveClass('landscape-row--recommended')
  })

  it('renders phone prototypes and phone chrome in RecommendedIdeasSlide', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    // Navigate to Slide 4 (Recommended concepts with phone prototypes)
    const slide4Button = screen.getByText('Three Concepts to Test First').closest('button')!
    await user.click(slide4Button)

    // Verify phone chrome status bar and time
    expect(screen.getByText('9:41')).toBeInTheDocument()
    expect(screen.getAllByText(/Save for Something/i).length).toBeGreaterThan(0)

    // Test Save for Something interaction
    const reminderBtn = screen.getByRole('button', { name: /Set Weekly Balance Reminder/i })
    await user.click(reminderBtn)
    expect(screen.getByRole('button', { name: /Reminder Active/i })).toBeInTheDocument()

    // Switch to Can I Afford This?
    await user.click(screen.getByRole('button', { name: /Can I Afford This\?/i }))
    expect(screen.getByText(/Instant purchase runway check/i)).toBeInTheDocument()
    expect(screen.getByText(/Comfortable Buffer/i)).toBeInTheDocument()

    // Switch to Money Calendar
    await user.click(screen.getByRole('button', { name: /Money Calendar/i }))
    expect(screen.getByText(/High-speed Fiber Internet/i)).toBeInTheDocument()
    const billRow = screen.getByLabelText(/High-speed Fiber Internet.*unpaid/i)
    await user.click(billRow)
    expect(screen.getByLabelText(/High-speed Fiber Internet.*paid/i)).toBeInTheDocument()

    // Verify Split It is removed from Slide 4
    expect(screen.queryByRole('button', { name: /Split It/i })).not.toBeInTheDocument()
  })

  it('navigates through prototypes on slide 4 with ArrowDown and backward with ArrowUp', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    // Navigate to Slide 3 (Opportunity Landscape)
    const slide3Button = screen.getByText('Opportunity Landscape').closest('button')!
    await user.click(slide3Button)
    expect(screen.getByText(/Opportunity Landscape \(15 Ideas\)/i)).toBeInTheDocument()

    // Press ArrowDown to enter Slide 4 -> Prototype 1 (Save for Something)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 1\/3/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Save for Something/i).length).toBeGreaterThan(0)

    // Press ArrowDown -> Prototype 2 (Can I Afford This?)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 2\/3/i)).toBeInTheDocument()
    expect(screen.getByText(/Instant purchase runway check/i)).toBeInTheDocument()

    // Press ArrowDown -> Prototype 3 (Money Calendar)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 3\/3/i)).toBeInTheDocument()
    expect(screen.getByText(/High-speed Fiber Internet/i)).toBeInTheDocument()

    // Press ArrowDown -> Advances to Slide 5 (Points Connection)
    await user.keyboard('{ArrowDown}')
    expect(screen.getAllByText(/Slide 5 of 8/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Give the Reward a Purpose/i).length).toBeGreaterThan(0)

    // Press ArrowUp -> Returns to Slide 4, Prototype 3 (last prototype)
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 3\/3/i)).toBeInTheDocument()

    // Test clicking prototype tab on slide 4 directly (e.g. concept 2: Can I Afford This?)
    const proto2TabBtn = screen.getByRole('button', { name: /02\s*Can I Afford This\?/i })
    await user.click(proto2TabBtn)
    expect(screen.getByText(/Slide 4 of 8 · Prototype 2\/3/i)).toBeInTheDocument()
    expect(screen.getByText(/Instant purchase runway check/i)).toBeInTheDocument()
  })
})
