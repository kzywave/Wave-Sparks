interface PreviewSizeControlProps {
  value: 'fit' | 'actual'
  onChange: (value: 'fit' | 'actual') => void
}

export const PreviewSizeControl = ({ value, onChange }: PreviewSizeControlProps) => (
  <div className="segmented-control" role="group" aria-label="Preview size">
    <button type="button" aria-pressed={value === 'fit'} onClick={() => onChange('fit')}>Fit</button>
    <button type="button" aria-pressed={value === 'actual'} onClick={() => onChange('actual')}>Actual size</button>
  </div>
)
