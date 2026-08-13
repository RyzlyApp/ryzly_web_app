import { UnauthorisedLayout } from "@/components/shared";

export default function TermsOfUse() {
  return (
    <UnauthorisedLayout main={true}>
      <div className="bg-[#FDFDFF] font-figtree pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[15%] min-h-screen text-[#161925]">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-12">
          <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
              Terms & Conditions
            </h1>
            
            <p className="text-gray-700">
              Welcome to Ryzly, a global <strong className="text-gray-900 font-semibold">Challenge-Based experience & Portfolio Building Platform</strong> owned and operated by ProdotHive Limited. These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of our web application, products, and services (collectively, the &quot;Platform&quot;). By accessing or using Ryzly, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
            </p>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">1. Eligibility</h2>
              <p className="text-gray-700">
                You must be <strong className="text-gray-900 font-semibold">at least 18 years old</strong>, or the age of majority in your jurisdiction, to create an account or use Ryzly.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">2. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To use Ryzly, you must create an account using your <strong className="text-gray-900 font-semibold">email address</strong> and a <strong className="text-gray-900 font-semibold">one-time password (OTP)</strong> which we will send to you. You agree to provide accurate information and keep your account secure. You are responsible for all activity that occurs under your account.
              </p>
              <p className="text-gray-700">
                Ryzly reserves the right to suspend or terminate any account for misuse, false information, or breach of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">4. Platform Services</h2>
              <p className="text-gray-700 mb-4">
                Ryzly provides a platform for coaches to create digital challenges and practice projects.
              </p>
              <p className="text-gray-700">
                Ryzly is not the creator of user-generated content and bears no responsibility for the accuracy, legality, or value of such content.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">5. Subscription Plans / Revenue Sharing</h2>
              <p className="text-gray-700 mb-4">
                Coaches do not need to pay any subscription fees at this time. Revenue generated from the challenges is shared as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  <strong className="text-gray-900">Coaches receive 70%</strong> of the revenue from each successfully completed challenge.
                </li>
                <li>
                  <strong className="text-gray-900">Ryzly retains 30%</strong> to cover administrative and operational expenses, marketing and promotional activities, platform development, and security.
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong className="text-gray-900">Payouts</strong> are processed at the end of the month after a challenge is successfully completed. Coaches are responsible for ensuring that their wallet and payment details are correctly configured to receive funds.
              </p>
              <p className="text-gray-700 mb-2">
                All earnings are subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Applicable local tax laws</li>
                <li>Bank processing policies</li>
                <li>Currency exchange rates</li>
              </ul>
              <p className="text-gray-700">
                Ryzly reserves the right to review and update this revenue-sharing model, with prior notice provided to affected users.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">6. Refunds and Cancellations</h2>
              <p className="text-gray-700 mb-4">
                All enrollments and purchases made on Ryzly are <strong className="text-gray-900 font-semibold">final</strong>, unless otherwise stated. Refunds will only be granted under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>The challenge <strong className="text-gray-900 font-semibold">was not accessed</strong>, or</li>
                <li>A <strong className="text-gray-900 font-semibold">technical error</strong> on Ryzly’s side prevented access to the purchased content.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Users are responsible for reviewing all challenge details prior to enrollment.
              </p>
              <p className="text-gray-700">
                Unauthorized chargebacks or disputes filed outside the official refund process may result in <strong className="text-gray-900 font-semibold">account suspension</strong> or other appropriate actions.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">7. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Use Ryzly for unlawful, harmful, or abusive purposes.</li>
                <li>Attempt to hack, disrupt, or reverse-engineer the Service.</li>
                <li>Upload malicious software.</li>
                <li>Engage in spam, harassment, or other prohibited behavior.</li>
              </ul>
              <p className="text-gray-700">
                No additional restrictions apply beyond standard use rules.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">8. Service Availability</h2>
              <p className="text-gray-700">
                Ryzly may update, modify, or discontinue features at any time. We make no guarantee that the Service will be error-free or uninterrupted.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">9. Coach and User Obligations</h2>
              <p className="text-gray-700 mb-4">
                All users, including coaches and talents, agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Comply with all applicable laws and regulations, including those related to intellectual property and data protection.</li>
                <li>Refrain from uploading, posting, or distributing content that is offensive, fraudulent, violent, misleading, or otherwise harmful.</li>
                <li>Avoid impersonating any person or entity, or misrepresenting their affiliation with any individual, organization, or group.</li>
              </ul>
              <p className="text-gray-700">
                Ryzly reserves the right to remove content or suspend users who violate these obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">10. License to Use Content</h2>
              <p className="text-gray-700 mb-4">
                By uploading content or scheduling a challenge on Ryzly, you grant Ryzly a <strong className="text-gray-900 font-semibold">non-exclusive, royalty-free, worldwide, and sublicensable license</strong> to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Host, use, reproduce, modify, distribute, and publicly display your content and challenges as necessary to operate and improve the platform.</li>
                <li>Promote your challenge or classes through email campaigns, advertisements, and other marketing channels.</li>
              </ul>
              <p className="text-gray-700">
                This license remains in effect <strong className="text-gray-900 font-semibold">even after your account is terminated</strong>, to the extent necessary for Ryzly’s legitimate business and legal purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">11. Modifications and Platform Updates</h2>
              <p className="text-gray-700 mb-4">Ryzly reserves the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Modify, improve, or discontinue any feature or component of the platform at any time.</li>
                <li>Update or revise these Terms, with notice provided to users when required.</li>
              </ul>
              <p className="text-gray-700">
                Your continued use of the platform after any updates or modifications constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">12. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Ryzly integrates with various third-party service providers (including but not limited to Agora, DigitalOcean, Cloudflare, and Paystack, etc) to support core platform functionality.
              </p>
              <p className="text-gray-700 mb-2">
                Ryzly is <strong className="text-gray-900 font-semibold">not responsible or liable</strong> for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Service failures, downtime, or interruptions caused by these external providers.</li>
                <li>Security issues or vulnerabilities that originate from third-party systems.</li>
                <li>Changes in features, pricing, or policies made by integrated platforms.</li>
              </ul>
              <p className="text-gray-700">
                Users acknowledge that their use of these third-party services is subject to the <strong className="text-gray-900 font-semibold">separate terms and privacy policies</strong> of the respective providers.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">13. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Ryzly (along with its directors, employees, contractors, and affiliates) shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
                <li>Loss of profits, revenue, data, business opportunities, or goodwill.</li>
                <li>Unauthorized access to, or use of, your account, content, or personal data.</li>
                <li>Service interruptions, downtime, errors, or failures caused by the platform or third-party providers.</li>
              </ul>
              <p className="text-gray-700">
                This limitation applies <strong className="text-gray-900 font-semibold">even if Ryzly has been advised of the possibility</strong> of such damages or should have reasonably foreseen them.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">14. No Guarantee of Results</h2>
              <p className="text-gray-700 mb-4">Ryzly makes no guarantees regarding:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Earnings, income, or financial results from using the platform.</li>
                <li>Specific learning, performance, or skill-development outcomes.</li>
                <li>Career growth, business success, or professional advancement.</li>
              </ul>
              <p className="text-gray-700">
                Any success achieved on the platform depends on individual effort, the quality of content provided, user engagement, and external market factors.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">15. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, and hold harmless Ryzly, its directors, employees, agents, and partners from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Your use or misuse of the platform.</li>
                <li>Your violation of these Terms.</li>
                <li>Any classes you schedule or any content you upload, post, or distribute.</li>
                <li>Any infringement or violation of the rights of third parties, including intellectual property or privacy rights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">16. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                Ryzly shall not be held liable for any delay, interruption, or failure to perform its obligations arising from circumstances beyond its reasonable control, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Natural disasters or acts of God.</li>
                <li>War, terrorism, civil unrest, or riots.</li>
                <li>Government regulations, restrictions, or legal orders.</li>
                <li>Power outages, network disruptions, or widespread internet failures.</li>
              </ul>
              <p className="text-gray-700">
                Such events shall not constitute a breach of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">17. Community Conduct</h2>
              <p className="text-gray-700 mb-4">
                Users are expected to engage on Ryzly with respect and professionalism. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Treating all members of the community courteously.</li>
                <li>Avoiding abusive, offensive, or disruptive behavior.</li>
                <li>Refraining from any actions that undermine the safety or integrity of the platform.</li>
              </ul>
              <p className="text-gray-700">
                Ryzly reserves the right to <strong className="text-gray-900 font-semibold">suspend or permanently ban</strong> users who violate these community standards, <strong className="text-gray-900 font-semibold">with no entitlement to a refund</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">18. Retention of Personal Information</h2>
              <p className="text-gray-700 mb-4">
                Ryzly adheres to applicable international data protection standards, including GDPR, CCPA, and NDPR. We retain personal information under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>For as long as your account remains active.</li>
                <li>For the period required to meet legal, tax, regulatory, or operational obligations.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                The types of data we may retain include, but are not limited to: names, email addresses, activity logs, device information, cookies, usage analytics, and class-related activity.
              </p>
              <p className="text-gray-700">
                Users have the right to request access to, correction of, or deletion of their personal data in accordance with applicable laws. For any data-related inquiries or requests, please contact <strong className="text-gray-900 font-semibold">support@ryzly.app</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">19. Intellectual Property Complaint Procedure</h2>
              <p className="text-gray-700 mb-4">
                If you believe that your intellectual property rights have been infringed on Ryzly, you may submit a claim by emailing <strong className="text-gray-900 font-semibold">support@ryzly.app</strong> with the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>A description of the copyrighted work or protected intellectual property you believe has been violated.</li>
                <li>A clear identification or link to the infringing content on the platform.</li>
                <li>Evidence demonstrating your ownership of the work.</li>
                <li>Your full name, contact information, and a statement confirming the accuracy of your claim.</li>
              </ul>
              <p className="text-gray-700">
                Ryzly will investigate the matter and take appropriate action, which may include removing the content or disabling the associated account. Repeat offenders may be <strong className="text-gray-900 font-semibold">permanently banned</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">20. Legal Jurisdiction and Dispute Handling</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of the <strong className="text-gray-900 font-semibold">Federal Republic of Nigeria</strong>. Any dispute arising from or relating to the use of Ryzly shall be resolved exclusively in the courts located in <strong className="text-gray-900 font-semibold">Port Harcourt, Nigeria</strong>, except where Ryzly seeks injunctive or equitable relief in another jurisdiction as necessary.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">21. Updates to These Terms</h2>
              <p className="text-gray-700">
                Ryzly may update or revise these Terms from time to time. Any material changes will be communicated to users through appropriate channels. Your continued use of the platform after such updates constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">22. Contact</h2>
              <p className="text-gray-700">
                For questions about these Terms:<br />
                Email: <strong className="text-gray-900 font-semibold">support@ryzly.app</strong><br />
                Phone: <strong className="text-gray-900 font-semibold">+234 901 211 6523</strong>
              </p>
            </div>
          </article>
        </div>
      </div>
    </UnauthorisedLayout>
  );
}