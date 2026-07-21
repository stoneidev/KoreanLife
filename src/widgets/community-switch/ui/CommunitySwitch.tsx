import type { IconName } from '@/shared/ui'
import { Icon } from '@/shared/ui'

export type CommunitySource = 'board' | 'reddit'

export type CommunitySwitchOption = {
  id: CommunitySource
  label: string
  hint: string
  icon: IconName
}

type CommunitySwitchProps = {
  value: CommunitySource
  options: CommunitySwitchOption[]
  ariaLabel: string
  onChange: (value: CommunitySource) => void
}

export function CommunitySwitch({ value, options, ariaLabel, onChange }: CommunitySwitchProps) {
  return (
    <div className="community-switch" role="tablist" aria-label={ariaLabel} data-active={value}>
      <span className="community-switch-thumb" aria-hidden />
      {options.map((opt) => {
        const selected = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`community-switch-tab${selected ? ' on' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            <span className="community-switch-icon">
              <Icon name={opt.icon} size={18} />
            </span>
            <span className="community-switch-copy">
              <strong>{opt.label}</strong>
              <span>{opt.hint}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
