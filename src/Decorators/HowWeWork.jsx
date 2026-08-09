"use client";
import "./styles/howWeWork.css";
import Image from "next/image";
import { isOptimizable } from "../lib/images";
import PropTypes from "prop-types";
const HowWeWork = ({ data, title, des }) => {
  return (
    <section className="how-we-work">
      <h2>{title}</h2>
      <p>{des}</p>
      <div className="section-wrapper">
        {data.map((item, index) => (
          <div className="section" key={index}>
            <div className="image">
              {/* howWeWork.css gives .image position:relative so this can
                  fill it; the object-fit:cover there still applies. */}
              <Image
                loading="lazy"
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                unoptimized={!isOptimizable(item.image)}
              />
            </div>
            <div className="text">
              <h2>{item.title}</h2>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowWeWork;
HowWeWork.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  des: PropTypes.node,
};
