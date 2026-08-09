"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
