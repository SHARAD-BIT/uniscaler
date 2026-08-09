"use client";
import Link from "next/link";

import "./styles/RefundPage.css"; // Import your CSS file for styling

const RefundPage = () => {
  return (
    <main className="refund-container top">
      <h1>Refund Policy</h1>
      <p>
        We offer a 15-day refund policy for courses purchased through our Uniscaler
        college website.
      </p>
      <p>
        Please review our terms and conditions below for details on eligibility
        and process.
      </p>
      <h2>Terms and Conditions</h2>
      <ul>
        <li>Refunds are eligible within 15 days of the purchase date.</li>
        <li>Refunds are processed within 7-10 business days after approval.</li>
        <li>
          <Link href="/terms-and-conditions">Read more.</Link>
        </li>
      </ul>
      <h2>Refund Process</h2>
      <ol>
        <li>
          <strong>Request Submission:</strong> To initiate a refund, please
          contact our support team within the refund period.
        </li>
        <li>
          <strong>Verification:</strong> Our team will verify your eligibility
          based on the terms mentioned above.
        </li>
        <li>
          <strong>Approval:</strong> Upon approval, the refund request will be
          processed within 7-10 business days.
        </li>
        <li>
          <strong>Notification:</strong> You will receive an email notification
          once the refund has been processed.
        </li>
      </ol>

      <h2>Additional Information</h2>
      <ul>
        <li>
          Refunds will be issued to the original payment method used during the
          purchase.
        </li>
        <li>
          Please note that certain payment methods may have processing fees that
          are non-refundable.
        </li>
        <li>
          For any inquiries or assistance regarding refunds, please contact our
          support team at{" "}
          <a href="mailto:support@uniscaler.com">support@uniscaler.com</a>.
        </li>
      </ul>

      <p className="disClaimer">
        <strong>Disclaimer:</strong> Uniscaler reserves the right to modify
        or update the refund policy without prior notice. Changes to the policy
        will be effective immediately upon posting on this page.
      </p>
    </main>
  );
};

export default RefundPage;
