"use client";

import React from "react";

const TermsAndConditions = () => {
  const policies = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content:
        "By creating an account or participating in challenges, you acknowledge that you have read, understood, and agreed to these Terms & Conditions, along with our Privacy Policy.",
    },
    {
      id: 2,
      title: "Eligibility",
      content: [
        "You must be at least 13 years old to use Rhysly.",
        "If you are under the age of majority in your region, you must have parental/guardian consent.",
        "You agree to provide accurate and complete information when creating an account.",
      ],
    },
    {
      id: 3,
      title: "User Accounts",
      content: [
        "You are responsible for maintaining the confidentiality of your account and password.",
        "You agree not to share your login credentials or allow others to access your account.",
        "Rhysly is not responsible for any activity that occurs under your account due to your failure to safeguard access.",
      ],
    },
    {
      id: 4,
      title: "Challenges & Participation",
      content: [
        "Challenge hosts may set participation requirements and fees.",
        "Fees for participation and certificate issuance are non-refundable.",
        "Completion certificates are awarded only if you meet the challenge requirements.",
        "Any attempt to manipulate or falsify submissions will result in disqualification.",
      ],
    },
    {
      id: 5,
      title: "User Submissions",
      content: [
        "By submitting content (projects, discussions, reviews, etc.), you grant Rhysly a non-exclusive, worldwide license to display and use your content within the platform.",
        "You retain ownership of your intellectual property.",
        "You agree not to post offensive, harmful, or infringing content.",
      ],
    },
    {
      id: 6,
      title: "Help Forum & Peer Interactions",
      content: [
        "The Help Forum is intended for constructive discussion and support.",
        "Respectful communication is required. Harassment, spam, or abuse will result in suspension or account termination.",
      ],
    },
    {
      id: 7,
      title: "Resources & Coach Materials",
      content: [
        "Coaches may share resources and guidance. These are for educational purposes only and must not be redistributed outside Rhysly without permission.",
      ],
    },
    {
      id: 8,
      title: "Payments & Fees",
      content: [
        "All payments (participation fees, certificate fees, etc.) are final and non-refundable.",
        "Fees are processed through our third-party payment providers. Rhysly does not store payment details.",
      ],
    },
    {
      id: 9,
      title: "Deactivation & Termination",
      content: [
        "You may deactivate your account at any time through your profile settings.",
        "Rhysly reserves the right to suspend or terminate accounts that violate these Terms.",
        "Upon deactivation, your portfolio remains accessible to you but may not be visible publicly unless reactivated.",
      ],
    },
    {
      id: 10,
      title: "Disclaimer of Warranties",
      content: [
        'Rhysly is provided "as is" and "as available."',
        "We do not guarantee uninterrupted service, error-free content, or specific results from using the platform.",
      ],
    },
    {
      id: 11,
      title: "Limitation of Liability",
      content: [
        "Rhysly is not liable for indirect, incidental, or consequential damages arising from use of the platform.",
        "Our total liability to you will not exceed the amount you paid (if any) in the last 12 months.",
      ],
    },
    {
      id: 12,
      title: "Changes to Terms",
      content: [
        "We may update these Terms from time to time.",
        "Continued use of the platform after changes indicates acceptance of the new Terms.",
      ],
    },
    {
      id: 13,
      title: "Governing Law",
      content:
        "These Terms shall be governed by and interpreted under the laws of the jurisdiction where Rhysly is established.",
    },
    {
      id: 14,
      title: "Contact Us",
      content:
        "For any questions regarding these Terms & Conditions, please contact us at: support@rhysly.com",
    },
  ];

  return (
    <div className=" bg-gray-50 pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[10%]">
      <div className="2xl:container mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600">Last Updated: 29 Jul 2025</p>
        </div>

        <div className="mb-8">
          <p className="text-sm lg:text-base text-gray-700 mb-6">
            Welcome to Rhysly. By accessing or using our platform, you agree to
            be bound by these Terms & Conditions. Please read them carefully. If
            you do not agree, you may not use Rhysly.
          </p>
        </div>

        <div className="space-y-6">
          {policies.map((policy) => (
            <div key={policy.id} className="py-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {policy.id}. {policy.title}
              </h2>

              {Array.isArray(policy.content) ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {policy.content.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm md:text-base text-gray-700">
                  {policy.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
