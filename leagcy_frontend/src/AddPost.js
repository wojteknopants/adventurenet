import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const AddPost = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = () => {
    API.get("/")
      .then((res) => {
        setPosts(res.data);
        // setTitle(res[0].title)
        // setContent(res[0].content)
        // setStarring(res[0].starring)
        // setPostId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { title, content };
    API.post("/", item).then(() => refreshPosts());
    setTitle("");
    setContent("");
  };

  const onUpdate = (id) => {
    let item = { title, content };
    API.patch(`/${id}/`, item).then((res) => refreshPosts());
    setPostId(null);
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshPosts());
  };

  function selectPost(id) {
    console.log("Hello World selectPost");
    let item = posts.filter((post) => post.id === id)[0];
    setTitle(item.title);
    setContent(item.content);
    setPostId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 ">
          <h3 className="float-left">Create a new Post</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>{postId}Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(postId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Post Title</th>
                <th scope="col">Content</th>
                <th scope="col">Icon</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr key="">
                    <th scope="row">{post.id}</th>
                    <td> {post.title}</td>
                    <td>{post.content}</td>
                    <td>
                      <button onClick={() => selectPost(post.id)}>Edit</button>
                      <button onClick={() => onDelete(post.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
