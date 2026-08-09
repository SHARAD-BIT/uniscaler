"use client";
import { useState } from "react";
import "./styles/newsLetter.css";
import { useSnackbar } from "notistack";

const NewsLetter = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const filterInputStringToPreventSQLInjection = (input) => {
    return input.replace(/[^a-zA-Z0-9\s@.-]/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL + "/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: filterInputStringToPreventSQLInjection(newsLetterEmail),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewsLetterEmail("");
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };
  return (
    <section className="news-letter">
      <div className="text-wrapper">
        <h1>Subscribe our newsletter</h1>
        <p>Subscribe our newsletter to get latest news and updates.</p>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <input
            required
            autoComplete="on"
            type="email"
            name="newsLetterEmail"
            id="newsLetterEmail"
            placeholder="Your email"
            value={newsLetterEmail}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address"
            onChange={(e) => setNewsLetterEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
