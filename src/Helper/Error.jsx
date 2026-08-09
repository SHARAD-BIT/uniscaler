"use client";
import { useRouteError } from "react-router";
import Link from "next/link";


const Error = () => {
  const error = useRouteError();
  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        We are sorry for any inconvenience caused. We are working on it. We will
        update our website with the latest information. please go to report
        section by click on this link
      </p>
      <Link href={"/report"}>Report a Problem</Link>
    </div>
  );
};

export default Error;
