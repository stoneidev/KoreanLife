export type BoardPost = {
  id: string
  title: string
  body: string
  authorName: string
  createdAt: number
  lang: string
  replyCount: number
}

export type BoardReply = {
  id: string
  postId: string
  body: string
  authorName: string
  createdAt: number
}
