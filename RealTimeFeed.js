import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../services/api";

const RealTimeFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const data = await fetchUserPosts(userId);
      setPosts(data || []);
    };
    getFeed();
    
    const interval = setInterval(getFeed, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div>
      <h2>Real-Time Feed</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.content}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeFeed;
