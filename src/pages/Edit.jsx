import React, { useEffect, useState } from "react";
import "./Edit.css";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const Edit = () => {
  const { id } = useParams(); // Use 'id' for clarity
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  // Fetch the post data based on the ID from the URL
  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single(); // Since we're fetching a single post

      if (error) {
        throw error;
      } else if (data) {
        setPost(data); // Set the state to the fetched post data
      }
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Handle input changes and update the post state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission to update the post
  const updatePost = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase
        .from("Posts")
        .update({
          title: post.title,
          content: post.content,
          image: post.image,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Optionally navigate back to the home page or a success page
      window.location = "/";
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={updatePost}>
        <input
          name="title"
          value={post.title}
          onChange={handleChange}
          type="text"
          placeholder="Title"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          id="content"
          placeholder="Content (Optional)"
        />
        <input
          name="image"
          value={post.image}
          onChange={handleChange}
          type="text"
          placeholder="Image URL (Optional)"
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default Edit;
