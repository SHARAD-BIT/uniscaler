"use client";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { deleteCookie } from "../../Helper/Helper";
import "../styles/Logout.css";
import { FaXTwitter } from "react-icons/fa6";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredUser } from "../../Helper/Helper";


const Logout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  // Read in an effect: this renders on the server too, where localStorage
  // does not exist.
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(getStoredUser()?.name || "");
  }, []);

  const logoutHandler = () => {
    deleteCookie("email");
    deleteCookie("token");
    localStorage.removeItem("name");
    enqueueSnackbar("Logout Successfull", {
      variant: "success",
      autoHideDuration: 3000,
    });
    navigate.replace("/login");
  };
  const socialMedia = [
    {
      id: 1,
      icon: <FaFacebookF />,
      url: "https://facebook.com",
    },
    {
      id: 2,
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@Uniscaler/",
    },
    {
      id: 3,
      icon: <FaInstagram />,
      url: "https://www.instagram.com/uniscaler?utm_source=qr&igsh=aHplZTFpY3I5aTRp",
    },
    {
      id: 4,
      icon: <FaXTwitter />,
      url: "https://twitter.com/Uniscaler",
    },
  ];
  return (
    <div className="logoutPage">
      <h1>
        This is a Logout page for{" "}
        <span style={{ color: "var(--accent)" }}>
          {userName}
        </span>
      </h1>
      <p>Thank you for using Uniscaler. click on below button to logout.</p>
      <div className="centerBtn">
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <p>
        Stay Connected Don&apos;t forget to follow us on our social media
        channels to stay up-to-date with the latest news, updates, and special
        offers.
      </p>
      <div className="social-Media">
        {socialMedia.map((item) => (
          <a href={item.url} key={item.id}>
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Logout;
