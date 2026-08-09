"use client";
import PropTypes from "prop-types";
import "./styles/card.css";
import Image from "next/image";
import { isOptimizable } from "../lib/images";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getCookie } from "../Helper/Helper";
import CryptoJS from "crypto-js";
const Card = ({ img, title, des, link, type }) => {
  const navigate = useRouter();
  const getAdvice = () => {
    // check user logged in or not
    const email = getCookie("email");
    const token = getCookie("token");
    function merchantTransactionId() {
      return (
        "MT" + Math.random().toString(36).substr(2, 20).toLocaleUpperCase()
      );
    }
    const Data = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();
    if (email && token) {
      fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/mentorPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          amount: 499,
          token: encryptedToken,
          transactionId: merchantTransactionId(),
        }),
      })
        .then((res) => res.json())
        .then((url) => {
          window.location.href = url.url;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate.replace("/login");
    }
  };
  return (
    <div className={`card ${type === "college" ? "college" : "user"}`}>
      <div className="image">
        {/*
          width/height rather than `fill`, because this image has two very
          different shapes: card.css sizes it 100%/100% inside a 200px box for
          type="college", and 100×100 with border-radius:50% for type="user".
          `fill` would absolutely-position it and break the round avatar.

          The numbers below only declare the aspect ratio Next uses to pick a
          srcset entry — the CSS above still decides the rendered size.
        */}
        <Image
          src={img}
          alt={title}
          width={320}
          height={200}
          loading="lazy"
          sizes="(max-width: 768px) 80vw, 320px"
          unoptimized={!isOptimizable(img)}
        />
      </div>
      <div className="text">
        <h3>{title}</h3>
        <p>{des}</p>
        <div className="link">
          {type === "college" ? (
            <Link href={link}
              target="_blank"
              referrerPolicy="no-referrer"
              title="Click to Visit"
            >
              Know more
            </Link>
          ) : (
            <button className="btnLink" onClick={() => getAdvice()}>
              Get an Advice
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  des: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
};
