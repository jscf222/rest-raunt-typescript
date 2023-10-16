import { useContext, ReactNode } from "react"
import { CurrentUser } from "../contexts/CurrentUser"
import React from "react"

type Comment = {
  rant: boolean
  content: string
  author: {
    firstName: string
    lastName: string
  }
  stars: number
  authorId: string
}

type CommentCardProps = {
  comment: Comment
  onDelete: () => void
}

function CommentCard({ comment, onDelete }: CommentCardProps) {
  const currentUser = useContext(CurrentUser)

  let deleteButton: ReactNode | null = null

  if (currentUser?.currentUser.userId === comment.authorId) {
    deleteButton = (
      <button className="btn btn-danger" onClick={onDelete}>
        Delete Comment
      </button>
    )
  }

  return (
    <div className="border col-sm-4">
      <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
      <h4>{comment.content}</h4>
      <h3>
        <strong>- {comment.author.firstName} {comment.author.lastName}</strong>
      </h3>
      <h4>Rating: {comment.stars}</h4>
      {deleteButton}
    </div>
  )
}

export default CommentCard