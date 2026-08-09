"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useEffect, useState } from "react";
import "./styles/blogsContent.css";
import CryptoJS from "crypto-js";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";


const BlogsContent = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(0);
  const { navState } = useNavigationState();

  const Data = new Date().getDate();
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchBlogs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          const filteredData = data.data.find(
            (element) => element.id === navState?.id
          );
          if (filteredData) {
            setBlogData(filteredData);
          } else {
            setError("Blog post not found");
          }
        } else {
          setError("Failed to fetch blog data");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred while fetching the blog");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = () => {
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScroll(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <main className="top blogsContents">
        <div className="blogsContents-loading">
          <div className="spinner"></div>
          <p>Loading blog post...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="top blogsContents">
        <div className="blogsContents-error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!blogData) {
    return (
      <main className="top blogsContents">
        <div className="blogsContents-not-found">
          <h2>Blog Post Not Available</h2>
          <p>The requested blog post could not be found.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="progress-header">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${scroll}%` }}></div>
        </div>
      </div>
      <main className="blogsContents">
        <article className="blogsContents-article">
          <header className="blogsContents-header">
            <h1 className="blogsContents-title">{blogData.title}</h1>
            {blogData.author && (
              <p className="blogsContents-author">By {blogData.author}</p>
            )}
            {blogData.timeStamp && (
              <p className="blogsContents-date">
                Published on {new Date(blogData.timeStamp).toLocaleDateString()}
              </p>
            )}
            {blogData.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_BLOG_IMAGES}${
                  JSON.parse(blogData.image)[0]
                }`}
                alt={blogData.title}
                loading="lazy"
                className="blogsContents-featured-image"
              />
            )}
          </header>

          <div className="blogsContents-content text description">
            {JSON.parse(blogData.description).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <Link href={"/"} className="li">
              Know more
            </Link>
          </div>

          <footer className="blogsContents-footer">
            {blogData.tags && (
              <div className="blogsContents-tags">
                {blogData.tags.map((tag, index) => (
                  <span key={index} className="blogsContents-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </article>
        {/* <aside className="blogsContents-sidebar">hello world</aside> */}
      </main>
    </>
  );
};

// const styles = {
//   header: {
//     position: "fixed",
//     top: "80px",
//     zIndex: 1,
//     width: "100%",
//   },
//   progressContainer: {
//     width: "100%",
//     height: "5px",
//     background: "#ccc",
//   },
//   progressBar: {
//     height: "5px",
//     background: "#09cc58",
//     width: "0%",
//   },
// };

export default BlogsContent;
