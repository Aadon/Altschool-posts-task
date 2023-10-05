import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null); // store the id of the post
  const [input, setInput] = useState(""); // store input value for editing

  useEffect(() => {
    (async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await axios.get(url);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleEdit = (post) => {
    setInput(post.title);
    setEditId(post.id);
  };

  const handleUpdate = () => {
    setPosts(
      posts.map((post) =>
        post.id === editId ? { ...post, title: input } : post
      )
    );
    setInput("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="post">
            {post.id === editId ? (
              <input
                type="text"
                placeholder="edit post"
                value={input}
                onChange={handleChange}
              />
            ) : (
              post.title
            )}
            <div className="btn">
              {post.id === editId ? (
                <button onClick={handleUpdate}>Update</button>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit(post)}>
                  Edit
                </button>
              )}
              <button
                className="delete-btn"
                onClick={() => {
                  handleDelete(post.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
