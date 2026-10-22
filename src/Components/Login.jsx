"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// The animated loginImg.gif was replaced by this still (client ask,
// 2026-09-03): page 1 of their supplied brand PDF ("UNISCALER — HAR SAPNE
// KA PEHLA KADAM", the laptop-and-bookshelf illustration), rendered to PNG
// at 2x with PyMuPDF. The register page still uses the GIF.
import imgRegSrc from "../assets/login-illustration.png";

const imgReg = imgRegSrc.src;
import "./styles/Register.css";
import { setCookie } from "../Helper/Helper";
import PopMsg from "../Utils/PopMsg";
import NewsLetter from "../Decorators/NewsLetter";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPassEmail, setForgetPassEmail] = useState("");
  const [pt, setpt] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useRouter();
  const [link, setLink] = useState({});
  useEffect(() => {
    // check cookie is exist or not
    const cookie = document.cookie;
    if (cookie.includes("token") && cookie.includes("email")) {
      navigate.push("/user-dashboard");
    }
    const title = document.title;
    document.title = "Login - Uniscaler";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => {
      document.title = title;
    };
  }, []);

  /*
   * The snake (client ask, 2026-09-02, refined against a Google-Snake
   * screenshot): a thick, round-capped gradient body leaves the navbar
   * ring and travels the page in right-angle turns — the game's movement,
   * not a smooth glide — then runs into the card's top-right corner and,
   * without stopping, on along the card's border, painting the thin
   * four-side gradient ring behind it (Register.css takes over once the
   * loop is closed). Built as an SVG overlay laid
   * over the document in page coordinates (why: the note inside the
   * effect) with an orthogonal path and a travelling stroke-dash segment:
   * dasharray carves a BODY-length dash out of the path and animating
   * dashoffset from BODY to -total walks that dash from before the start
   * (invisible) through every corner and clean off the far end — which is
   * exactly a snake entering a hole. The path is computed from the live
   * rects of the ring and the card, so it survives any viewport.
   */
  useEffect(() => {
    const ring = document.querySelector(".login-circle");
    const card = document.querySelector(".form-wrapper");
    // The card's gradient border (Register.css `::after`) is off until the
    // snake has painted it — client ask, 2026-09-03. Lit from the trail's
    // finish below; at once when there is no animation.
    const light = () => card && card.classList.add("border-lit");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !ring ||
      !card
    ) {
      light();
      return () => card && card.classList.remove("border-lit");
    }

    let cancelled = false;
    let raf = 0;
    let svg = null;
    let drainTimer = null;
    let handoverTimer = null;
    const NS = "http://www.w3.org/2000/svg";

    const start = () => {
      /*
       * Everything below is in PAGE coordinates (viewport rect + scroll
       * offset) and the overlay is absolutely positioned over the document,
       * not fixed to the viewport. Fixed + viewport coordinates was the
       * glitch the client saw on 2026-09-04: this ran while the page was
       * still smooth-scrolling back to the top (scroll restoration, then the
       * first effect's scrollTo), so the card's rect was read mid-scroll and
       * the "border" was drawn as a square ~150px above the card, with the
       * snake heading off to it. Now the geometry is read only once the
       * layout has held still (see `settle` below), and because the overlay
       * scrolls with the page the trail stays on the card even if the
       * visitor scrolls during the two seconds it runs.
       */
      const sx0 = window.scrollX;
      const sy0 = window.scrollY;
      const r = ring.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const sx = r.left + r.width / 2 + sx0;
      // From the ring's bottom EDGE, not the icon's centre (client follow-up)
      // — the snake slips out from under the gradient ring itself.
      const sy = r.bottom - 3 + sy0;
      // The entry is the card's top-right corner — ON its rounded border.
      // Everything here is the CENTRE LINE of the 2px border: 1px in from the
      // outer edge, corner arcs of radius-1. (ex, ey) is the 45° point of the
      // top-right arc — where the flight ends AND where the border loop
      // begins.
      const rad = parseFloat(getComputedStyle(card).borderTopRightRadius) || 0;
      const R = Math.max(rad - 1, 0);
      const k = R * Math.SQRT1_2;
      const x0 = c.left + 1 + sx0;
      const x1 = c.right - 1 + sx0;
      const y0 = c.top + 1 + sy0;
      const y1 = c.bottom - 1 + sy0;
      const ex = x1 - R + k;
      const ey = y0 + R - k;
      // The border loop, counter-clockwise from that corner point: top edge
      // leftward, down the left side, along the bottom, up the right, and the
      // last arc back onto the corner point. sweep-flag 0 = counter-clockwise
      // on screen (SVG's y runs down).
      const arc = (x, y) => `A ${R} ${R} 0 0 0 ${x} ${y}`;
      const loop = [
        arc(x1 - R, y0),
        `L ${x0 + R} ${y0}`,
        arc(x0, y0 + R),
        `L ${x0} ${y1 - R}`,
        arc(x0 + R, y1),
        `L ${x1 - R} ${y1}`,
        arc(x1, y1 - R),
        `L ${x1} ${y0 + R}`,
        arc(ex, ey),
      ].join(" ");
      // Right-angle waypoints, game-style: drop out of the ring, zig left,
      // drop again, kick right past the card's edge, drop to the corner's
      // height, and run left into it.
      const midY = sy + (ey - sy) * 0.55;
      const pts = [
        [sx, sy],
        [sx, sy + 42],
        [sx - 150, sy + 42],
        [sx - 150, midY],
        [ex + 46, midY],
        [ex + 46, ey],
        [ex, ey],
      ];
      const flight = pts
        .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
        .join(" ");
      // ONE path for the snake — the flight and then the border loop — so the
      // corner is just another point it passes through: no stop, no shrink
      // (client, 2026-09-03). The trail it leaves is the loop alone, from the
      // same point.
      const d = `${flight} ${loop}`;
      const trailD = `M ${ex} ${ey} ${loop}`;

      svg = document.createElementNS(NS, "svg");
      const docH = Math.max(document.documentElement.scrollHeight, y1 + 60);
      svg.setAttribute(
        "style",
        `position:absolute;left:0;top:0;width:100%;height:${docH}px;overflow:visible;pointer-events:none;z-index:9999`
      );
      // One gradient for the snake and the trail it leaves, across the card's
      // width — the same 90deg yellow→blue the CSS ring paints, so the trail
      // matches the ring it hands over to and the snake IS the border wherever
      // it lies on it. `reflect` mirrors the colours beyond the card's right
      // edge, so the flight — which happens out there — is still a colourful
      // body rather than flat blue.
      svg.innerHTML =
        `<defs><linearGradient id="ring-snake-grad" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="${x0 - 1}" y1="0" x2="${x1 + 1}" y2="0">` +
        '<stop offset="0" stop-color="#feda75"/><stop offset="0.25" stop-color="#fa7e1e"/>' +
        '<stop offset="0.5" stop-color="#d62976"/><stop offset="0.75" stop-color="#962fbf"/>' +
        '<stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs>';
      const mk = (pathD) => {
        const el = document.createElementNS(NS, "path");
        el.setAttribute("d", pathD);
        el.setAttribute("fill", "none");
        el.setAttribute("stroke", "url(#ring-snake-grad)");
        // As thin as the mark's story ring (2px stroke) — client ask; was 9.
        el.setAttribute("stroke-width", "2");
        el.setAttribute("stroke-linecap", "round");
        el.setAttribute("stroke-linejoin", "round");
        return el;
      };
      const trail = mk(trailD);
      const path = mk(d);
      svg.appendChild(trail);
      svg.appendChild(path);
      document.body.appendChild(svg);

      const L = trail.getTotalLength();
      const total = path.getTotalLength();
      const F = total - L; // the flight alone
      const BODY = Math.min(170, F * 0.35);
      path.style.strokeDasharray = `${BODY} ${total + BODY}`;
      trail.style.strokeDasharray = `${L} ${L}`;

      // Three phases on one timeline, keyed by where the HEAD is: the flight
      // (ring → corner), the loop (corner → around the card → corner) and a
      // short exit (the tail catching up at the corner — invisible, it lies
      // on the finished trail in the same colours). The trail's dashoffset is
      // a straight function of the head's position, so giving it the same
      // keyframe times and easing as the snake keeps its front exactly under
      // the snake's head.
      //   flight: accelerates from rest to V at the corner —
      //   cubic-bezier(0.4,0,0.8,0.8) ends with slope 1, so tF = F / V.
      //   loop: 1500ms; its easing's start slope is chosen so the head leaves
      //   the corner at the speed it arrived, then eases to rest as it closes.
      const V = 0.42; // px per ms
      const tF = F / V;
      const tLoop = 1500;
      const tExit = 200;
      const T = tF + tLoop + tExit;
      const s = Math.min((V * tLoop) / L, 1); // loop easing's start slope
      const loopEase = `cubic-bezier(0.45, ${(0.45 * s).toFixed(3)}, 0.6, 1)`;
      const k1 = tF / T;
      const k2 = (tF + tLoop) / T;
      const anim = path.animate(
        [
          { offset: 0, strokeDashoffset: BODY, easing: "cubic-bezier(0.4, 0, 0.8, 0.8)" },
          { offset: k1, strokeDashoffset: BODY - F, easing: loopEase },
          { offset: k2, strokeDashoffset: BODY - total, easing: "linear" },
          { offset: 1, strokeDashoffset: -total },
        ],
        { duration: T, fill: "forwards" }
      );
      trail.animate(
        [
          { offset: 0, strokeDashoffset: L, easing: "linear" },
          { offset: k1, strokeDashoffset: L, easing: loopEase },
          { offset: k2, strokeDashoffset: 0, easing: "linear" },
          { offset: 1, strokeDashoffset: 0 },
        ],
        { duration: T, fill: "forwards" }
      );
      // Loop closed, trail complete: the CSS ring (`.border-lit`, Register.css)
      // fades in underneath — same stops across the same width, so the
      // hand-over is invisible — and the overlay goes once that fade is done.
      // The CSS ring, not this SVG, is what survives a resize.
      anim.onfinish = () => {
        light();
        handoverTimer = setTimeout(() => svg && svg.remove(), 450);
      };
      // As the snake slips out, the ring drains to all blue — it "took the
      // colours with it" (navbar.css `.ring-drained`). Class-based and
      // removed in this effect's cleanup, so the moment the visitor leaves
      // the login page the ring is its colourful self again.
      drainTimer = setTimeout(() => ring.classList.add("ring-drained"), 200);
    };

    // Wait for the layout to hold still before reading any geometry: scroll
    // restoration, the first effect's scroll-to-top, web fonts arriving and
    // the app-switcher strip's height all move the card in the first frames.
    // Three consecutive frames with the card's rect and scrollY unchanged is
    // "settled"; 90 frames (~1.5s) is the cap so a page that never settles
    // (a resize being dragged) still gets its snake.
    const settle = () => {
      let last = null;
      let still = 0;
      let frames = 0;
      const tick = () => {
        if (cancelled) return;
        const c = card.getBoundingClientRect();
        const key = [c.top, c.left, c.width, c.height, window.scrollY]
          .map(Math.round)
          .join(",");
        if (key === last) still += 1;
        else {
          still = 0;
          last = key;
        }
        frames += 1;
        if (still >= 3 || frames > 90) start();
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const fontsReady =
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) settle();
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (drainTimer) clearTimeout(drainTimer);
      if (handoverTimer) clearTimeout(handoverTimer);
      ring.classList.remove("ring-drained");
      card.classList.remove("border-lit");
      if (svg) svg.remove();
    };
  }, []);
  const [formData, setFormData] = useState({});
  const hidePopUp = () => {
    setIsPopUp(false);
  };
  const [isForgetPass, setForgetPass] = useState(false);
  const loginHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    !isForgetPass &&
      fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) =>
          res.json().then((data) => {
            if (data.code === 200) {
              setFormData({});
              setIsPopUp(true);
              setMsg(data.message);
              setCookie("token", data.cookie.token, data.cookie.expires);
              setCookie("email", data.cookie.email, data.cookie.expires);
              setLink({ href: "/user-dashboard", name: "Go to Dashboard" });
            } else if (data.code === 201) {
              setMsg(
                data.message + ". Check your mailbox to verify your account"
              );
              setIsPopUp(true);
              setLink({});
            } else if (data.code === 500) {
              setMsg(data.msg);
              setIsPopUp(true);
              setLink({});
            } else {
              setMsg(data.message);
              setIsPopUp(true);
              setLink({});
            }
          })
        )
        .catch((err) => {
          setMsg(err.message);
          setIsPopUp(true);
          setLink({});
        })
        .finally(() => {
          setLoading(false);
        });
  };
  // The value is sent exactly as typed. There used to be a character allowlist
  // here (`[^a-zA-Z0-9\s.@#$]` deleted) applied to the password as well as the
  // email, which silently dropped `_ + -` out of addresses and `! & * ( ) ,`
  // out of passwords. Because these inputs are uncontrolled the box still
  // showed the original text, so the student saw a correct address while a
  // different one was submitted. It never prevented SQL injection either - the
  // backend now uses query placeholders, which is where that belongs.
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const loginData = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];
  const ForgetPasswordHandler = () => {
    setForgetPass(true);
  };
  const forgetPassLink = (e) => {
    e.preventDefault();
    setpt(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: forgotPassEmail,
      }),
    }).then((res) =>
      res
        .json()
        .then((data) => {
          data.code === 200 && setMsg(data.message);
          data.code === 200 && setIsPopUp(true);
        })
        .catch((err) => {
          setMsg(err.message);
          setIsPopUp(true);
        })
        .finally(() => setpt(false))
    );
  };
  return (
    <main className="register top login">
      <h1>Login</h1>
      <p>Welcome! Please login to your account.</p>
      <div className="form-wrapper">
        <div className="mockUp">
          <div className="text">
            <div className="img">
              <img
                src={imgReg}
                alt="Uniscaler register"
                loading="lazy"
              />
            </div>
            <p className="link">
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <strong>Register</strong>
              </Link>
            </p>
          </div>
        </div>
        <form autoComplete="on" autoCorrect="on" onSubmit={loginHandler}>
          <div className="form-element">
            {loginData.map((input) => {
              return (
                <div className="form-group" key={input.name}>
                  <label>{input.name}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div
            onClick={ForgetPasswordHandler}
            style={{
              textAlign: "center",
              cursor: "pointer",
              marginBlock: "1rem",
            }}
          >
            Forget Password?
          </div>
          {isForgetPass && (
            <div className="form-group" style={{ margin: "1rem" }}>
              <label htmlFor="forgotPassEmail">Enter Your Email:</label>
              <input
                type="email"
                id="forgotPassEmail"
                placeholder="Enter Email"
                value={forgotPassEmail}
                onChange={(e) => setForgetPassEmail(e.target.value)}
                name="email"
                required
              />
              <button onClick={forgetPassLink} type="submit" disabled={pt}>
                {" "}
                Get Link
              </button>
            </div>
          )}
        </form>
        {isPopUp && msg.length > 0 && (
          <PopMsg
            title={"Login"}
            msg={msg}
            link={link?.href && link}
            func={hidePopUp}
          />
        )}
      </div>
      <NewsLetter />
    </main>
  );
};

export default Login;
