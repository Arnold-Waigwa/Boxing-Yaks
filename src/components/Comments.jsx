import React, { useEffect, useState } from "react";
import "./Comments.css";
import { supabase } from "../client";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Utility function to display "time ago" format
  const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const secondsAgo = Math.floor((now - postDate) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }
  };

  // Fetch the comments related to the specific post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("Comments")
          .select("*")
          .eq("post_id", postId)
          .order("created_at", { descending: true });
        if (error) {
          throw error;
        }

        if (data) {
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    try {
      const { data, error } = await supabase.from("Comments").insert([
        {
          post_id: postId,
          content: newComment,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      if (data) {
        setComments((prevComments) => [...prevComments, data[0]]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-content">{comment.content}</p>
            <span className="comment-time">{timeAgo(comment.created_at)}</span>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-button">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
