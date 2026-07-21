import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CommunitySwitch } from './CommunitySwitch'

describe('CommunitySwitch', () => {
  it('marks the active tab and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CommunitySwitch
        value="board"
        ariaLabel="Choose a source"
        onChange={onChange}
        options={[
          { id: 'board', label: 'Board', hint: 'Ask each other', icon: 'chat' },
          { id: 'reddit', label: 'Reddit', hint: 'r/AskAKorean', icon: 'globe' },
        ]}
      />,
    )
    expect(screen.getByRole('tab', { name: /Board/i })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('tab', { name: /Reddit/i }))
    expect(onChange).toHaveBeenCalledWith('reddit')
  })
})
