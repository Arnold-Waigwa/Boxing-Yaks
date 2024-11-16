import React, { useEffect, useState } from "react";
import "./Home.css";
import { supabase } from "../client";
import Card from "../components/Card";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to change sort to "created_at" (newest first)
  const handleNewest = () => {
    setOrderBy("created_at");
  };

  // Function to change sort to "upvotes" (most popular)
  const handlePopular = () => {
    setOrderBy("upvotes");
  };

  // Function to fetch posts based on the current "orderBy" value
  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order(orderBy, { ascending: false });
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts whenever "orderBy" changes
  useEffect(() => {
    fetchPost();
  }, [orderBy]);

  return (
    <>
      <div className="order-container">
        <p>Order by:</p>
        <button onClick={handleNewest}>Newest</button>
        <button onClick={handlePopular}>Most Popular</button>
      </div>

      <div className="card-container">
        {isLoading ? (
          <h2>Loading posts...</h2>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              time={post.created_at}
              upvotes={post.upvotes}
            />
          ))
        ) : (
          <h2>No Posts Yet 😞</h2>
        )}
      </div>
    </>
  );
};

export default Home;
