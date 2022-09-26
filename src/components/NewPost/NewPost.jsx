import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./NewPost.css";

const NewPost = (props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState("");

  useEffect(() => {
    //go and get all posts from the server
    axios
      .get(`http://localhost:3001/api/posts`)
      .then((res) => setPosts(res.data));
  }, []);
  //! 1. create a function that can send a new post to the server
  const createPost = () => {
    const newPost = {
      caption: text,
      image: image,
    };

    axios.post("http://localhost:3001/api/posts", newPost);
  };

  //! 4. receive information from the server about newly created post
  return (
    <div className="post-form">
      <form onSubmit={createPost}>
        <input
          className="create-input"
          clas
          placeholder="What's your image URL?"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="create-input"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button variant="outline-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
