import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../services/api";

const TrendingPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchUserPosts(userId);
      setPosts(data || []);
    };
    getPosts();
  }, [userId]);

  return (
    <div>
      <h2>Trending Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>Post ID:</strong> {post.id} <br />
            <strong>Content:</strong> {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
