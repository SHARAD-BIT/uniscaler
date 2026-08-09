"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import "../styles/websiteReports.css";

const WebsiteReports = () => {
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  console.log(list);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/reportAProblem`, {
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
        })
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  }, []);
  const DateConvertor = (timeStamp) => {
    const date = new Date(parseInt(timeStamp));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  return (
    <section className="websiteReports">
      <h2>Website&apos;s Report</h2>
      <ul>
        {list && list.length > 0 ? (
          list.map((item) => (
            <li key={item.id}>
              <p>
                <span>Email :</span> <strong>{item.email}</strong>{" "}
              </p>
              <p>
                <span>Report Details :</span> <strong>{item.problem}</strong>
              </p>
              <p>
                <span>Report time :</span>{" "}
                <strong>{DateConvertor(item.timeStamp)}</strong>
              </p>
            </li>
          ))
        ) : (
          <li>No data found</li>
        )}
      </ul>
    </section>
  );
};

export default WebsiteReports;
