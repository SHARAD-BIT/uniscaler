"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import "../styles/userEnquiry.css";

const PopularQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [enquiry, setEnquiry] = useState([]);
  const fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/getPopularCollegesUserQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
      }),
    })
      .then((res) =>
        res.json().then((data) => data.code === 200 && setEnquiry(data.data))
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/changeStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
        id: id,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.code === 200) {
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
            fetchData();
          } else {
            enqueueSnackbar(data.message, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
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
    <section className="userEnquiry">
      <h1>User enquiry for colleges and courses</h1>
      <p>
        Total number of enquiry is <span>{enquiry.length}</span>
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>College or Course Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enquiry</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiry && enquiry.length > 0 ? (
            enquiry.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.collegeName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      disabled={item.status !== "Pending"}
                      onClick={() => {
                        handleChange(item.id);
                      }}
                    >
                      {item.status === "Pending" ? "Accept" : "Accepted"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">There is no pending Enquiry</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default PopularQuery;
