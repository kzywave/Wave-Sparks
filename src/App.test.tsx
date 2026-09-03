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
  it.each(['/prototype', '/showcase', '/config'])('protects %s with the access gate', async (path) => {
    renderApp(path)
    expect(await screen.findByRole('heading', { name: 'Prototype access' })).toBeInTheDocument()
  })

  it('accepts the development code and restores the intended route', async () => {
    const user = userEvent.setup()
    renderApp('/showcase')

    await user.type(await screen.findByLabelText('Access code'), '1337')
    await user.click(screen.getByRole('button', { name: 'Enter' }))

    expect(await screen.findByRole('heading', { name: 'Showcase preview' })).toBeInTheDocument()
    expect(window.localStorage.getItem(ACCESS_STORAGE_KEY)).toBe('granted')
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

  it('moves through the three showcase slides', async () => {
    const user = userEvent.setup()
    grantAccess()
    renderApp('/showcase')

    await user.click(await screen.findByRole('button', { name: 'Next slide' }))
    expect(screen.getByRole('heading', { name: 'Detail placeholder' })).toBeInTheDocument()
    expect(screen.getByText('Slide 2 of 3')).toBeInTheDocument()
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
    expect(screen.getAllByText('Prototype Starter').length).toBeGreaterThan(0)
    expect(window.localStorage.getItem(CONFIG_STORAGE_KEY)).toBeNull()
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
})
