"use client";
import "./styles/contactUs.css";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import NewsLetter from "../Decorators/NewsLetter";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

import { useSnackbar } from "notistack";

const ContactUs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const filterInputStringToPreventSQLInjection = (input) => {
      return input.replace(/[^a-zA-Z0-9\s.-@%]/g, "");
    };
    setFormData((prevState) => ({
      ...prevState,
      [name]: filterInputStringToPreventSQLInjection(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/contactUs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 201) {
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
          setFormData({ email: "", phone: "", message: "" });
        } else {
          enqueueSnackbar(data.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <main className="top">
      <div className="container">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let&apos;s get in touch</h3>
            <p className="text">
              We&apos;re here to help and answer any question you might have. We
              look forward to hearing from you.
            </p>

            <div className="info">
              <div className="information">
                <GrLocation /> &nbsp; &nbsp;
                <p>Uniscaler, Faridabad (Haryana) 121004 India</p>
              </div>
              <div className="information">
                <MdOutlineEmail />
                &nbsp; &nbsp;
                <Link href="mailto:hello@uniscaler.in">
                  hello@uniscaler.in
                </Link>
              </div>
              <div className="information">
                <MdOutlinePhone /> &nbsp;&nbsp;&nbsp;
                <Link href="tel:+919667956655">+91 96679 56655</Link>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <Link target="_blank" href="https://www.facebook.com">
                  <FaFacebookF />
                </Link>
                <Link target="_blank" href="https://twitter.com/Uniscaler">
                  <FaXTwitter />
                </Link>
                <Link target="_blank"
                  href="https://www.instagram.com/uniscaler"
                >
                  <FaInstagram />
                </Link>
                <Link target="_blank"
                  href="https://www.youtube.com/@Uniscaler"
                >
                  <FiYoutube />
                </Link>
              </div>
            </div>
          </div>

          <div className="contact-form ">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form onSubmit={handleSubmit}>
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                {/* <span>Email</span> */}
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  className="input"
                  onChange={handleChange}
                />
                <label htmlFor="tel">Phone</label>
                {/* <span>Phone</span> */}
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Message</label>
                {/* <span>Message</span> */}
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
      <section className="map">
        <h2 className="heading">
          Find us on <span>Google Maps</span>
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1036.780674783372!2d77.3209610054497!3d28.342003822200684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1709790690975!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <NewsLetter />
    </main>
  );
};

export default ContactUs;
