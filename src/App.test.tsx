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
    expect(screen.getAllByText('Slide 1 of 8').length).toBeGreaterThan(0)
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

  it('moves through presentation slides in /showcase', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/Small tools/i)
    const nextButtons = screen.getAllByRole('button', { name: /Next/i })
    await user.click(nextButtons[0])

    expect(await screen.findByRole('heading', { name: /We already have a low-dependency way to experiment\./i })).toBeInTheDocument()
    expect(screen.getAllByText('Slide 2 of 8').length).toBeGreaterThan(0)
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
    expect(screen.getAllByText('Mini App Opportunities').length).toBeGreaterThan(0)
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

  it('renders phone prototypes and phone chrome in RecommendedIdeasSlide', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    // Navigate to Slide 4 (Recommended concepts with phone prototypes)
    const slide4Button = screen.getByText('Five Concepts to Test First').closest('button')!
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

    // Switch to Split It
    await user.click(screen.getByRole('button', { name: /Split It/i }))
    expect(screen.getByText(/Each Person Pays/i)).toBeInTheDocument()
    const shareBtn = screen.getByRole('button', { name: /Generate WavePay Money Request Link/i })
    await user.click(shareBtn)
    expect(screen.getByRole('button', { name: /WavePay Link Copied/i })).toBeInTheDocument()

    // Switch to Money Health Check
    await user.click(screen.getByRole('button', { name: /Money Health Check/i }))
    expect(screen.getByText(/2-minute checkup/i)).toBeInTheDocument()
    expect(screen.getByText(/Emergency Cash Cushion/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /1\+ Month Saved/i }))
    expect(screen.getByText(/Cashflow Timing/i)).toBeInTheDocument()
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
    expect(screen.getByText(/Slide 4 of 8 · Prototype 1\/5/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Save for Something/i).length).toBeGreaterThan(0)

    // Press ArrowDown -> Prototype 2 (Can I Afford This?)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 2\/5/i)).toBeInTheDocument()
    expect(screen.getByText(/Instant purchase runway check/i)).toBeInTheDocument()

    // Press ArrowDown -> Prototype 3 (Money Calendar)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 3\/5/i)).toBeInTheDocument()
    expect(screen.getByText(/High-speed Fiber Internet/i)).toBeInTheDocument()

    // Press ArrowDown -> Prototype 4 (Split It)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 4\/5/i)).toBeInTheDocument()
    expect(screen.getByText(/Each Person Pays/i)).toBeInTheDocument()

    // Press ArrowDown -> Prototype 5 (Money Health Check)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 5\/5/i)).toBeInTheDocument()
    expect(screen.getByText(/2-minute checkup/i)).toBeInTheDocument()

    // Press ArrowDown -> Advances to Slide 5 (Points Connection)
    await user.keyboard('{ArrowDown}')
    expect(screen.getAllByText('Slide 5 of 8').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Give the Reward a Purpose/i).length).toBeGreaterThan(0)

    // Press ArrowUp -> Returns to Slide 4, Prototype 5
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 5\/5/i)).toBeInTheDocument()

    // Press ArrowUp -> Returns to Prototype 4
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText(/Slide 4 of 8 · Prototype 4\/5/i)).toBeInTheDocument()

    // Test clicking TOC sub-item directly (e.g. concept 4.2)
    const tocProto2Btn = screen.getByRole('button', { name: 'Jump to concept 4.2' })
    await user.click(tocProto2Btn)
    expect(screen.getByText(/Slide 4 of 8 · Prototype 2\/5/i)).toBeInTheDocument()
    expect(screen.getByText(/Instant purchase runway check/i)).toBeInTheDocument()
  })
})
