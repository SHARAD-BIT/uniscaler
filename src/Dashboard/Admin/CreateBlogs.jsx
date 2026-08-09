"use client";
import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import "../styles/addPopularCollege.css";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import CryptoJS from "crypto-js";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [blogs, setBlogs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 5) {
      alert("Maximum 5 images are allowed");
      return;
    }
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", JSON.stringify(description));
    images.forEach((image) => formData.append(`images`, image));
    formData.append("link", link.trim());
    formData.append("token", getCookie("adminToken"));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/addBlogs`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.code === 201) {
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        setTitle("");
        setDescription([]);
        setImages([]);
        setLink("");
      } else {
        enqueueSnackbar(data.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const addDescriptionItem = () => {
    setDescription([...description, ""]);
  };

  const updateDescriptionItem = (index, value) => {
    const updatedDescription = [...description];
    updatedDescription[index] = value;
    setDescription(updatedDescription);
  };

  const removeDescriptionItem = (index) => {
    const updatedDescription = [...description];
    updatedDescription.splice(index, 1);
    setDescription(updatedDescription);
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/deleteBlogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            token: getCookie("adminToken"),
          }),
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        alert("Blog deleted successfully");
        fetchBlogs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Data = new Date().getDate();
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchBlogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: encryptedToken,
          }),
        }
      );
      const data = await response.json();
      setBlogs(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="createBlogs add-popular">
      <h2>Create Blogs</h2>
      <p>Here you can create new blogs.</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog title"
          />
        </div>
        <div className="input-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            required
            accept="image/*"
            multiple
            max={5}
            onChange={handleImageChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Add a Link for the blog"
          />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <div className="groups">
            {description.map((desc, index) => (
              <div key={index}>
                <textarea
                  value={desc}
                  required
                  onChange={(e) => updateDescriptionItem(index, e.target.value)}
                  placeholder={`Enter description ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeDescriptionItem(index)}
                >
                  Remove {index + 1}
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addDescriptionItem}>
            Add Description {description.length + 1}
          </button>
        </div>
        <button type="submit">Create Blogs</button>
      </form>
      <h3>All Blogs</h3>
      <div className="blogsContainer">
        {blogs.map((blog) => (
          <div className="blog" key={blog.id}>
            <h4>{blog.title}</h4>
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreateBlogs;
