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
      <p className="mono">{kicker}</p>
      <h1 className="display" style={{ fontSize: 32, marginTop: 6 }}>
        {title}
      </h1>
      {lead ? (
        <p className="lead" style={{ marginTop: 8 }}>
          {lead}
        </p>
      ) : null}
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
  return <div className="toast">{message}</div>
}
