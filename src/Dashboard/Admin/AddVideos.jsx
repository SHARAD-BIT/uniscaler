"use client";
import { useEffect, useState } from "react";
import "../styles/addPopularCollege.css";
import { getCookie } from "../../Helper/Helper";

function AddYouTubeVideoForm() {
  const [videoLink, setVideoLink] = useState(""); // State for a single video link
  const [videos, setVideos] = useState([]);
  const [isVideo, setIsVideo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    isVideo.length > 0 && isVideo.includes(videoLink)
      ? alert("Already added")
      : await postData();
  };
  const postData = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/createVideoLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: videoLink,
        token: getCookie("adminToken"),
      }),
    }).then((res) =>
      res
        .json()
        .then((data) => {
          if (data.code === 201) {
            alert("Video link added successfully");
            fetchLink();
          }
        })
        .catch((err) => console.log(err))
    );
  };
  useEffect(() => {
    fetchLink().then((res) => {
      console.log(res);
    });
  }, []);
  const fetchLink = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/getVideoLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 && setVideos(data.data);
          data.code === 200 &&
            data.data.map((video) => {
              setIsVideo((pre) => [...pre, video.link]);
            });
        })
      )
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/deleteVideoLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        token: getCookie("adminToken"),
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.code === 200) {
            alert("Video link deleted successfully");
            fetchLink();
          } else {
            alert(data.message);
          }
        })
      )
      .catch((err) => console.log(err));
  };
  const filterVideoLink = (link) => {
    if (link.length > 0) {
      const iframeTag = link;
      const srcRegex = /src="([^"]*)"/;
      const match = iframeTag.match(srcRegex);
      if (match && match.length > 1) {
        const srcValue = match[1];
        setVideoLink(srcValue);
      } else {
        alert("No src value found in the iframe tag.");
        setVideoLink("");
      }
    }
  };
  return (
    <section className="addYouTubeVideo add-popular">
      <h2>Add YouTube Video Link</h2>
      <p>Here you can add a YouTube video link.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="videoLink">Video Link:</label>
          <input
            type="text"
            id="videoLink"
            required
            value={videoLink}
            onChange={(e) => filterVideoLink(e.target.value.trim())}
            placeholder="Paste YouTube video link here"
          />
        </div>
        <button type="submit">Add YouTube Video</button>
      </form>
      <details>
        <summary>What is this?</summary>
        <p>
          This is a form that allows you to add a YouTube video link. The video
          link you enter will be stored in the database.
        </p>
      </details>
      <p>
        <a
          href="https://support.google.com/youtube/answer/171780?hl=en"
          target="_blank"
          rel="noreferrer"
        >
          Here is how to add a YouTube video link
        </a>
      </p>
      <h3>All Links</h3>
      <div className="videoContainer">
        {videos.length > 0 &&
          videos.map((video, index) => (
            <div className="video" key={index}>
              <iframe
                src={video.link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => handleDelete(video.id)}
                title={"Delete video"}
              >
                Delete{" "}
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default AddYouTubeVideoForm;
