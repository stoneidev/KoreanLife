import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import { ScamDiagnoser } from './ScamDiagnoser'

function renderDiagnoser() {
  return render(
    <LanguageProvider dict={dictionary}>
      <ScamDiagnoser />
    </LanguageProvider>,
  )
}

describe('ScamDiagnoser', () => {
  beforeEach(() => localStorage.clear())

  it('renders all checklist items as checkboxes', () => {
    renderDiagnoser()
    expect(screen.getAllByRole('checkbox')).toHaveLength(8)
  })

  it('starts in the idle state', () => {
    renderDiagnoser()
    expect(screen.getByText(/check the items|해당 사항/i)).toBeInTheDocument()
  })

  it('escalates the verdict as high-weight items are checked', async () => {
    renderDiagnoser()
    const boxes = screen.getAllByRole('checkbox')
    // check two weight-3 (core) items → score 6 → danger
    await userEvent.click(boxes[0])
    await userEvent.click(boxes[1])
    expect(screen.getByText(/never transfer|절대 송금/i)).toBeInTheDocument()
  })

  it('toggles an item back off', async () => {
    renderDiagnoser()
    const first = screen.getAllByRole('checkbox')[0]
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-checked', 'false')
  })
})
