import type { ReactNode, SVGProps } from 'react'

/**
 * Line pictogram set. All icons are drawn on a 24×24 grid with a 1.75 stroke,
 * round caps/joins, and `currentColor` so they inherit text color. Kept as a
 * local set (no icon library) to match the project's "no external UI lib" rule.
 */
const paths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1Z" />
      <path d="M8.5 10h7M8.5 12.5h4" />
    </>
  ),
  film: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <path d="M9 5v14M15 5v14M4 9.5h5M15 9.5h5M4 14.5h5M15 14.5h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5.5 6v5.5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5V6L12 3.5Z" />
      <path d="m9.3 12 1.9 1.9 3.6-3.8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="11" height="11" rx="1.5" />
      <path d="M5 16V6a1 1 0 0 1 1-1h9" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9.5h3l4-3.5v12l-4-3.5H4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 15.5a5 5 0 1 1 6 0c-.6.5-1 1.1-1 1.9v.6h-4v-.6c0-.8-.4-1.4-1-1.9Z" />
      <path d="M10 20.5h4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4.5 6-7.6 6-10.5a6 6 0 0 0-12 0C6 13.4 8 16.5 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  phone: (
    <path d="M7 4.5c1 0 1.4.5 1.7 1.5.2.7.5 1.6.8 2.3.2.5.1 1-.3 1.4l-1 1c.9 1.8 2.3 3.2 4.1 4.1l1-1c.4-.4.9-.5 1.4-.3.7.3 1.6.6 2.3.8 1 .3 1.5.7 1.5 1.7v2.3c0 1-.8 1.7-1.8 1.6C11.8 20.6 5.4 14.2 4.7 6.3 4.6 5.3 5.3 4.5 6.3 4.5H7Z" />
  ),
  scooter: (
    <>
      <circle cx="6" cy="17" r="2.3" />
      <circle cx="17.5" cy="17" r="2.3" />
      <path d="M8.3 17h6.9M13 6h3l2.5 8.5M15.2 17c.2-3 1-6 3.3-8" />
      <path d="M6 14.7 8 8h3" />
    </>
  ),
  house: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10.5 20v-4.5h3V20" />
    </>
  ),
  subway: (
    <>
      <rect x="6" y="4" width="12" height="13" rx="2.5" />
      <path d="M6 11h12M9.5 7.5h5" />
      <circle cx="9" cy="14" r=".6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r=".6" fill="currentColor" stroke="none" />
      <path d="m8.5 18-1.5 2.5M15.5 18l1.5 2.5" />
    </>
  ),
  gift: (
    <>
      <rect x="4.5" y="9" width="15" height="4" rx="1" />
      <path d="M6 13v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6M12 9v11" />
      <path d="M12 9C11 6 9 5 7.7 5.8 6.6 6.5 7 8.4 9 9M12 9c1-3 3-4 4.3-3.2C17.4 6.5 17 8.4 15 9" />
    </>
  ),
  handshake: (
    <>
      <path d="m3.5 12 3-3 4 3.5c.7.6.7 1.6 0 2.2-.6.6-1.5.6-2.1 0L7 13.5" />
      <path d="m20.5 12-3-3-3.5 1.5-2.5-1.5" />
      <path d="m10.5 14.7 2 1.8c.6.6 1.5.6 2.1 0l3.9-3.5M6.5 9 4 7.5M17.5 9 20 7.5" />
    </>
  ),
  heart: (
    <path d="M12 19c-4.5-3-7-5.8-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 3.2-2.5 6-7 9Z" />
  ),
  passport: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9.5 16h5" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14.5" r="4.5" />
      <path d="m9 10.3-2-6.3h3l1.5 4M15 10.3l2-6.3h-3l-1.5 4" />
      <path d="m12 12.7.9 1.6 1.8.2-1.3 1.3.3 1.8-1.7-.9-1.7.9.3-1.8L9.3 14.5l1.8-.2.9-1.6Z" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M8 8.5c2.5 1 5.5 1 8 0" />
      <path d="M12 8v5h3.5l2 5" />
      <path d="M12 13a4.5 4.5 0 1 0 3.7 7" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  hospital: (
    <>
      <rect x="4.5" y="5" width="15" height="15" rx="2" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  scissors: (
    <>
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="7" cy="17" r="2.2" />
      <path d="m8.8 8.5 10.2 8M8.8 15.5 19 7.5M9 9l4 3.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="2.6" />
      <path d="M4.5 19c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5" />
      <path d="M15.5 7.2a2.4 2.4 0 0 1 0 4.6M16.5 14.7c2 .5 3.5 2.1 3.5 4.3" />
    </>
  ),
}

export const iconNames = Object.keys(paths) as IconName[]

export type IconName = keyof typeof paths

type IconProps = {
  name: IconName
  size?: number
  /** When provided the icon is exposed to assistive tech with this label. */
  label?: string
  className?: string
} & Omit<SVGProps<SVGSVGElement>, 'ref'>

export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...a11y}
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
