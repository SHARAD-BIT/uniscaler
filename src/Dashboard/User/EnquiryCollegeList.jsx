"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import "../styles/enquiry.css";

const EnquiryCollegeList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-colleges`, {
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
          setList(data.list);
        }
      });
    });
  }, []);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC", // Assuming the input string is in UTC timezone
  };
  return (
    <section className="enquiryCollegeList">
      <h1>
        <q>List the colleges that you have inquired about.</q>
      </h1>
      <ul>
        {list &&
          list.length > 0 &&
          list.map((item) => {
            return (
              <li key={item.id}>
                <div className="info">
                  Name : <span className="text"> {item.collegeName} </span>
                </div>
                <div className="info">
                  Enquiry Time :{" "}
                  <span className="text">
                    {" "}
                    {new Date(item.timeStamp).toLocaleDateString(
                      "en-In",
                      options
                    )}{" "}
                  </span>
                </div>
                <div className="info">
                  Status : <span>{item.status}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default EnquiryCollegeList;
