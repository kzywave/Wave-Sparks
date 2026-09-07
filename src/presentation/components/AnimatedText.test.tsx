import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AnimatedText } from './AnimatedText'

describe('AnimatedText', () => {
  it('renders per-word-crossfade with aria-label and individual word tokens', () => {
    render(
      <AnimatedText
        as="h2"
        effect="per-word-crossfade"
        text="We already have a way to experiment."
      />,
    )

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('We already have a way to experiment.')
    expect(heading).toHaveAttribute('aria-label', 'We already have a way to experiment.')
    expect(heading).toHaveClass('anim-per-word-root')
    expect(screen.getByText(/We already have a way to experiment\./i)).toBeInTheDocument()

    const words = heading.querySelectorAll('.anim-word')
    expect(words).toHaveLength(7)
    expect(words[0]).toHaveTextContent('We')
    expect(words[6]).toHaveTextContent('experiment.')
  })

  it('renders soft-blur-in with per-character tokens and word clusters', () => {
    render(
      <AnimatedText
        as="h1"
        effect="soft-blur-in"
        text="Small tools."
      />,
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Small tools.')
    expect(heading).toHaveAttribute('aria-label', 'Small tools.')
    expect(heading).toHaveClass('anim-soft-blur-root')

    const wordClusters = heading.querySelectorAll('.anim-word-cluster')
    expect(wordClusters).toHaveLength(2)

    const chars = heading.querySelectorAll('.anim-char')
    // "Small" (5) + "tools." (6) = 11 characters
    expect(chars).toHaveLength(11)
  })

  it('renders micro-scale-fade with appropriate classes', () => {
    render(
      <AnimatedText
        as="p"
        effect="micro-scale-fade"
        className="custom-lead"
        text="A subtle lead statement."
      />,
    )

    const paragraph = screen.getByText('A subtle lead statement.')
    expect(paragraph.tagName).toBe('P')
    expect(paragraph).toHaveClass('anim-micro-scale-fade')
    expect(paragraph).toHaveClass('custom-lead')
  })

  it('supports highlightText styling on matched words', () => {
    render(
      <AnimatedText
        effect="per-word-crossfade"
        text="Connected value and tools."
        highlightText="Connected"
      />,
    )

    const highlighted = screen.getByText('Connected')
    expect(highlighted).toHaveClass('text-highlight')
  })
})
