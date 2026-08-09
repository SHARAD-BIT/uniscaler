"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import "./styles/caf.css";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getCookie } from "../Helper/Helper";
const CAFDetails = () => {
  const { navState: state } = useNavigationState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const [wishList, setWishList] = useState({
    collegeName: state?.name,
    wishlist: [],
  });
  useEffect(() => {
    if(!state){
      navigate.replace("/common-application-form");
    }
  },[])
  const addHandler = (item) => {
    //check if item is already in wishlist
    if (wishList.wishlist.includes(item)) {
      enqueueSnackbar(`${item} already in wishlist`, { variant: "warning" });
      return;
    } else {
      enqueueSnackbar(`${item} added to wishlist`, { variant: "success" });
      setWishList({ ...wishList, wishlist: [...wishList.wishlist, item] });
    }
  };
  const removeHandler = (item) => {
    //check if item is already in wishlist
    if (!wishList.wishlist.includes(item)) {
      enqueueSnackbar(`${item} already removed from wishlist`, {
        variant: "warning",
      });
      return;
    } else {
      enqueueSnackbar(`${item} removed from wishlist`, { variant: "success" });
      setWishList({
        ...wishList,
        wishlist: wishList.wishlist.filter((i) => i !== item),
      });
    }
  };
  function merchantTransactionId() {
    return "MT" + Math.random().toString(36).substr(2, 20).toLocaleUpperCase();
  }
  const submitHandler = () => {
    if (getCookie("token") && getCookie("email")) {
      const mid = merchantTransactionId();
      fetch(process.env.NEXT_PUBLIC_PAYMENT_URL + "/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 499,
          email: getCookie("email"),
          wishList: wishList,
          transactionId: mid,
        }),
      })
        .then((res) => res.json())
        .then((url) => {
          window.location.href = url.url;
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    } else {
      enqueueSnackbar("Please login to continue", { variant: "error" });
      setTimeout(() => {
        navigate.replace("/login");
      }, 3000);
    }
  };
  // No navigation state means this page was opened directly. The effect above
  // redirects; render nothing until it does, rather than dereferencing null.
  if (!state) return null;
  return (
    <main className="top caf-service">
      <h1>Form for : {state?.name}</h1>
      <ul>
        {state?.course.map((item) => (
          <li className="caf-course" key={item.name}>
            <div className="caf">
              <h3>{item.name}</h3>
              <ul className="caf-list">
                {item.list.map((itemSec) => (
                  <li key={itemSec}>
                    <p>{itemSec}</p>
                    <div className="action-btn">
                      <button onClick={() => addHandler(itemSec)}>Add</button>
                      <button onClick={() => removeHandler(itemSec)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {/* check out btn render  */}
      {wishList.wishlist.length > 0 && (
        <button className="checkoutBtn" onClick={submitHandler}>
          Pay 499
        </button>
      )}
    </main>
  );
};

export default CAFDetails;
