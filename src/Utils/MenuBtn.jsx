"use client";
import { TiThMenu } from "react-icons/ti";
import "./styles/menuBtn.css";
import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";

const MenuBtn = ({ open }) => {
  return (
    <div className="menu-btn icon">
    {
      open ?  <IoCloseSharp  /> :  <TiThMenu />
    }
    </div>
  );
};

export default MenuBtn;
MenuBtn.propTypes = {
  open: PropTypes.bool.isRequired,
}
