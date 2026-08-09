import { UnauthorisedLayout } from "@/components/shared";

export default function PrivacyPolicy() {
  return (
    <UnauthorisedLayout main={true}>
      <div className="bg-[#FDFDFF] font-figtree pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[15%] min-h-screen text-[#161925]">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-12">
          <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-xs text-gray-500 font-semibold mt-2">
                Last Updated: August, 2026
              </p>
            </div>

            <p className="text-gray-700">
              Ryzly is a Proof of skills and talent discovery Platform owned and operated by ProdotHive Limited (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            </p>
            
            <p className="text-gray-700">
              Ryzly helps talents, coaches, and organizations build skills, showcase work, discover opportunities, solve challenges, validate ideas, build talent pipelines, and connect with one another.
            </p>

            <p className="text-gray-700">
              We are committed to protecting your personal information and handling it responsibly in accordance with applicable data-protection laws, including the Nigeria Data Protection Act (NDPA), GDPR where applicable, and other relevant privacy laws.
            </p>

            <p className="text-gray-700">
              By creating an account or using Ryzly, you acknowledge the practices described in this Privacy Policy.
            </p>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We may collect personal information and non-personal information necessary to operate, secure, and improve Ryzly.
              </p>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.1 Personal Information</h3>
                <p className="text-gray-700 mb-2">Depending on how you use Ryzly, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Full name;</li>
                  <li>Email address;</li>
                  <li>Phone number;</li>
                  <li>Profile photo;</li>
                  <li>Country of residence and nationality;</li>
                  <li>Billing and payment information;</li>
                  <li>Government-issued identification where required for verification or payment;</li>
                  <li>Social media handles or professional profile links where provided; and</li>
                  <li>Other information you voluntarily provide to your profile.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.2 Platform Content</h3>
                <p className="text-gray-700 mb-2">We may collect content you create, upload, or submit, including:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Portfolio projects;</li>
                  <li>Challenge submissions;</li>
                  <li>Documents, images, videos, designs, code, and other project materials;</li>
                  <li>Challenge descriptions and learning materials;</li>
                  <li>Messages between talents, coaches, and organizations;</li>
                  <li>Feedback, assessments, ratings, and comments; and</li>
                  <li>Other content submitted through the Platform.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.3 Usage and Device Information</h3>
                <p className="text-gray-700 mb-2">We may automatically collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>IP address;</li>
                  <li>Browser type;</li>
                  <li>Operating system;</li>
                  <li>Device information;</li>
                  <li>Pages visited;</li>
                  <li>Time spent on the Platform;</li>
                  <li>Clickstream data;</li>
                  <li>Session information;</li>
                  <li>Cookies and similar technologies; and</li>
                  <li>Other analytics and technical information.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.4 Payment and Transaction Information</h3>
                <p className="text-gray-700 mb-2">Where payments are made through Ryzly, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Payment and transaction history;</li>
                  <li>Purchase information;</li>
                  <li>Payout information; and</li>
                  <li>Payment method information processed through our third-party payment providers.</li>
                </ul>
                <p className="text-gray-700">
                  We generally do not store complete payment-card details where these are processed directly by secure third-party payment providers.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.5 Coach Information</h3>
                <p className="text-gray-700 mb-2">If you use Ryzly as a Coach, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Challenge and course information;</li>
                  <li>Revenue and payout information;</li>
                  <li>Referral or affiliate information;</li>
                  <li>Performance and engagement metrics;</li>
                  <li>Challenge participation and completion data; and</li>
                  <li>Other information necessary to administer Coach services.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">1.6 Organization Information</h3>
                <p className="text-gray-700 mb-2">If you use Ryzly as an Organization, brand, institution, or other Opportunity Provider, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Organization or business name;</li>
                  <li>Business email address;</li>
                  <li>Business phone number;</li>
                  <li>Website and social-media links;</li>
                  <li>Organization logo and other brand assets;</li>
                  <li>Industry and business information;</li>
                  <li>Authorized representative or account administrator information;</li>
                  <li>Business verification information where required;</li>
                  <li>Billing and payment information;</li>
                  <li>Challenge and campaign information;</li>
                  <li>Recruitment or talent requirements;</li>
                  <li>Product, business, or challenge information you provide;</li>
                  <li>Communications with talents, coaches, Ryzly, and other users;</li>
                  <li>Challenge performance and engagement data; and</li>
                  <li>Other information necessary to provide Organization services.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-2">We may use information collected through Ryzly to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Create and manage accounts;</li>
                <li>Provide and operate Platform services;</li>
                <li>Display profiles, portfolios, challenges, and relevant Organization information;</li>
                <li>Match talents with challenges, coaches, organizations, and opportunities;</li>
                <li>Facilitate Opportunity Challenges;</li>
                <li>Support talent discovery, assessment, recruitment, and talent-pipeline development;</li>
                <li>Enable organizations to validate ideas, generate solutions, test products, and engage talent;</li>
                <li>Enable Coaches to create and manage challenges;</li>
                <li>Process payments, prizes, and Coach payouts;</li>
                <li>Send notifications, updates, reminders, and service communications;</li>
                <li>Prevent fraud, abuse, unauthorized access, and illegal activity;</li>
                <li>Provide customer support;</li>
                <li>Analyze Platform usage and performance;</li>
                <li>Improve and develop our products and services;</li>
                <li>Conduct marketing and promotional activities where permitted by law and, where required, with your consent;</li>
                <li>Comply with legal, regulatory, tax, and security obligations; and</li>
                <li>Protect the rights, safety, and property of Ryzly and its users.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">3. Legal Bases for Processing</h2>
              <p className="text-gray-700 mb-2">Where GDPR or similar laws apply, we may process personal information based on:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong className="text-gray-900">Consent</strong> – where you have given us permission to process your information;</li>
                <li><strong className="text-gray-900">Contractual necessity</strong> – where processing is necessary to provide services you requested;</li>
                <li><strong className="text-gray-900">Legitimate interests</strong> – such as improving Ryzly, preventing fraud, maintaining security, and facilitating appropriate opportunities;</li>
                <li><strong className="text-gray-900">Legal obligations</strong> – where processing is required by law; and</li>
                <li>Other lawful bases permitted under applicable data-protection laws.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-2">We may share relevant information with:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Other Ryzly users where information is intended to be publicly or selectively displayed;</li>
                <li>Talents, Coaches, and Organizations you interact with;</li>
                <li>Organizations or Opportunity Providers operating relevant challenges;</li>
                <li>Verified employers or partners where appropriate for opportunity or talent matching;</li>
                <li>Service providers that help us operate Ryzly;</li>
                <li>Payment processors and financial service providers;</li>
                <li>Analytics, hosting, security, communication, and technology providers;</li>
                <li>Professional advisers where necessary;</li>
                <li>Law-enforcement or government authorities where legally required; and</li>
                <li>Other parties where you have provided appropriate authorization.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                For example, when you participate in an Opportunity Challenge, information contained in your Ryzly profile or submitted as part of the challenge may be made available to the Organization or Opportunity Provider responsible for that challenge, subject to the challenge rules and applicable privacy requirements.
              </p>
              <p className="text-gray-700 mb-4">
                Similarly, information provided by an Organization may be made available to participants where necessary to operate and participate in an Opportunity Challenge.
              </p>
              <p className="text-gray-700">
                We do not sell or rent personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">5. Public Profiles and Content</h2>
              <p className="text-gray-700 mb-2">
                Certain information you choose to place on your Ryzly profile may be visible to other users, Organizations, Opportunity Providers, or the public depending on the Platform's features and your settings. This may include your:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Name;</li>
                <li>Profile photo;</li>
                <li>Skills;</li>
                <li>Portfolio;</li>
                <li>Challenge participation;</li>
                <li>Achievements;</li>
                <li>Public submissions; and</li>
                <li>Other information you choose to make available.</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                You should avoid publishing information you do not want others to access.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">6. Data Storage and International Transfers</h2>
              <p className="text-gray-700 mb-4">
                Ryzly operates globally, and your information may be stored or processed in countries outside your country of residence.
              </p>
              <p className="text-gray-700">
                Where personal data is transferred internationally, we will use appropriate safeguards required by applicable law, which may include contractual safeguards or other lawful transfer mechanisms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">7. Data Security</h2>
              <p className="text-gray-700 mb-2">
                We use reasonable technical and organizational measures to protect personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Encryption and secure connections;</li>
                <li>Access controls;</li>
                <li>Secure payment processing;</li>
                <li>Server and infrastructure security;</li>
                <li>Monitoring and security procedures; and</li>
                <li>Appropriate internal access restrictions.</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                However, no online system can be guaranteed to be completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">8. Your Rights</h2>
              <p className="text-gray-700 mb-2">
                Depending on your location and applicable law, you may have rights to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Access your personal information;</li>
                <li>Correct inaccurate information;</li>
                <li>Request deletion of your information;</li>
                <li>Object to or restrict certain processing;</li>
                <li>Withdraw consent where processing is based on consent;</li>
                <li>Request data portability;</li>
                <li>Lodge a complaint with a relevant data-protection authority; and</li>
                <li>Exercise other rights provided by applicable law.</li>
              </ul>
              <p className="text-gray-700">
                To exercise your rights or make a privacy request, contact: <strong className="text-gray-900 font-semibold">support@ryzly.app</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">9. Data Retention</h2>
              <p className="text-gray-700 mb-2">
                We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Provide Platform services;</li>
                <li>Maintain account and transaction records;</li>
                <li>Meet legal, tax, regulatory, and contractual obligations;</li>
                <li>Prevent fraud and maintain security;</li>
                <li>Resolve disputes; and</li>
                <li>Establish, exercise, or defend legal claims.</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                You may request account deletion, subject to information we are legally required or otherwise permitted to retain.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">10. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-2">
                Ryzly may use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li>Maintain login sessions;</li>
                <li>Remember preferences;</li>
                <li>Understand Platform usage;</li>
                <li>Improve performance;</li>
                <li>Analyze traffic;</li>
                <li>Maintain security; and</li>
                <li>Personalize aspects of the user experience.</li>
              </ul>
              <p className="text-gray-700">
                You may control certain cookies through your browser or device settings. Disabling some cookies may affect Platform functionality.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">11. Third-Party Services and Links</h2>
              <p className="text-gray-700 mb-4">
                Ryzly may use third-party providers for services such as hosting, payments, analytics, communications, security, and other Platform functionality.
              </p>
              <p className="text-gray-700 mb-4">
                Third-party services operate under their own privacy policies and terms. Ryzly is not responsible for the privacy practices of independent third-party websites or services.
              </p>
              <p className="text-gray-700">
                Where appropriate, we encourage users to review the privacy policies of third-party services before providing information.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">12. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Ryzly is intended for users who are at least 18 years old or the age of majority in their jurisdiction. We do not knowingly collect personal information from individuals who are not eligible to use Ryzly.
              </p>
              <p className="text-gray-700">
                If we become aware that an ineligible minor has provided personal information, we may take reasonable steps to delete the information and terminate the associated account.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-gray-700 mb-4">
                Where required, material changes will be communicated through email, in-app notifications, or other appropriate channels.
              </p>
              <p className="text-gray-700">
                The updated Policy will indicate its effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">14. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact:
              </p>
              <p className="text-gray-700 font-bold">
                Ryzly / ProdotHive Limited
              </p>
              <p className="text-gray-700">
                Email: <strong className="text-gray-900 font-semibold">support@ryzly.app</strong><br />
                Alternate Email: <strong className="text-gray-900 font-semibold">ryzlyhelp@gmail.com</strong><br />
                Phone: <strong className="text-gray-900 font-semibold">+234 901 211 6523</strong>
              </p>
            </div>
          </article>
        </div>
      </div>
    </UnauthorisedLayout>
  );
}