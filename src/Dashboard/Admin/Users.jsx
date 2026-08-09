"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import "../styles/users.css";
const Users = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/getAllUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
      }),
    })
      .then((res) =>
        res.json().then((data) => data.code === 200 && setUserData(data.data))
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  }, []);
  return (
    <section className="users">
      <h1>Users Details</h1>
      <p>Here you can check all the users details 😀</p>
      <p>
        Total number of users :
        {userData && userData.length > 0 ? userData.length : 0}
      </p>
      <p>
        total verified users :
        {userData && userData.length > 0
          ? userData.filter((item) => item.status === 1).length
          : 0}
      </p>
      <ul>
        {userData && userData.length > 0
          ? userData.map((item) => {
              return (
                <li key={item.id}>
                  <p>
                    <span>Name:</span>
                    {item?.fullname === "" ? "NA" : item?.fullname}
                  </p>
                  <p>
                    <span>Email:</span>
                    {item?.email === "" ? "NA" : item?.email}
                  </p>
                  <p>
                    <span>Phone:</span>
                    {item?.phone === "" ? "NA" : item?.phone}
                  </p>
                  <p>
                    <span>Address:</span>
                    {item?.city === "" ? "NA" : item?.city}
                  </p>
                  <p>
                    <span>State: </span>
                    {item?.state === "" ? "NA" : item?.state}
                  </p>
                  <p>
                    <span>Country:</span>{" "}
                    {item?.country === "" ? "NA" : item?.country}
                  </p>
                  <p>
                    <span>Pincode:</span>
                    {item?.pincode === "undefined" ? "NA" : item?.pincode}
                  </p>
                  <p>
                    <span>Status:</span>{" "}
                    {item.status === 1 ? "Verified" : "Not Verified"}
                  </p>
                </li>
              );
            })
          : "Loading ..."}
      </ul>
    </section>
  );
};

export default Users;
