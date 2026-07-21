import { useState } from 'react'
import { BoardPostCard } from '@/entities/board-post'
import { getBoardNick, setBoardNick } from '@/shared/config/board'
import { useI18n } from '@/shared/i18n'
import { Icon } from '@/shared/ui'
import { createBoardPost, createBoardReply, useBoardDetail, useBoardList } from '../model/useBoardFeed'

export function BoardFeed() {
  const { t, lang } = useI18n()
  const list = useBoardList()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [composing, setComposing] = useState(false)

  if (selectedId) {
    return <BoardDetail postId={selectedId} onBack={() => setSelectedId(null)} />
  }

  if (composing) {
    return (
      <BoardComposer
        defaultNick={getBoardNick()}
        lang={lang}
        onCancel={() => setComposing(false)}
        onCreated={(id) => {
          setComposing(false)
          void list.refetch()
          setSelectedId(id)
        }}
      />
    )
  }

  if (list.status === 'loading') {
    return (
      <div className="feed-list" aria-busy="true" aria-label={t('board.loading')}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="post-skeleton">
            <span className="sk sk-tag" />
            <span className="sk sk-line" />
            <span className="sk sk-line short" />
          </div>
        ))}
      </div>
    )
  }

  if (list.status === 'error') {
    return (
      <div className="feed-state" role="alert">
        <Icon name="close" size={24} />
        <p>{t('board.error')}</p>
        <button type="button" className="btn btn-line btn-sm" onClick={() => void list.refetch()}>
          {t('community.retry')}
        </button>
      </div>
    )
  }

  return (
    <div className="board-panel">
      <div className="board-toolbar">
        <p className="mute">{t('board.hint')}</p>
        <button type="button" className="btn btn-fill btn-sm" onClick={() => setComposing(true)}>
          {t('board.newPost')}
        </button>
      </div>
      {list.posts.length === 0 ? (
        <div className="feed-state">
          <p>{t('board.empty')}</p>
        </div>
      ) : (
        <div className="feed-list">
          {list.posts.map((post) => (
            <BoardPostCard key={post.id} post={post} onOpen={setSelectedId} />
          ))}
        </div>
      )}
    </div>
  )
}

function BoardComposer({
  defaultNick,
  lang,
  onCancel,
  onCreated,
}: {
  defaultNick: string
  lang: string
  onCancel: () => void
  onCreated: (id: string) => void
}) {
  const { t } = useI18n()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [authorName, setAuthorName] = useState(defaultNick)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setBusy(true)
    setError(null)
    try {
      setBoardNick(authorName)
      const post = await createBoardPost({ title, body, authorName, lang })
      onCreated(post.id)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="board-form">
      <button type="button" className="back board-back" onClick={onCancel}>
        <Icon name="arrow-left" size={14} /> {t('board.back')}
      </button>
      <h3 className="board-form-title">{t('board.newPost')}</h3>
      <label className="board-field">
        <span>{t('board.nick')}</span>
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={40}
          autoComplete="nickname"
        />
      </label>
      <label className="board-field">
        <span>{t('board.titleField')}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
      </label>
      <label className="board-field">
        <span>{t('board.bodyField')}</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} rows={6} />
      </label>
      {error ? (
        <p className="push-note push-note-warn" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        className="btn btn-fill btn-block"
        disabled={busy || !title.trim() || !body.trim() || !authorName.trim()}
        onClick={() => void submit()}
      >
        {busy ? t('board.sending') : t('board.submit')}
      </button>
    </div>
  )
}

function BoardDetail({ postId, onBack }: { postId: string; onBack: () => void }) {
  const { t } = useI18n()
  const detail = useBoardDetail(postId)
  const [reply, setReply] = useState('')
  const [authorName, setAuthorName] = useState(getBoardNick())
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendReply = async () => {
    setBusy(true)
    setError(null)
    try {
      setBoardNick(authorName)
      const created = await createBoardReply(postId, { body: reply, authorName })
      detail.setReplies((prev) => [...prev, created])
      detail.setPost((prev) =>
        prev ? { ...prev, replyCount: prev.replyCount + 1 } : prev,
      )
      setReply('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  if (detail.status === 'loading') {
    return (
      <div className="feed-state" aria-busy="true">
        <p>{t('board.loading')}</p>
      </div>
    )
  }

  if (detail.status === 'error' || !detail.post) {
    return (
      <div className="feed-state" role="alert">
        <p>{t('board.error')}</p>
        <button type="button" className="btn btn-line btn-sm" onClick={onBack}>
          {t('board.back')}
        </button>
      </div>
    )
  }

  const post = detail.post

  return (
    <div className="board-detail">
      <button type="button" className="back board-back" onClick={onBack}>
        <Icon name="arrow-left" size={14} /> {t('board.back')}
      </button>
      <article className="board-detail-post">
        <p className="mono">{post.authorName}</p>
        <h2>{post.title}</h2>
        <p className="board-detail-body">{post.body}</p>
      </article>

      <section className="board-replies">
        <h3>{t('board.repliesHeading')}</h3>
        {detail.replies.length === 0 ? (
          <p className="mute">{t('board.noReplies')}</p>
        ) : (
          <ul className="board-reply-list">
            {detail.replies.map((r) => (
              <li key={r.id}>
                <strong>{r.authorName}</strong>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="board-form board-reply-form">
        <label className="board-field">
          <span>{t('board.nick')}</span>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={40}
          />
        </label>
        <label className="board-field">
          <span>{t('board.replyField')}</span>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} maxLength={2000} rows={3} />
        </label>
        {error ? (
          <p className="push-note push-note-warn" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="btn btn-fill btn-block"
          disabled={busy || !reply.trim() || !authorName.trim()}
          onClick={() => void sendReply()}
        >
          {busy ? t('board.sending') : t('board.replySubmit')}
        </button>
      </div>
    </div>
  )
}
