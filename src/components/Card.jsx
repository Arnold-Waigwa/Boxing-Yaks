import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ id, time, title, upvotes }) => {
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

  const formattedTime = timeAgo(time);
  return (
    <div className="card">
      <p className="card-time">Posted {formattedTime}</p>
      <Link to={`/postpage/${id}`}>
        <h2 className="card-title">{title}</h2>
      </Link>
      <p className="card-upvotes">{upvotes} upvotes</p>
    </div>
  );
};

export default Card;
