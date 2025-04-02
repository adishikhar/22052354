import React, { useEffect, useState } from "react";
import { fetchPostComments } from "../services/api";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const data = await fetchPostComments(postId);
      setComments(data || []);
    };
    getComments();
  }, [postId]);

  return (
    <div>
      <h3>Comments for Post {postId}</h3>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.content}</strong>
            </li>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </ul>
    </div>
  );
};

export default PostComments;
