import { NavLink } from 'react-router-dom'
import { useI18n } from '@/shared/i18n'
import { navItems } from '../model/nav-items'

export function BottomNav() {
  const { t } = useI18n()

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={'end' in item ? item.end : false}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <span className="nav-icon" aria-hidden>
            {item.icon}
          </span>
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}
