import { useI18n } from '@/shared/i18n'
import { formatRelativeTime } from '@/shared/lib/relative-time'
import { Icon } from '@/shared/ui'
import type { CommunityPost } from '../model/post'

type PostCardProps = {
  post: CommunityPost
  now?: number
}

export function PostCard({ post, now }: PostCardProps) {
  const { t, lang } = useI18n()

  return (
    <a className="post-card" href={post.url} target="_blank" rel="noopener noreferrer">
      <div className="post-card-meta">
        {post.flair ? <span className="post-flair">{post.flair}</span> : null}
        <span className="post-time">{formatRelativeTime(post.createdUtc, lang, now)}</span>
      </div>
      <h3>{post.title}</h3>
      {post.excerpt ? <p className="post-excerpt">{post.excerpt}</p> : null}
      <div className="post-card-foot">
        <span>
          <Icon name="chat" size={14} /> {t('community.comments', { n: post.comments })}
        </span>
        <span className="post-author">u/{post.author}</span>
        <span className="post-open">
          Reddit <Icon name="arrow-right" size={13} />
        </span>
      </div>
    </a>
  )
}
