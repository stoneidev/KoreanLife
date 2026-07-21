import { NavLink } from 'react-router-dom'
import { useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
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
          <Icon name={item.icon} size={22} className="nav-icon" />
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}
