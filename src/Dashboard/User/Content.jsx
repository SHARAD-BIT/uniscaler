"use client";
import Button from "../../Utils/Button";
import "../styles/contentBox.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getStoredUser } from "../../Helper/Helper";
const Content = ({ name }) => {
  // Loaded in an effect because this renders on the server too, where
  // localStorage does not exist.
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(getStoredUser());
  }, []);
  return (
    <section className="contentBox">
      <h1>Welcome to {name} !😊</h1>
      <p>Here you can check your details and other related information</p>
      <div className="informationContainer">
        <div className="image">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userInfo?.userImage}`}
            alt={name}
          />
        </div>
        <div className="content">
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Name :</span>
                </td>
                <td>{userInfo?.name}</td>
              </tr>
              <tr>
                <td>
                  <span>Phone :</span>
                </td>
                <td>{userInfo?.phone}</td>
              </tr>
              <tr>
                <td>
                  <span>City :</span>
                </td>
                <td>{userInfo?.city}</td>
              </tr>
              <tr>
                <td>
                  <span>State :</span>
                </td>
                <td>{userInfo?.state}</td>
              </tr>
              <tr>
                <td>
                  <span>Country :</span>
                </td>
                <td>{userInfo?.country}</td>
              </tr>
              <tr>
                <td>
                  <span>Verification status :</span>
                </td>
                <td>{userInfo?.veriFicationStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="centerBtn">
        <Button text="Update Profile" link="/user-dashboard/update" />
      </div>
    </section>
  );
};

export default Content;
Content.propTypes = {
  name: PropTypes.string.isRequired,
};
