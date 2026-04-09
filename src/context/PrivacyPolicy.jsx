import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 font-semibold">Last Updated: April 2026</p>

      <p className="mb-6">
        Welcome to my portfolio website. Your privacy is important to me, and this Privacy Policy explains what information is collected and how it is used.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information I Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device type</li>
        <li>Pages visited</li>
        <li>Date and time of visit</li>
      </ul>
      <p className="mb-4">
        This data is collected anonymously and does not directly identify you as an individual.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How I Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Monitoring website traffic and performance</li>
        <li>Improving user experience</li>
        <li>Understanding visitor behavior</li>
        <li>Security and basic analytics</li>
      </ul>
      <p className="mb-4">
        This data is only accessible by the website owner (admin) and is not publicly displayed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Storage</h2>
      <p className="mb-4">
        Visitor data is securely stored using a cloud database (such as Firebase). उचित सुरक्षा उपायहरू अपनाइएको छ to prevent unauthorized access.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        This website may use basic technologies (like browser storage) to enhance performance. No tracking cookies are used for advertising purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">
        This website may use third-party services (such as hosting or analytics tools) which may collect limited technical data as part of their functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Consent</h2>
      <p className="mb-4">
        By using this website, you agree to this Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Stop using the website at any time</li>
        <li>Contact for any privacy-related concerns</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">
        This Privacy Policy may be updated from time to time. Changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
      <p className="mb-4">
        <strong>Name:</strong> Rajesh Ghimire <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:rajesh.ghimire200@gmail.com" className="text-blue-500 underline">
          rajesh.ghimire200@gmail.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Note</h2>
      <p className="mb-4">
        This website is a personal portfolio and does not collect sensitive personal data such as passwords, financial information, or personal identity details.
      </p>
    </div>
  );
};

export default PrivacyPolicy;