"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import SideBar from "../SideBar";
import "../styles/dashboard.css";
import Content from "./Content";
import { getCookie } from "../../Helper/Helper";
import Loader from "../../Utils/Loader";
import { useSnackbar } from "notistack";

import UpdateProfile from "./UpdateProfile";
import NewsLetter from "./NewsLetter";
import ChangePassword from "./ChangePassword";
import Logout from "./Logout";
import PaidColleges from "./PaidColleges";
import EnquiryCollegeList from "./EnquiryCollegeList";
import PopularCollege from "./PopularCollege";

const DashboardUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const param = usePathname().split("/")[2];
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState(param);
  // `<Content name={name} />` below referenced an identifier that was never
  // declared. In a browser it silently resolved to the `window.name` global —
  // empty by default — so the heading read "Welcome to  !". On the server that
  // global does not exist, so it threw and took the whole render down. Holding
  // the value in state fixes the crash and shows the name that was intended.
  const [userName, setUserName] = useState("");
  const sideBarItem = [
    {
      name: "Dashboard",
      path: "/user-dashboard/dashboard",
    },
    {
      name: "Common application Form",
      path: "/user-dashboard/my-college",
    },

    {
      name: "Enquiry",
      path: "/user-dashboard/enquiry",
    },
    {
      name: "Update Profile",
      path: "/user-dashboard/update",
    },
    {
      name: "Change Password",
      path: "/user-dashboard/change-password",
    },
    {
      name: "Popular College",
      path: "/user-dashboard/popular-college",
    },
    {
      name: "NewsLetter",
      path: "/user-dashboard/news-letter",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Logout",
      path: "/user-dashboard/logout",
    },
  ];
  const navigate = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
    const title = document.title;
    var timer;
    if (!getCookie("token") && !getCookie("email")) {
      enqueueSnackbar("Please login to continue", {
        variant: "error",
        autoHideDuration: 3000,
      });
      timer = setTimeout(() => {
        navigate.replace("/login");
      }, 3000);
    }
    document.title = "Dashboard - Uniscaler";
    if (getCookie("token") && getCookie("email")) {
      setLoading(true);
      fetch(process.env.NEXT_PUBLIC_API_URL + "/get-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: getCookie("email"),
          token: getCookie("token"),
        }),
      })
        .then((res) => {
          res
            .json()
            .then((data) => {
              if (data.code === 200) {
                document.title = `Dashboard - ${data.name} - Uniscaler`;
                enqueueSnackbar(data.message, {
                  variant: "success",
                  autoHideDuration: 2000,
                });
                data.name !== "" &&
                  localStorage.setItem("name", JSON.stringify(data));
                data.name && setUserName(data.name);
              }
              data.name !== "" && setReq(param || "dashboard");
            })
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                autoHideDuration: 2000,
              });
            });
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            autoHideDuration: 2000,
          });
        })
        .finally(() => setLoading(false));
    }
    return () => {
      document.title = title;
      clearTimeout(timer);
    };
  }, []);
  useLayoutEffect(() => {
    setReq(param);
  }, [param]);
  return (
    <main className="top dashboard">
      {loading ? (
        <Loader />
      ) : (
        <section className="dashboardBox">
          <SideBar sidebarItem={sideBarItem} />
          {req === "dashboard" ? (
            <Content name={userName} />
          ) : req === "update" ? (
            <UpdateProfile />
          ) : req === "change-password" ? (
            <ChangePassword />
          ) : req === "news-letter" ? (
            <NewsLetter />
          ) : req === "logout" ? (
            <Logout />
          ) : req === "my-college" ? (
            <PaidColleges />
          ) : req === "enquiry" ? (
            <EnquiryCollegeList />
          ) : req === "popular-college" ? (
            <PopularCollege />
          ) : null}
        </section>
      )}
    </main>
  );
};

export default DashboardUser;
