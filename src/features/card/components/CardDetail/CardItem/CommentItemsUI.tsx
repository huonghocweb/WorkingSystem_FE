"use  client";
import { CommentRequest, CommentResponse } from "@/src/types/comment";
import styles from "../CardDetail.module.css";
import { useState } from "react";

interface CommentProps {
  comments: CommentResponse[];
  handleCreateComment: (commentContent: string) => void;
  handleCreateCommentReply: (commentParentId: number, commentContent: string) => void;
  handleDeleteComment: (commentId: number) => void;
}

export const CommentItemsUI = ({
  comments,
  handleCreateComment,
  handleCreateCommentReply,
  handleDeleteComment,
}: CommentProps) => {
  const [content, setContent] = useState("");
  const [commentReply, setCommentReply] = useState<CommentResponse>();
  const onSend = () => {
    if (content.trim()) {
      if (!!commentReply && content.startsWith("@")) {
        console.log("xoa @", content);
        const cleanContent = content.replace(`@${commentReply.user.userName}`, "").trim();
        console.log("comment reply: ", cleanContent);
        handleCreateCommentReply(commentReply?.commentId, cleanContent);
        setContent("");
      } else {
        console.log("comment: ", content);
        handleCreateComment(content);
        setContent("");
      }
    }
  };
  return (
    <>
      <div className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>
          <span>💬</span> Comments
        </h3>

        <div className="d-flex flex-column gap-3 mt-3">
          <div className="d-flex gap-2">
            <div className={styles.avatar} style={{ backgroundColor: "#4c5b76" }}>
              HP
            </div>
            <div className={styles.commentInputWrapper}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận..."
                rows={2}
                className="w-100"
              />
            </div>
            <button onClick={() => onSend()} className="btn btn-xs btn-primary">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>

          {comments
            .filter((comment) => comment.parentId === null)
            .map((comment) => (
              <CommentItem
                key={comment.commentId}
                comment={comment}
                handleCreateCommentReply={handleCreateCommentReply}
                handleDeleteComment={handleDeleteComment}
                setContent={setContent}
                setCommentReply={setCommentReply}
              />
            ))}
        </div>
      </div>
    </>
  );
};

//Đưa nội dung phần thông tin 1 comment vào item riêng để tránh lặp lại nhiều lần khi gọ comment và replies của nó
const CommentItem = ({
  comment,
  handleCreateCommentReply,
  handleDeleteComment,
  setContent,
  setCommentReply,
}: {
  comment: CommentResponse;
  handleCreateCommentReply: (commentParentId: number, commentContent: string) => void;
  handleDeleteComment: (commentId: number) => void;
  setContent: (content: string) => void;
  setCommentReply: (commentReply: CommentResponse) => void;
}) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentItem}>
        <img className={styles.avatar} src={comment.user.imageUrl} />
        <div className="flex-grow-1">
          <div className="d-flex align-items-baseline gap-2">
            <strong style={{ fontSize: "14px" }}>{comment.user.userName}</strong>
            <span style={{ fontSize: "12px", color: "#5e6c84" }}>
              {new Date(comment.createAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className={`${styles.commentBubble} mt-1`}>{comment.commentContent}</div>
          <div className="mt-1" style={{ fontSize: "12px", color: "#5e6c84" }}>
            {/* Nếu được bổ sung thêm ẩn nút reply comment của chính bản thân . */}
            <span
              onClick={() => {
                setCommentReply(comment);
                setContent(`@${comment.user.userName}`);
              }}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Reply
            </span>
            {" •   "}
            <span
              onClick={() => handleDeleteComment(comment.commentId)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Delete
            </span>
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replyList}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.commentId}
              comment={reply}
              handleCreateCommentReply={handleCreateCommentReply}
              handleDeleteComment={handleDeleteComment}
              setContent={setContent}
              setCommentReply={setCommentReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};
