"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import "../styles/popularColleges.css";

const PopularCollegesData = () => {
  const [list, setList] = useState();
  useEffect(() => {
    const email = getCookie("email");
    const token = getCookie("token");
    token &&
      email &&
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/popularCollegeList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
        }),
      })
        .then((res) => res.json().then((data) => setList(data.list)))
        .catch((err) => console.log(err));
  }, []);
  return (
    <section className="popularColleges">
      <h1>
        Here you can check our <span>Popular Colleges Application Status</span>
      </h1>
      <ul className="popularCollegesList">
        {list && list.length > 0
          ? list.map((item) => {
              return (
                <li key={item.id}>
                  <div className="info">
                    <h4>College Name</h4>
                    <p>{item.collegeName}</p>
                  </div>
                  <div className="info">
                    <h4>Course Name</h4>
                    <p>{item.courseName}</p>
                  </div>
                  <div className="info">
                    <h4>Application Status</h4>
                    <p>{item.status}</p>
                  </div>
                </li>
              );
            })
          : "No Data Found"}
      </ul>
    </section>
  );
};

export default PopularCollegesData;
