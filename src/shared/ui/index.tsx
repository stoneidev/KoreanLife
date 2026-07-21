import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type BlockHeadProps = {
  title: string
  action?: ReactNode
  meta?: string
}

export function BlockHead({ title, action, meta }: BlockHeadProps) {
  return (
    <div className="block-head">
      <h2>{title}</h2>
      {action ?? (meta ? <span className="mono">{meta}</span> : null)}
    </div>
  )
}

type PageHeadProps = {
  kicker: string
  title: string
  lead?: string
  backTo?: string
  backLabel?: string
}

export function PageHead({ kicker, title, lead, backTo, backLabel = 'Back' }: PageHeadProps) {
  return (
    <div className="page-head">
      {backTo ? (
        <Link to={backTo} className="back">
          ← {backLabel}
        </Link>
      ) : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lead ? (
        <p className="lead" style={{ marginTop: 8 }}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}

type TipProps = {
  children: ReactNode
}

export function Tip({ children }: TipProps) {
  return (
    <div className="rule do" style={{ marginTop: 18 }}>
      <strong>💡 Tip</strong>
      <p>{children}</p>
    </div>
  )
}

type ScreenProps = {
  children: ReactNode
  padded?: boolean
}

export function Screen({ children, padded }: ScreenProps) {
  return <div className={`screen${padded ? ' screen-pad' : ''}`}>{children}</div>
}

type ToastProps = {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="toast" role="status">
      <span aria-hidden>✓</span>
      {message}
    </div>
  )
}
