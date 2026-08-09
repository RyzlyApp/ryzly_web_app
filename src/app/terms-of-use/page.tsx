"use client";

import React, { useState } from "react";
import { UnauthorisedLayout } from "@/components/shared";
import { GraduationCap, Building2 } from "lucide-react";

export default function TermsOfUse() {
  const [currentTab, setCurrentTab] = useState<"talents" | "organizations">("talents");

  return (
    <UnauthorisedLayout main={true}>
      <div className="bg-[#FDFDFF] font-figtree pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[10%] min-h-screen text-[#161925]">
        <div className="2xl:container mx-auto flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[260px] lg:sticky lg:top-32 flex flex-col gap-4 z-10 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#161925]">Terms & Conditions</h2>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setCurrentTab("talents")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentTab === "talents"
                      ? "bg-[#EEF0FF] text-[#596AFE] shadow-sm shadow-[#EEF0FF]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Talent and Coaches
                </button>
                
                <button
                  onClick={() => setCurrentTab("organizations")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                   currentTab === "organizations"
                      ? "bg-[#EEF0FF] text-[#596AFE] shadow-sm shadow-[#EEF0FF]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Organizations
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-12 min-h-[70vh]">
            
            {/* TALENTS & COACHES TERMS */}
            {currentTab === "talents" && (
              <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base max-w-none">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
                    {/* Terms & Conditions */}
                    Talents and Coaches
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold mt-2">
                    Effective Date: August 2026
                  </p>
                </div>
                
                <p className="text-gray-700">
                  Welcome to Ryzly, a global Challenge-Based Experience Platform for Proof of skills owned and operated by ProdotHive Limited. These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of Ryzly, including our web application, products, challenges, and services (collectively, the &quot;Platform&quot;).
                </p>

                <p className="text-gray-700">
                  By creating an account or using Ryzly, you agree to these Terms. If you do not agree, please do not use the Platform.
                </p>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">1. Eligibility &amp; Account</h2>
                  <p className="text-gray-700 mb-4">
                    You must be at least 18 years old, or the age of majority in your jurisdiction, to use Ryzly.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You agree to provide accurate information when creating your account using your email address and OTP. You are responsible for keeping your account secure and for activity conducted through your account.
                  </p>
                  <p className="text-gray-700">
                    Ryzly may suspend or terminate accounts involved in fraud, misuse, false information, or violations of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">2. Using Ryzly</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly allows users to participate in challenges, build portfolios, demonstrate skills, discover opportunities, create challenges, and connect with other talents, coaches, organizations, brands, and partners.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Users may participate as Talents, Coaches, or both.
                  </p>
                  <p className="text-gray-700">
                    Coaches may create challenges, practice projects, or other learning opportunities on Ryzly. Coaches are responsible for the accuracy, quality, legality, and ownership of the content they publish.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">3. Opportunity Challenges</h2>
                  <p className="text-gray-700 mb-4">
                    Opportunity Challenges are challenges created, sponsored, or commissioned by organizations, brands, institutions, or other approved partners to provide participants with opportunities to demonstrate skills, gain visibility, solve real-world problems, validate or generate ideas, build talent pipelines, or access professional opportunities.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Opportunity Challenges may be used for:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Talent discovery and assessment;</li>
                    <li>Recruitment and hiring;</li>
                    <li>Product and idea validation;</li>
                    <li>Product and solution generation;</li>
                    <li>Testing business ideas;</li>
                    <li>Building talent pipelines;</li>
                    <li>Brand positioning and visibility; and</li>
                    <li>Social talent empowerment.</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Before participating, users should review the challenge requirements, deadline, evaluation criteria, prizes, and intellectual-property terms.
                  </p>
                  <p className="text-gray-700">
                    Participation does not guarantee employment, a contract, a prize, or any other opportunity.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">4. Submissions &amp; Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    You are responsible for ensuring that anything you submit is your own work or that you have the necessary rights to use it.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Unless a challenge specifically states otherwise, you retain ownership of your intellectual property.
                  </p>
                  <p className="text-gray-700 mb-4">
                    For Opportunity Challenges, you grant the applicable Opportunity Provider the rights to evaluate, test, use, develop, or otherwise utilize your submission for the purposes disclosed in the challenge.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You also grant Ryzly a non-exclusive, worldwide, royalty-free licence to host, use, reproduce, display, adapt, and distribute your submitted content for operating, improving, showcasing, and promoting Ryzly, including portfolios, case studies, marketing, and talent promotion.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Where a challenge requires ownership or exclusive rights to a submission, those terms must be clearly stated before submission.
                  </p>
                  <p className="text-gray-700">
                    Your pre-existing intellectual property remains yours unless you expressly agree otherwise.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">5. Coaches &amp; Challenge Revenue</h2>
                  <p className="text-gray-700 mb-4">
                    Coaches may create paid challenges on Ryzly where the applicable feature is available.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Unless otherwise agreed, revenue generated from a successfully completed paid challenge is shared:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li><strong className="text-gray-900">Coach:</strong> 70%</li>
                    <li><strong className="text-gray-900">Ryzly:</strong> 30%</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Ryzly&apos;s share covers platform operations, administration, marketing, development, security, and related services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Payouts are processed according to Ryzly&apos;s applicable payout schedule and are subject to applicable taxes, payment-processing requirements, and currency conversion.
                  </p>
                  <p className="text-gray-700">
                    Ryzly may update its revenue-sharing model with reasonable notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">6. Prizes &amp; Payments</h2>
                  <p className="text-gray-700 mb-4">
                    Where a challenge includes prizes, the applicable prize amount and eligibility requirements will be stated in the challenge.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Ryzly may require identity or payment verification before processing payments and may delay payments where necessary to prevent fraud, resolve disputes, or comply with applicable law.
                  </p>
                  <p className="text-gray-700">
                    Participants are responsible for applicable taxes or statutory deductions unless otherwise stated.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">7. Acceptable Use</h2>
                  <p className="text-gray-700 mb-2">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Use Ryzly for unlawful, fraudulent, harmful, or abusive purposes;</li>
                    <li>Submit plagiarized or unauthorized work;</li>
                    <li>Manipulate challenge results;</li>
                    <li>Create fraudulent or duplicate accounts;</li>
                    <li>Misrepresent your skills, qualifications, or identity;</li>
                    <li>Upload malicious software;</li>
                    <li>Harass or impersonate others;</li>
                    <li>Attempt to hack, disrupt, or reverse-engineer Ryzly; or</li>
                    <li>Violate another person&apos;s intellectual-property, privacy, or other legal rights.</li>
                  </ul>
                  <p className="text-gray-700">
                    Ryzly may remove content, disqualify participants, suspend accounts, or take other appropriate action for violations.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">8. Platform Availability</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly may modify, update, suspend, or discontinue features or services at any time.
                  </p>
                  <p className="text-gray-700">
                    We do not guarantee that the Platform will always be available, error-free, or uninterrupted.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">9. Privacy &amp; Personal Information</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly processes personal information in accordance with its Privacy Policy and applicable data-protection laws.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Information may be used to operate accounts, administer challenges, process payments, evaluate participation, facilitate opportunities, prevent fraud, and meet legal or regulatory obligations.
                  </p>
                  <p className="text-gray-700">
                    Where information is shared with an Opportunity Provider, such sharing will be subject to applicable privacy requirements and the relevant challenge terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">10. Refunds &amp; Cancellations</h2>
                  <p className="text-gray-700 mb-4">
                    Refunds may be considered where a technical issue caused by Ryzly prevents access to purchased content or where Ryzly&apos;s applicable refund policy provides otherwise.
                  </p>
                  <p className="text-gray-700">
                    Users and Coaches are responsible for reviewing challenge details before making commitments or purchases.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">11. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by law, Ryzly, ProdotHive Limited, and their directors, employees, contractors, and affiliates shall not be liable for indirect, incidental, special, or consequential losses arising from use of the Platform.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Ryzly does not guarantee:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Employment or recruitment outcomes;</li>
                    <li>Financial or business results;</li>
                    <li>The quality or success of a challenge;</li>
                    <li>The conduct of another user or Opportunity Provider;</li>
                    <li>The success of submitted ideas or products; or</li>
                    <li>Continuous Platform availability.</li>
                  </ul>
                  <p className="text-gray-700">
                    Nothing in these Terms excludes liability that cannot legally be excluded.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">12. Indemnification</h2>
                  <p className="text-gray-700">
                    You agree to indemnify and hold harmless Ryzly, ProdotHive Limited, and their directors, employees, agents, and partners from claims, losses, damages, or expenses arising from your misuse of Ryzly, violation of these Terms, unlawful conduct, or infringement of another person&apos;s rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">13. Intellectual Property Complaints</h2>
                  <p className="text-gray-700 mb-4">
                    If you believe content on Ryzly infringes your intellectual-property rights, contact <strong className="text-gray-900 font-semibold">support@ryzly.app</strong> with details of the work, the allegedly infringing content, evidence of ownership, and your contact information.
                  </p>
                  <p className="text-gray-700">
                    Ryzly may investigate and remove or restrict content where appropriate.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">14. Changes to These Terms</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly may update these Terms from time to time. Where required, material changes will be communicated through appropriate channels.
                  </p>
                  <p className="text-gray-700">
                    Continued use of Ryzly after an updated version takes effect constitutes acceptance of the revised Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">15. Governing Law &amp; Disputes</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms are governed by the laws of the Federal Republic of Nigeria.
                  </p>
                  <p className="text-gray-700">
                    Subject to applicable law, disputes relating to Ryzly shall be handled by the appropriate courts in Port Harcourt, Nigeria.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">16. Contact</h2>
                  <p className="text-gray-700">
                    Email: <strong className="text-gray-900 font-semibold">support@ryzly.app</strong><br />
                    Phone: <strong className="text-gray-900 font-semibold">+234 901 211 6523</strong>
                  </p>
                </div>
              </article>
            )}

            {/* ORGANIZATIONS TERMS */}
            {currentTab === "organizations" && (
              <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base max-w-none">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
                    Organization
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold mt-2">
                    Last Updated: August 2026
                  </p>
                </div>
                
                <p className="text-gray-700">
                  These Organization Terms &amp; Conditions (&quot;Terms&quot;) govern the use of the Ryzly platform by organizations, companies, brands, institutions, agencies, and other entities (&quot;Organization&quot;, &quot;you&quot;, or &quot;your&quot;) that create, sponsor, host, participate in, or administer challenges on Ryzly.
                </p>

                <p className="text-gray-700">
                  By creating an Organization account, submitting a challenge, funding a prize, or otherwise using Ryzly’s organization services, you agree to be bound by these Terms.
                </p>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">1. About Ryzly</h2>
                  <p className="text-gray-700 mb-2">
                    Ryzly is a challenge-powered platform designed to help organizations solve problems by connecting them with digital talent through practical challenges and competitions.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Organizations may use Ryzly Challenges and Challenges to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Solve business needs and challenges;</li>
                    <li>Identify potential employees, contractors, or collaborators;</li>
                    <li>Promote their organization or brand;</li>
                    <li>Evaluate participant skills and creativity; and</li>
                    <li>Empower talents and give them access to opportunities.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">2. Organization Eligibility</h2>
                  <p className="text-gray-700 mb-2">
                    To create and host a challenge on Ryzly, an Organization must:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Provide accurate and complete registration information;</li>
                    <li>Have the legal authority to represent the Organization;</li>
                    <li>Provide accurate information about the challenge;</li>
                    <li>Comply with all applicable laws and regulations;</li>
                    <li>Have the necessary rights and authority over any materials, trademarks, content, or intellectual property submitted to Ryzly;</li>
                    <li>Ensure that its challenge does not violate these Terms or the rights of any third party.</li>
                  </ul>
                  <p className="text-gray-700">
                    Ryzly reserves the right to verify an Organization&apos;s identity or authority and may suspend or reject an Organization where verification is unsuccessful.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">3. Creating a Challenge</h2>
                  <p className="text-gray-700 mb-4">
                    Organizations are responsible for ensuring that all challenge information provided to Ryzly is accurate, complete, and not misleading.
                  </p>
                  <p className="text-gray-700 mb-2">
                    A challenge should clearly state, where applicable:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Challenge title and description;</li>
                    <li>Eligibility requirements or challenge rules;</li>
                    <li>requirements;</li>
                    <li>Submission deadline;</li>
                    <li>Evaluation criteria;</li>
                    <li>Number of winners;</li>
                    <li>Prize amount or other rewards;</li>
                    <li>Winner selection process;</li>
                    <li>Any additional intellectual-property rights or restrictions;</li>
                    <li>Whether participants may use third-party materials;</li>
                    <li>Any applicable confidentiality requirements; and</li>
                    <li>Any other material rules participants need to know before submitting.</li>
                  </ul>
                  <p className="text-gray-700">
                    Ryzly may reject or request changes to a challenge that it considers misleading, unlawful, unsafe, inappropriate, discriminatory, fraudulent, or inconsistent with the purpose of the platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">4. Challenge Fees</h2>
                  <p className="text-gray-700 mb-4">
                    Organizations are responsible for all applicable Ryzly fees associated with their challenges.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Ryzly will charge an additional platform fee equal to 10% of the total winning prize pool for a challenge from organizations.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">
                    For example, where an Organization establishes a total winning prize pool of ₦100,000, the applicable Ryzly platform fee will be ₦10,000.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The applicable Ryzly fee is separate from the prize amount payable to winners.
                  </p>
                  <p className="text-gray-700">
                    Ryzly may introduce additional paid services, promotional packages, sponsorship packages, verification services, or other Organization services. Where applicable, the applicable price will be communicated before the Organization purchases such service.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">5. Prize Funding and Payment</h2>
                  <p className="text-gray-700 mb-4">
                    The Organization is responsible for ensuring that the stated prize pool is fully funded and available for payment to winners before the challenge is published to go live.
                  </p>
                  <p className="text-gray-700">
                    Ryzly will facilitate prize distribution on behalf of an Organization.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">6. Selection of Winners</h2>
                  <p className="text-gray-700 mb-4">
                    The Organization is responsible for evaluating submissions and selecting winners in accordance with the published challenge criteria.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Organizations must evaluate submissions fairly, consistently, and in good faith.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Organizations must not select winners based on discriminatory criteria or criteria that were not reasonably disclosed to participants.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">
                    The organization must approve the winners within 48 hours after the end of the challenge or Ryzly will automatically select and pay the winners.
                  </p>
                  <p className="text-gray-700">
                    Where Ryzly determines that a challenge has been conducted in a fraudulent, manipulated, or materially unfair manner, Ryzly may investigate, suspend the challenge, withhold platform services, or take other reasonable action.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">7. Intellectual Property and Participant Submissions</h2>
                  
                  <div className="mt-4">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">7.1 Submission Rights</h3>
                    <p className="text-gray-700">
                      By submitting work to a challenge, a participant represents that they have the necessary rights to submit the work and that the submission does not knowingly infringe the intellectual-property rights of another person or entity.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">7.2 Ownership of Submissions</h3>
                    <p className="text-gray-700">
                      By submitting work to an Organization challenge, the participant grants the Organization the rights necessary to evaluate, test, validate, use, reproduce, modify, adapt, develop, and otherwise use the submission for the purposes disclosed in the challenge, including talent assessment, product validation, business development, recruitment, and commercial or internal use where applicable.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">7.3 Ryzly&apos;s Rights</h3>
                    <p className="text-gray-700 mb-4">
                      Ryzly may use submissions for purposes connected with operating, promoting, improving, and developing the Ryzly platform and its services.
                    </p>
                    <p className="text-gray-700">
                      This may include displaying submissions on Ryzly, its website, social-media channels, marketing materials, case studies, portfolios, promotional campaigns, or other Ryzly-owned or controlled channels. Ryzly will not represent a participant&apos;s submission as being created by Ryzly.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">7.5 Third-Party Materials</h3>
                    <p className="text-gray-700 mb-4">
                      Organizations must ensure that any materials, trademarks, logos, datasets, images, software, documents, or other intellectual property provided as part of a challenge may legally be used for that challenge.
                    </p>
                    <p className="text-gray-700">
                      Organizations must not require participants to infringe third-party intellectual-property rights.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">8. Participant Privacy and Personal Data</h2>
                  <p className="text-gray-700 mb-4">
                    Organizations may receive access to participant information through Ryzly.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Organizations must:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Use participant information only for legitimate and disclosed purposes;</li>
                    <li>Comply with applicable data-protection and privacy laws;</li>
                    <li>Implement reasonable security measures;</li>
                    <li>Not sell participant information without an appropriate legal basis and required consent;</li>
                    <li>Not use participant information for unrelated purposes without appropriate authorization; and</li>
                    <li>Respect any privacy preferences or restrictions communicated through the platform.</li>
                  </ul>
                  <p className="text-gray-700">
                    Where applicable, Organizations must comply with the Nigeria Data Protection Act and other relevant data-protection requirements. Ryzly may process participant information in accordance with its Privacy Policy and applicable law.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">10. Challenge Content and Prohibited Activities</h2>
                  <p className="text-gray-700 mb-2">
                    Organizations must not create challenges that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Require illegal activity;</li>
                    <li>Facilitate fraud, scams, or deception;</li>
                    <li>Promote discrimination or harassment;</li>
                    <li>Contain unlawful or abusive content;</li>
                    <li>Infringe third-party intellectual-property rights;</li>
                    <li>Require participants to disclose unnecessary sensitive personal information;</li>
                    <li>Mislead participants about compensation or employment opportunities;</li>
                    <li>Require participants to provide unpaid commercial services without appropriate disclosure;</li>
                    <li>Manipulate rankings or results unfairly; or</li>
                    <li>Otherwise violate applicable law or Ryzly policies.</li>
                  </ul>
                  <p className="text-gray-700">
                    Ryzly may remove or suspend any challenge that violates these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">11. Organization Content</h2>
                  <p className="text-gray-700 mb-2">
                    The Organization grants Ryzly a non-exclusive, worldwide, royalty-free licence to use its submitted logos, trademarks, brand assets, challenge descriptions, images, and other promotional materials for purposes of:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Publishing the challenge;</li>
                    <li>Promoting the challenge;</li>
                    <li>Marketing Ryzly;</li>
                    <li>Displaying the Organization as a Ryzly customer or challenge host;</li>
                    <li>Creating case studies;</li>
                    <li>Promoting successful challenges; and</li>
                    <li>Operating and improving the platform.</li>
                  </ul>
                  <p className="text-gray-700">
                    The Organization represents that it has the necessary rights to grant this licence.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">12. Confidential Information</h2>
                  <p className="text-gray-700 mb-4">
                    Organizations should not require participants to disclose confidential or proprietary information unless appropriate safeguards and clear confidentiality requirements are provided.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Where a challenge involves confidential information, the Organization is responsible for determining whether participants must enter into a separate agreement through the challenge rules.
                  </p>
                  <p className="text-gray-700">
                    Ryzly is not responsible for protecting confidential information that an Organization unnecessarily publishes through a public challenge.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">13. Platform Integrity</h2>
                  <p className="text-gray-700 mb-2">
                    Organizations must not:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Manipulate challenge rankings;</li>
                    <li>Create fake participant accounts;</li>
                    <li>Submit fraudulent entries;</li>
                    <li>Interfere with the operation of the platform;</li>
                    <li>Attempt to gain unauthorized access to Ryzly systems;</li>
                    <li>Circumvent applicable Ryzly fees;</li>
                    <li>Use Ryzly to conduct fraudulent recruitment or business activities; or</li>
                    <li>Misrepresent their relationship with Ryzly.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">14. Ryzly&apos;s Role</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly provides the platform and infrastructure through which Organizations and participants interact.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Unless expressly agreed otherwise, Ryzly does not:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Guarantee the quality of participant submissions;</li>
                    <li>Guarantee that a challenge will receive a particular number of submissions;</li>
                    <li>Guarantee commercial outcomes;</li>
                    <li>Independently verify every claim made by an Organization or participant; or</li>
                    <li>Act as an employer, recruiter, agent, or representative of an Organization.</li>
                  </ul>
                  <p className="text-gray-700">
                    Organizations are responsible for their own decisions regarding participants.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">15. Suspension and Termination</h2>
                  <p className="text-gray-700 mb-2">
                    Ryzly may suspend, restrict, or terminate an Organization&apos;s access where Ryzly reasonably believes that the Organization:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Has violated these Terms;</li>
                    <li>Has provided false or misleading information;</li>
                    <li>Has failed to pay applicable fees;</li>
                    <li>Has engaged in fraudulent or abusive conduct;</li>
                    <li>Has violated applicable law;</li>
                    <li>Has compromised the integrity of a challenge; or</li>
                    <li>Has created a risk to Ryzly, participants, or other users.</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Where reasonably practicable, Ryzly may provide the Organization with an opportunity to address the issue before termination.
                  </p>
                  <p className="text-gray-700">
                    Termination does not remove obligations that arose before termination, including payment obligations, intellectual-property rights, confidentiality obligations, and liability obligations.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">16. Cancellations and Refunds</h2>
                  <p className="text-gray-700 mb-4">
                    An Organization may request cancellation of a challenge before participants have materially relied on the challenge.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Refund eligibility, where applicable, will depend on the stage of the challenge, fees already incurred, payment-processing charges, and any other applicable conditions communicated by Ryzly.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Once participant(s) have joined a challenge, refunds may not be available.
                  </p>
                  <p className="text-gray-700">
                    Ryzly reserves the right to determine appropriate refunds where a challenge is cancelled due to circumstances outside the Organization&apos;s control or due to a violation of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">17. Disputes Between Organizations and Participants</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly may assist with platform-related disputes but is not automatically responsible for resolving disputes concerning:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>Employment;</li>
                    <li>Contracts between Organizations and participants;</li>
                    <li>Confidentiality;</li>
                    <li>Intellectual-property infringement; or</li>
                    <li>Other arrangements directly between an Organization and participant.</li>
                  </ul>
                  <p className="text-gray-700">
                    Organizations remain responsible for their interactions and rules with participants.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">18. Indemnification</h2>
                  <p className="text-gray-700 mb-2">
                    The Organization agrees to indemnify and hold harmless Ryzly, its founders, employees, contractors, affiliates, and representatives from claims, losses, liabilities, damages, costs, and expenses arising from:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                    <li>The Organization&apos;s challenge;</li>
                    <li>The Organization&apos;s violation of these Terms;</li>
                    <li>Infringement of third-party rights caused by Organization content;</li>
                    <li>The Organization&apos;s use of participant submissions;</li>
                    <li>The Organization&apos;s interaction with participants;</li>
                    <li>Failure to comply with applicable law; or</li>
                    <li>Fraudulent, negligent, or unlawful conduct by the Organization.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">19. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by applicable law, Ryzly will not be liable for indirect, incidental, special, consequential, or punitive damages arising from an Organization&apos;s use of the platform.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Ryzly&apos;s liability in connection with a particular challenge shall, to the extent permitted by law, be limited to the fees actually paid by the Organization to Ryzly for that challenge during the relevant period.
                  </p>
                  <p className="text-gray-700">
                    Nothing in these Terms excludes liability that cannot legally be excluded or limited.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">20. Changes to These Terms</h2>
                  <p className="text-gray-700 mb-4">
                    Ryzly may update these Terms from time to time.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Where material changes are made, Ryzly may provide notice through the platform, email, or other reasonable means.
                  </p>
                  <p className="text-gray-700">
                    Continued use of Ryzly after the effective date of updated Terms constitutes acceptance of the updated Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">21. Governing Law</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria, unless otherwise required by applicable law.
                  </p>
                  <p className="text-gray-700">
                    Any dispute arising from these Terms shall be subject to the jurisdiction of the appropriate courts of Nigeria, subject to any applicable alternative dispute-resolution requirements.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">22. Entire Agreement</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms, together with any applicable challenge-specific rules, Ryzly policies, pricing terms, and agreements entered into between Ryzly and the Organization, constitute the agreement governing the Organization&apos;s use of Ryzly.
                  </p>
                  <p className="text-gray-700">
                    Where there is a conflict between these Terms and challenge-specific rules, the challenge-specific rules shall apply only to the specific challenge to the extent expressly stated.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">23. Contact</h2>
                  <p className="text-gray-700 mb-4">
                    For questions regarding these Organization Terms &amp; Conditions, Organizations may contact:
                  </p>
                  <p className="text-gray-700 font-bold">
                    Ryzly
                  </p>
                  <p className="text-gray-700">
                    Email: <strong className="text-gray-900 font-semibold">ryzlyhelp@gmail.com</strong><br />
                    Alternate Email: <strong className="text-gray-900 font-semibold">support@ryzly.app</strong><br />
                    Website: <a href="https://www.ryzly.app/" target="_blank" rel="noopener noreferrer" className="text-[#3F4BB4] hover:underline font-semibold">https://www.ryzly.app/</a>
                  </p>
                </div>
              </article>
            )}

          </div>
        </div>
      </div>
    </UnauthorisedLayout>
  );
}