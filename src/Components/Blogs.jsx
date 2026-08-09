"use client";
import { useEffect, useState } from "react";
import "./styles/blogs.css";
import CryptoJS from "crypto-js";
import Link from "next/link";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/Helper/NavigationState";

// import blogImg from "../assets/blogImg.jpg";
import authorSrc from "../assets/mainLogoMobile.svg";

const author = authorSrc.src;
const Blogs = () => {
  const [blogList, setBlogList] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [articleData, setArticleData] = useState(null);
  const navigate = useRouter();
  const { setNavState } = useNavigationState();
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
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 && setBlogList(data.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);


  const ShowArticle = (data) => {
    setIsShowing(true);
    setArticleData(data);
  };
  // useEffect(() => {
  //   isShowing
  //     ? (document.body.style.overflow = "hidden")
  //     : (document.body.style.overflow = "auto");
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };


  // }, [isShowing]);


  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
      // Redirect to article page
      // navigate.push(`${articleData.timeStamp}`); // Or dynamic like `/article/${articleData.id}`
      // Absolute path: React Router resolved this against the /blogs route,
      // Next resolves it against the current URL.
      setNavState({ id: articleData.id });
      navigate.push(`/blogs/${articleData.timeStamp}`);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowing]);

  return (
    <main className="top blogs">
      <div className="blog-header">
        <div className="textE">
          <h1>Welcome to Uniscaler Blogs.</h1>
          <p>
            Here you can find blogs related to your future life, student&apos;s
            life struggles, and more.
          </p>
        </div>
        {/* <div className="imgWrapper">
          <img src={blogImg} alt="img" />
        </div> */}
      </div>
      <article className="blog">
        <ul>
          {blogList && blogList.length > 0 ? (
            blogList.map((item) => (
              <li
                key={JSON.parse(item.id)}
                className="blogItem"
                title={item.title}
              >
                <div className="blogImage" >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BLOG_IMAGES}${JSON.parse(item.image)[0]}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="blogText" onClick={() => ShowArticle(item)}>
                  <h2 className="title">{item.title}</h2>
                  {/* <p className="description">
                    {JSON.parse(`${item.description.toString()}`)[0]}
                  </p> */}
                  <div className="info">
                    <div className="imgWrap">
                      <img src={author} alt="author" loading="lazy" />
                    </div>
                    <p className="date">
                      {" "}
                      Posted : {item.timeStamp}
                      <br />
                      Author : <i>Admin</i>
                    </p>
                  </div>
                  <button onClick={() => ShowArticle(item)}>
                    Read article
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>Blog not found</li>
          )}
        </ul>
      </article>
      {isShowing && (
        <article className="blogContainer">
          <div className="close" onClick={() => setIsShowing(false)}>
            <IoCloseCircleOutline />
          </div>
          <div className="title">
            <h1>{articleData.title}</h1>
          </div>
          <div className="heroSection">
            <div className="image">
              <img
                src={`${process.env.NEXT_PUBLIC_BLOG_IMAGES}${JSON.parse(articleData.image)[0]}`}
                alt={articleData.title}
                loading="lazy"
              />
            </div>
            <div className="text">
              {JSON.parse(articleData.description).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
              <Link href={articleData.link.trim()} className="li">
                Know more
              </Link>
            </div>
          </div>
          <h3
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "-40px",
              marginTop: "20px",
              color: "var(--accent)",
            }}
          >
            Related images:
          </h3>
          <div className="related-images">
            {JSON.parse(articleData.image).map((item, index) => (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_BLOG_IMAGES}${item}`}
                alt={articleData.title}
                loading="lazy"
              />
            ))}
          </div>
        </article>
      )}
    </main>
  );
};

export default Blogs;
