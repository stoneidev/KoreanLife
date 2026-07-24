import { useI18n } from '@/shared/i18n'
import { formatRelativeTime } from '@/shared/lib/relative-time'
import { Icon } from '@/shared/ui'
import type { BoardPost } from '../model/types'

type BoardPostCardProps = {
  post: BoardPost
  onOpen: (id: string) => void
}

export function BoardPostCard({ post, onOpen }: BoardPostCardProps) {
  const { t, lang } = useI18n()
  const createdSec = post.createdAt / 1000

  return (
    <button type="button" className="post-card board-post-card" onClick={() => onOpen(post.id)}>
      <div className="post-card-meta">
        <span className="post-time">{formatRelativeTime(createdSec, lang)}</span>
      </div>
      <h3>{post.title}</h3>
      <p className="post-excerpt">{post.body}</p>
      <div className="post-card-foot">
        <span>
          <Icon name="chat" size={14} /> {t('board.replies', { n: post.replyCount })}
        </span>
        <span className="post-author">{post.authorName}</span>
      </div>
    </button>
  )
}
