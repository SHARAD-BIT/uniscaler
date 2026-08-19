"use client";
import { useState } from "react";
import CryptoJS from "crypto-js";
import "../styles/adminLogin.css";
import { getCookie, setCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";


const LoginAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useRouter();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const tryLogin = async () => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(loginData),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();
    await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ encryptedData }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.code === 200 &&
          setCookie("adminToken", data.cookie.token, data.cookie.expires);
        data.code === 200 &&
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        // Absolute path. React Router resolved a bare "users" against the
        // current *route*, giving /admin-dashboard/users; Next resolves it as a
        // URL against the current *path*, which replaces the last segment and
        // lands on /users — a route that does not exist, so a successful admin
        // login dropped straight onto the 404 page.
        data.code === 200 && navigate.replace("/admin-dashboard/users");
      })
      .catch((err) =>
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        })
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    !getCookie("adminToken") && (await tryLogin());
  };

  return (
    <section className="adminLogin">
      <h2>Login As Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="adminEmail">Email*</label>
          <input
            type="email"
            value={loginData.email}
            name="email"
            id="adminEmail"
            onChange={handleInput}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="adminPassword">Password*</label>
          <input
            type="password"
            value={loginData.password}
            id="adminPassword"
            name="password"
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginAdmin;
