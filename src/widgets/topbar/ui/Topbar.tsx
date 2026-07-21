import { useI18n } from '@/shared/i18n'

export function Topbar() {
  const { t, toggle } = useI18n()

  return (
    <header className="topbar">
      <div className="brand-mark">
        <span className="brand-dot" aria-hidden />
        {t('app.name')}
      </div>
      <button
        type="button"
        className="lang-toggle"
        onClick={toggle}
        aria-label="Switch language / 언어 전환"
      >
        <span aria-hidden className="lang-toggle-globe">
          🌐
        </span>
        {t('lang.toggle')}
      </button>
    </header>
  )
}
