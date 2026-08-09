"use client";
import { useSnackbar } from "notistack";
import { deleteCookie } from "../../Helper/Helper";
import { useRouter } from "next/navigation";

import "../styles/Logout.css";

const Logout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const logoutHandler = () => {
    deleteCookie("adminToken");
    enqueueSnackbar("Logout Successfull", {
      variant: "success",
      autoHideDuration: 3000,
    });
    navigate.replace("/admin-dashboard");
  };
  return (
    <div className="logoutPage">
      <h2>Click on below button to logout</h2>
      <button
        onClick={logoutHandler}
        style={{ display: "flex", marginInline: "auto" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
