import React, { useEffect, useState } from "react";
import "./Home.css";
import { supabase } from "../client";
import Card from "../components/Card";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from("Posts").select();
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  //insert uuid to comment page
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="order-container">
        <p>Order by:</p>
        <button>Newest</button>
        <button>Most Popular</button>
      </div>
      <div className="card-container">
        {posts && posts.length > 0 ? (
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
