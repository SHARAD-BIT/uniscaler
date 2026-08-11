"use client";
import { useEffect, useState } from "react";
import "../styles/updateUser.css";
import { useSnackbar } from "notistack";
import { getCookie, getStoredUser } from "../../Helper/Helper";
import { useRouter } from "next/navigation";


const UpdateProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  // Loaded in an effect rather than during render: this component is
  // server-rendered too, where localStorage does not exist.
  const [userInfo, setUserInfo] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    verificationStatus: "",
  });
  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) return;
    setUserInfo(stored);
    setFormData({
      name: stored.name,
      phone: stored.phone,
      city: stored.city,
      state: stored.state,
      country: stored.country,
      verificationStatus: stored.verificationStatus,
    });
  }, []);
  const navigate = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      isUpdate && navigate.replace("dashboard");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isUpdate]);
  // Sent exactly as typed. This allowlist permitted nothing but letters, digits,
  // space and a comma, so a user could not save a name containing `.` or `-`
  // (`Dr. Rao`, `Anil-Kumar`) or any address with a `/` or `#` in it.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission, e.g., send data to server or perform validation
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: getCookie("email"),
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      }),
    }).then((res) =>
      res
        .json()
        .then((data) => {
          if (data.code === 200) {
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
            // get old local Storage and update with new one
            setIsUpdate(true);
          } else if (data.code === 500) {
            enqueueSnackbar(data.message, { variant: "error",autoHideDuration: 3000,});  
          }
        })
        .catch((e) => {
          enqueueSnackbar(e.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => setLoading(false))
    );
    console.log("Form submitted:", formData);
  };

  return (
    <div className="updateProfile">
      {!loading && (
        <>
          <h1>Update Profile for {userInfo?.name}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                autoFocus="true"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={isUpdate}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateProfile;
