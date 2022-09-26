import axios from "axios";
import React, { useState } from "react";
import "./Post.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Post = (props) => {
  console.log(props);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [showFull, setShowFull] = useState(true);
  const [toggle, setToggle] = useState(true);
  //go and get all posts from the server

  const shortCap = props.post.caption.slice(0, 59);

  const editPost = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/posts`, {
        data: { caption, id: props.post.post_id },
      })
      .then(() => props.data())
      .catch((err) => console.log(err));
  };

  const deletePost = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/api/posts`, {
        data: { id: props.post.post_id },
      })
      .then(() => props.data())
      .catch((err) => console.log(err));
  };
  console.log(props.post.image);
  return (
    <div className="post-container">
      <div className="post-inner">
        <div className="color">
          <img className="post-image" src={props.post.image} alt="alt" />
        </div>

        <div className="post-div-line"></div>
        <div className="">
          <BiDotsVerticalRounded
            onClick={() => setToggle(!toggle)}
            className="edit-toggle"
            size="30px"
          ></BiDotsVerticalRounded>
        </div>

        <p onClick={() => setShowFull(!showFull)}>
          {showFull ? props.post.caption : shortCap + "..."}
        </p>
        {toggle ? null : (
          <div>
            <form onSubmit={editPost}>
              <input
                className="input-delete"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's your new caption?"
              ></input>
              <button variant="outline-primary" size="sm">
                Edit
              </button>
            </form>
            <button variant="outline-primary" size="sm" onClick={deletePost}>
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
