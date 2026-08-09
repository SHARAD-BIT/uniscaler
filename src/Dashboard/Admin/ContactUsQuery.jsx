"use client";
import { useEffect, useState } from "react";
import "../styles/websiteReports.css";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";

const ContactUsQuery = () => {
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const DateConvertor = (timeStamp) => {
    const date = new Date(parseInt(timeStamp));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/contactUsData`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 && setList(data.list);
          data.code === 200 &&
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
        })
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  }, []);
  return (
    <section className="websiteReports">
      <h2>Contact Us Query</h2>
      <ul>
        {list && list.length > 0 ? (
          list.map((item) => {
            return (
              <li key={item.id}>
                <p>
                  <span>Email: </span>
                  {item.email}
                </p>
                <p>
                  <span>Phone: </span>
                  {item.phone}
                </p>
                <p>
                  <span>Message: </span>
                  {item.message}
                </p>
                <p>
                  <span>Date: </span>
                  {DateConvertor(item.timeStamp)}
                </p>
              </li>
            );
          })
        ) : (
          <li>No data found</li>
        )}
      </ul>
    </section>
  );
};

export default ContactUsQuery;
