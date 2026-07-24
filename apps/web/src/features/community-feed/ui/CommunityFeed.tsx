import { PostCard } from '@/entities/community-post'
import { useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
import { useCommunityFeed } from '../model/useCommunityFeed'

export function CommunityFeed() {
  const { t } = useI18n()
  const { status, posts, refetch } = useCommunityFeed()

  if (status === 'loading') {
    return (
      <div className="feed-list" aria-busy="true" aria-label={t('community.loading')}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="post-skeleton">
            <span className="sk sk-tag" />
            <span className="sk sk-line" />
            <span className="sk sk-line short" />
          </div>
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="feed-state" role="alert">
        <Icon name="close" size={24} />
        <p>{t('community.error')}</p>
        <button type="button" className="btn btn-line btn-sm" onClick={refetch}>
          {t('community.retry')}
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="feed-state">
        <p>{t('community.empty')}</p>
      </div>
    )
  }

  return (
    <div className="feed-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
