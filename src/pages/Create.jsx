import React, { useState } from "react";
import "./Create.css";
import { supabase } from "../client";

const Create = () => {
  const [post, setPost] = useState({ title: "", content: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const createPost = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase
        .from("Posts")
        .insert([
          { title: post.title, content: post.content, image: post.image },
        ]);

      if (error) throw error;

      window.location = "/";
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={createPost}>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Create;
