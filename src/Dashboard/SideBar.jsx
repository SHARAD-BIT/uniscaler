"use client";
import PropTypes from "prop-types";
import Link from "next/link";

import "./styles/sidebar.css";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
const SideBar = ({ sidebarItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <aside className={open ? "sideBar open" : "sideBar"}>
      <ul>
        <li className="menu" onClick={() => setOpen(!open)}>
          {" "}
          <TiThMenu />{" "}
        </li>
        {sidebarItem.map((item, index) => (
          <li key={index}>
            <Link href={item.path} onClick={() => setOpen(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
SideBar.propTypes = {
  sidebarItem: PropTypes.array.isRequired,
};
