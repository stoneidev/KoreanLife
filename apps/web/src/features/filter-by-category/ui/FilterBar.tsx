type FilterBarProps = {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function FilterBar({ options, value, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`chip ${value === option ? 'on' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
