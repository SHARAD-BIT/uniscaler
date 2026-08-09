"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import "../styles/paidColleges.css";

const PaidColleges = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const title = document.title;
    fetch(process.env.NEXT_PUBLIC_API_URL + "/paid-colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: getCookie("email"),
        token: getCookie("token"),
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 200) {
          setData(data.collegesList);
        }
      });
    });
    console.log(data);
    return () => {
      document.title = title;
    };
  }, []);
  return (
    <section className="userPaidColleges">
      <h2>Paid Colleges</h2>
      <p>
        Here You find the list of paid colleges available on Uniscaler that
        you have paid for in the past.
      </p>
      {data && data.length > 0 ? (
        <div className="PaidCollegeList">
          {data.map((item, index) => {
            return (
              <div className="listData" key={item.collegeName + (index + 1)}>
                <h3>{item.collegeName}</h3>
                <ul>
                  {item.wishlist.map((course) => {
                    return <li key={course}>{course}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        "No data Found"
      )}
    </section>
  );
};

export default PaidColleges;
