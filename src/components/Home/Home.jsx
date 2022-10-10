import React, { useState, useEffect } from "react";
import InstaNav from "../InstaNav/InstaNav";
import NewPost from "../NewPost/NewPost";
import axios from "axios";
import Posts from "../Posts/Posts";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    return axios.get("http://localhost:3001/api/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getData().then(() => setLoading(false));
  }, []);

  return (
    <div className="app-container">
      <InstaNav />
      <NewPost />
      {loading ? (
        <div className="hourglass"></div>
      ) : (
        <div className="post-div">
          <Posts data={getData} posts={posts} />
        </div>
      )}
    </div>
  );
}

export default Home;
