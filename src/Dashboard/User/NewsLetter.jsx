"use client";
import { useState } from "react";
import "../styles/newsLetter.css";
import { getCookie } from "../../Helper/Helper";
const NewsLetter = () => {
  const [result, setResult] = useState(null);
  function checkNewsLetter() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: getCookie("email"),
        token: getCookie("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setResult(data.message);
        } else if (data.code === 500) {
          setResult(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section className="infoNews">
      <h1>
        Subscribe to our <span>Newsletter</span>
      </h1>
      <p>
        Subscribe to our newsletter to get latest news and updates on Uniscaler
        College
      </p>
      <div className="centerBtn">
        {" "}
        <button onClick={checkNewsLetter}>
          Check Our <span>Newsletter</span> Subscription
        </button>
      </div>
      {result && <p>{result}</p>}
    </section>
  );
};

export default NewsLetter;
