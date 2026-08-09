"use client";
import Button from "../Utils/Button";
import ReferalSrc from "../assets/referal.avif";
import Image from "next/image";
import "./styles/referral.css";

const Referral = () => {
  const howWeWork = [
    "<h3>Get Your Referral Code </h3><p>Every student enrolled at Uniscaler gets a unique referral code.<br/>At Uniscaler, we believe in rewarding our students for their loyalty and support. That's why every student enrolled with us receives a special privilege: a unique referral code just for them.<br/>This referral code is more than just a combination of numbers and letters; it's your key to unlocking exciting rewards. Whether you're passionate about sharing your college experience with friends or simply want to help others discover the opportunities Uniscaler offers, your referral code empowers you to do just that.<br  />Not only does your referral code make it easy for your friends to join our vibrant community, but it also entitles you to exclusive benefits. Each time a friend uses your code and enrolls in one of our affiliated colleges through our platform, you earn rewards as a token of our appreciation.<br/>So, get ready to share the Uniscaler experience with your friends and reap the rewards. Your unique referral code awaits, ready to connect more students with the endless possibilities that Uniscaler has to offer.</p>",
    "<h3>Share Your Code </h3><p>Share your referral code with friends and encourage them to use it when they apply to colleges affiliated with Uniscaler through our website. <br/>Sharing your referral code is as easy as spreading the word about Uniscaler's excellence. Once you receive your unique referral code, it's time to share the excitement with your friends and peers. Whether it's through social media, emails, or a friendly chat, let them know about the fantastic opportunities waiting for them at Uniscaler and our affiliated colleges.<br/>Your referral code isn't just a string of characters; it's a gateway to a world of possibilities. By sharing it generously, you're not only helping your friends discover their path to success but also earning rewards as a token of our appreciation for your support.<br/>So, don't hesitate to share your code far and wide. Every referral is a step towards building a stronger, more connected community at Uniscaler.</p>",
    "<h3>Earn Rewards</h3><p> For every successful referral (when your friend enrolls in a college associated with Uniscaler), you earn Rs 1000.<br/>Earning rewards through our Refer and Earn program is both exciting and rewarding. For every successful referral you make, where your friend enrolls in a college associated with Uniscaler through our platform, you earn a generous reward of Rs 1000.<br/>Imagine the possibilities! By simply sharing your referral code and encouraging your friends to join Uniscaler's network of affiliated colleges, you not only help them embark on a journey of education and growth but also earn valuable rewards for yourself.<br/>Each successful referral is a testament to your advocacy and support for Uniscaler's vision. It's our way of saying 'thank you' for being an active part of our community and for helping us expand our reach to more aspiring students.<br/>So, keep sharing your code and watching your rewards grow. Together, we'll create a brighter future for education and empowerment at Uniscaler.</p>",
  ];
  return (
    <main className="top referral">
      <section className="gridBox">
        <div className="textArea">
          <h1>Uniscaler Refer and Earn Program</h1>
          <p>
            Introducing the Uniscaler Refer and Earn Program! As a student at
            Uniscaler, you now have the exciting opportunity to earn rewards
            by referring your friends to enroll in colleges affiliated with Uniscaler
            College through our website.
          </p>
          <p>
            Don&apos;t miss out on this fantastic opportunity to earn while
            helping others achieve their educational dreams. Log in to your Uniscaler
            College student account, grab your referral code, and start
            referring today!
          </p>
          <Button text="Refer Now" link="/login" />
        </div>
        <div className="imageContainer">
          <Image
            src={ReferalSrc}
            alt="Refer and earn at Uniscaler"
            sizes="(max-width: 768px) 90vw, 600px"
          />
        </div>
      </section>
      <section className="how-we-do">
        <h2>How it Works:</h2>
        <div className="section-wrapper">
          {howWeWork.map((item) => (
            <div
              className="section-item"
              key={item}
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          ))}
        </div>
      </section>
      <section className="how-we-do">
        <h2>How to Participate:</h2>

        <ul>
          <li>Log in to your Uniscaler student account.</li>
          <li>
            Navigate to the &quot;Refer and Earn&quot; section to get your
            unique referral code.
          </li>
          <li>
            Share your code with friends via email, social media, or word of
            mouth.
          </li>
          <li>
            Encourage your friends to use your code when applying to colleges
            through Uniscaler&apos;s website.
          </li>
          <li>Enjoy rewards for successful referrals!</li>
        </ul>
        <div className="terms">
          <h2>Terms and Conditions</h2>
          <ul>
            <li>
              The referral code is unique to each student and should not be
              shared publicly or misused.
            </li>
            <li>
              Referrals are considered successful only when the referred friend
              enrolls in a college affiliated with Uniscaler through our
              website.
            </li>
            <li>
              Rewards are credited to your account once the enrollment of your
              referred friend is confirmed.
            </li>
            <li>
              The Refer and Earn program is subject to change or termination at
              the discretion of Uniscaler.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Referral;
