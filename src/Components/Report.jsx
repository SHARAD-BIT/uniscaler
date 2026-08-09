"use client";
import { useEffect, useState } from "react";
import "./styles/Report.css";
import NewsLetter from "../Decorators/NewsLetter";
import { useSnackbar } from "notistack";
const ReportProblemPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const filterInputStringToPreventSQLInjection = (input) => {
      return input.replace(/[^a-zA-Z0-9\s@.,-]/g, "");
    };

    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/reportAProblem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: filterInputStringToPreventSQLInjection(name),
        email: filterInputStringToPreventSQLInjection(email),
        problem: filterInputStringToPreventSQLInjection(problemDescription),
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 201 &&
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
          data.code === 201 &&
            (setName(""), setEmail(""), setProblemDescription(""));
        })
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <main className="report-problem-container top">
      <div className="form-wrapper">
        <h1>Report a Problem</h1>
        <p>
          If you encounter any issues or problems while using our website,
          please fill out the form below to report the problem to our support
          team.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {" "}
            {/* Apply CSS class to form group */}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="problemDescription">Problem Description:</label>
            <textarea
              id="problemDescription"
              value={problemDescription}
              onChange={(event) => setProblemDescription(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>{" "}
        </form>
      </div>
      <NewsLetter />
    </main>
  );
};

export default ReportProblemPage;
