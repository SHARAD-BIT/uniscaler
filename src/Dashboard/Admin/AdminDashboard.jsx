"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoginAdmin from "./LoginAdmin";
import { getCookie } from "../../Helper/Helper";
import SideBar from "../SideBar";
import "../styles/adminDashboard.css";

import Users from "./Users";
import UserEnquiry from "./UserEnquiry";
import Logout from "./Logout";
import AddCollegeInSearch from "./AddCollegeInSearch";
import AddPopularCollege from "./AddPopularCollege";
import CreateBlogs from "./CreateBlogs";
import WebsiteReports from "./WebsiteReports";
import ContactUsQuery from "./ContactUsQuery";
import { useEffect, useState } from "react";
import PopularQuery from "./PopularQuery";
import AddYouTubeVideoForm from "./AddVideos";

const AdminDashboard = () => {
  const path = usePathname().split("/")[2];
  // Starts false rather than reading the cookie during render. The server has
  // no cookie, so it rendered the login form while the client rendered the
  // panel — a hydration mismatch (React #418) on every admin route. The effect
  // below already reads the cookie after mount, which is where it belongs.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useRouter();
  const sidebarItem = [
    {
      name: "Users",
      path: "/admin-dashboard/users",
    },
    {
      name: "user enquiry",
      path: "/admin-dashboard/userEnquiry",
    },
    {
      name: "Popular College Query",
      path: "/admin-dashboard/popularCollegeQuery",
    },
    { name: "Logout", path: "/admin-dashboard/logout" },
    { name: "add College In Search", path: "/admin-dashboard/addCollegeInSearch" },

    {
      name: "Add Blogs",
      path: "/admin-dashboard/addBlogs",
    },
    {
      name: "Add popular College",
      path: "/admin-dashboard/addPopularCollege",
    },
    {
      name: "Add Videos",
      path: "/admin-dashboard/addVideos",
    },
    {
      name: "Website report problem",
      path: "/admin-dashboard/websiteReportProblem",
    },
    {
      name: "Contact Us query",
      path: "/admin-dashboard/contactUsQuery",
    },
  ];
  useEffect(() => {
    if (getCookie("adminToken")) {
      setIsLoggedIn(true);
    } else {
      navigate.replace("/admin-dashboard");
      setIsLoggedIn(false);
    }
  }, [path]);
  return (
    <main className="top adminDashboard">
      {!isLoggedIn && <LoginAdmin />}
      {isLoggedIn && <SideBar sidebarItem={sidebarItem} />}
      {isLoggedIn && path && path === "users" ? (
        <Users />
      ) : path === "userEnquiry" ? (
        <UserEnquiry />
      ) : path === "logout" ? (
        <Logout />
      ) : path === "addCollegeInSearch" ? (
        <AddCollegeInSearch />
      ) : path === "addPopularCollege" ? (
        <AddPopularCollege />
      ) : path === "popularCollegeQuery" ? (
        <PopularQuery />
      ) : path === "addBlogs" ? (
        <CreateBlogs />
      ) : path === "websiteReportProblem" ? (
        <WebsiteReports />
      ) : path === "contactUsQuery" ? (
        <ContactUsQuery />
      ) : path === "addVideos" ? (
        <AddYouTubeVideoForm />
      ) : (
        <p style={{ textAlign: "center" }}> This is a panel only for admin </p>
      )}
    </main>
  );
};

export default AdminDashboard;
