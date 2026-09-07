import React from 'react'

export type AnimatedTextEffect = 'soft-blur-in' | 'per-word-crossfade' | 'micro-scale-fade'

export interface AnimatedTextProps {
  text: string
  effect: AnimatedTextEffect
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  delayMs?: number
  highlightText?: string
  highlightClassName?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  effect,
  as: Component = 'span',
  className = '',
  delayMs = 0,
  highlightText,
  highlightClassName = 'text-highlight',
}) => {
  const rootStyle: React.CSSProperties = {
    ...(delayMs > 0 ? ({ '--anim-base-delay': `${delayMs}ms` } as React.CSSProperties) : {}),
  }

  // Effect: micro-scale-fade (Whole phrase / element)
  if (effect === 'micro-scale-fade') {
    return (
      <Component
        className={`anim-root anim-micro-scale-fade ${className}`.trim()}
        style={rootStyle}
      >
        {text}
      </Component>
    )
  }

  // Effect: per-word-crossfade (Splits into words, preserves natural spacing & line wraps)
  if (effect === 'per-word-crossfade') {
    const words = text.split(' ')

    return (
      <Component
        className={`anim-root anim-per-word-root ${className}`.trim()}
        style={rootStyle}
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="anim-visual-content">
          {words.map((word, idx) => {
            const isHighlight = highlightText && word.toLowerCase().includes(highlightText.toLowerCase())
            return (
              <React.Fragment key={idx}>
                <span
                  className={`anim-word ${isHighlight ? highlightClassName : ''}`.trim()}
                  style={{ '--word-idx': idx } as React.CSSProperties}
                >
                  {word}
                </span>
                {idx < words.length - 1 ? ' ' : null}
              </React.Fragment>
            )
          })}
        </span>
      </Component>
    )
  }

  // Effect: soft-blur-in (Per-character reveal with word-level nowrap so words don't break mid-letter)
  if (effect === 'soft-blur-in') {
    const words = text.split(' ')
    let globalCharCount = 0

    return (
      <Component
        className={`anim-root anim-soft-blur-root ${className}`.trim()}
        style={rootStyle}
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="anim-visual-content">
          {words.map((word, wordIdx) => {
            const chars = Array.from(word)
            const isHighlight = highlightText && word.toLowerCase().includes(highlightText.toLowerCase())

            const wordNode = (
              <span
                key={wordIdx}
                className={`anim-word-cluster ${isHighlight ? highlightClassName : ''}`.trim()}
              >
                {chars.map((char, charIdx) => {
                  const charNumber = globalCharCount++
                  return (
                    <span
                      key={charIdx}
                      className="anim-char"
                      style={{ '--char-idx': charNumber } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            )

            // Count space as a stagger step
            globalCharCount++

            return (
              <React.Fragment key={wordIdx}>
                {wordNode}
                {wordIdx < words.length - 1 ? ' ' : null}
              </React.Fragment>
            )
          })}
        </span>
      </Component>
    )
  }

  return <Component className={className}>{text}</Component>
}
