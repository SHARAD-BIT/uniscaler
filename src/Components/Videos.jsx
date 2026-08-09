"use client";
import { useEffect, useState } from "react";
import "./styles/videos.css";
import CryptoJS from "crypto-js";
const Videos = () => {
  const [video, setVideo] = useState(null);
  const Data = new Date().getDate();
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/getVideos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 && setVideo(data.data);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="top videos">
      <h1>Explore Our Videos</h1>
      <div className="wrapper">
        <h2>Youtube</h2>
        {video && video.length > 0 ? (
          video.map((video, index) => {
            return (
              <div className="video" key={index}>
                <iframe
                  src={video.link}
                  title="Uniscaler Youtube Videos"
                  allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })
        ) : (
          <h2> Loading... </h2>
        )}
      </div>
    </main>
  );
};

export default Videos;
