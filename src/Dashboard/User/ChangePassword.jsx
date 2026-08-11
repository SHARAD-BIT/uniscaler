"use client";
import { useState } from "react";
import "../styles/ChangePassword.css";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPassed, setIsPassUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  // Sent exactly as typed - see the note in Components/Login.jsx. This screen's
  // allowlist was a third, different one (it kept `! ) * ( ,` but dropped `. $`),
  // so a password set here could contain characters the login form deleted -
  // the account was locked out the moment the password was changed.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/changePassword`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: getCookie("email"),
        token: getCookie("token"),
        oldPass: formData.oldPass,
        newPass: formData.newPass,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.code === 200) {
            setError(data.message);
            setIsPassUpdated(true);
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
          } else if (data.code === 401) {
            setError(data.message);
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
  }
  return (
    <section className="changePassword">
      <h1>Change Password</h1>
      <p>Here you can change your password</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPass"
            id="oldPassword"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPass"
            id="newPassword"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            name="newPass"
            required
            id="confirmPassword"
            onChange={handleChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={isPassed}>
          Change Password
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
