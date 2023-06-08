import React, { useState, useEffect } from "react";
import axios from "axios";

const Operations = () => {
  const [post, setPost] = useState([]);
  const API = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(API);
      // console.log(res)
      setPost(res);
    };
    getPost();
  }, []);

  const addPost = async () => {
    const data = {
      id: "1",
      title: "Hello",
      body: "Hello I am new data in this database",
    };
    await axios.post(API, data);
    setPost([data, ...post]);
  };

  const handleUpdate = async (post) => {
    post.title = "Updated";
    await axios.put(API + "/" + post.id);
    const postsClone = [...post];
    const index = postsClone.indexOf(post);
    postsClone[index] = { ...post };
    setPost(postsClone);
  };

  const handleDelete = async (post) => {
    await axios.delete(API + "/" + post.id + post);
    setPost(post.filter((p) => p.id !== post.id));
  };

  return (
    <div>
      <div class="container">
        <h3>There is the total length of data is {post.length} in database</h3>
        <div class="row">
          <div class="col" style={{ border: "2px solid black" }}>
            <b>S.no</b>
          </div>
          <div class="col" style={{ border: "2px solid black" }}>
            <b>Title</b>
          </div>
          <div class="col" style={{ border: "2px solid black" }}>
            <b>Body</b>
          </div>
          <div class="col" style={{ border: "2px solid black" }}>
            <b>Actions</b>
          </div>
        </div>
      </div>

      {post.map((item) => {
        const { id, title, body } = item;
        return (
          // console.log(item.title)
          <>
            <div class="container" key={id}>
              <div class="row">
                <div class="col" style={{ border: "2px solid black" }}>
                  {id}
                </div>
                <div class="col" style={{ border: "2px solid black" }}>
                  {title}
                </div>
                <div class="col" style={{ border: "2px solid black" }}>
                  {body}
                </div>
                <div class="col" style={{ border: "2px solid black" }}>
                  <button
                    type="button"
                    onClick={addPost}
                    class="btn btn-success"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => handleUpdate(post)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Operations;
