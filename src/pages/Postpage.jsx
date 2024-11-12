import React, { useEffect, useState } from "react";
import "./Postpage.css";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const Postpage = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    time: "",
    title: "",
    content: "",
    image: "",
    likes: 0,
  });

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

  // Fetch the post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setData({
            time: timeAgo(data.created_at),
            title: data.title,
            content: data.content,
            image: data.image,
            likes: data.upvotes || 0, // Set likes state from database
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchData();
  }, [id]);

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      // Increment the likes count
      const newLikes = data.likes + 1;

      // Update likes in the Supabase database
      const { error } = await supabase
        .from("Posts")
        .update({ upvotes: newLikes })
        .eq("id", id);

      if (error) throw error;

      // Update the likes state in React
      setData((prevData) => ({
        ...prevData,
        likes: newLikes,
      }));
    } catch (error) {
      console.error("Error updating likes:", error.message);
    }
  };

  return (
    <div>
      <div className="post-container">
        <p>{data.time}</p>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        {data.image && <img src={data.image} alt="Post content" />}

        {/* Like Button */}
        <div className="like-button-container">
          <button onClick={handleLike} className="like-button">
            👍 Like ({data.likes})
          </button>
        </div>
      </div>
      <Comments postId={id} />
    </div>
  );
};

export default Postpage;
