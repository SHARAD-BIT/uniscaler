"use client";
import PropTypes from "prop-types";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const SocialMedia = ({ data }) => {
  const iconMap = {
    facebook: <FaFacebookF color="#4267B2" />,
    instagram: <BsInstagram color="#E1306C" />,
    twitter: <FaXTwitter color="black" />,
    youtube: <FaYoutube color="red" />,
    linkedin: <FaLinkedinIn color="#0a66c2" />,
  };
  return (
    <div className="details">
      <div className="overview">
        <p className="heading">
          <strong>Our Social Media Handles: </strong>
        </p>
        {Object.keys(data).map((key) => (
          <Link key={key} className="social-media" href={data[key]}>
            <strong>{iconMap[key]}</strong>
            <span>{data[key]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
SocialMedia.propTypes = {
  data: PropTypes.object,
};
