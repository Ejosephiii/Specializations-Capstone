import React from "react";
import Post from "../Post/Post";
import "./Posts.css";

const Posts = (props) => {
  return (
    <div className="posts-container">
      {props.posts.map((post) => (
        <Post data={props.data} key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
