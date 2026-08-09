"use client";
import PropTypes from "prop-types";
import "./styles/collegeHeader.css";
import Image from "next/image";
import { isOptimizable } from "../lib/images";
import PlaceIcon from "@mui/icons-material/Place";
import { useRouter } from "next/navigation";
import { useNavigationState } from "../Helper/NavigationState";


const CollegeHeader = ({ image, alt, location, college }) => {
  const navigate = useRouter();
  const { setNavState } = useNavigationState();

  return (
    <div
      className="college-header"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="text-area">
        <div className="img">
          {/*
            The wrapper is a clamp()-sized square (80–130px) with
            overflow:hidden and no position, so `fill` would escape it. A square
            width/height keeps the logo's aspect ratio and lets the existing
            object-fit:cover do the cropping, as before.
          */}
          <Image
            src={image}
            alt={alt}
            width={130}
            height={130}
            loading="lazy"
            sizes="130px"
            unoptimized={!isOptimizable(image)}
          />
        </div>
        <div className="text">
          <h1>{alt}</h1>
          <p>
            <PlaceIcon className="icon" />
            {location}
          </p>
        </div>
      </div>

      {/* <div className="overlay"></div> */}
      <button
        onClick={() => {
          setNavState({ name: college?.name });
          navigate.push(`/admission`);
        }}
      >
        {/* <FaArrowRight />s */}
        Apply Now
      </button>
    </div>
  );
};

export default CollegeHeader;
CollegeHeader.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  location: PropTypes.string,
  college: PropTypes.string,
};
