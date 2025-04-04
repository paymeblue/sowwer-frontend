import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <section className="mx-auto max-w-[1560px] space-y-6 px-36 py-40">
      <div>
        <h1 className="mb-6 font-aeonik text-[42px] font-medium leading-[48px] text-black">
          Privacy Policy
        </h1>
        <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
          <strong className="font-medium">
            Last Updated: February 26, 2025
          </strong>
          <span>
            SOOWER is committed to protecting your privacy and ensuring the
            security of your personal information. This Privacy Policy outlines
            how we collect, use, store, and protect the information you provide
            when using our website and services.
          </span>
          <span>
            By accessing and using SOOWER, you agree to the collection and use
            of your information as described in this policy. If you do not
            agree, please refrain from using our platform.
          </span>
        </p>
      </div>

      <ol className="space-y-5">
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            1. Information We Collect
          </p>
          <p className="font-montreal tracking-[-0.4px] text-body-1">
            We collect different types of information to&nbsp;
            <strong className="font-medium">
              process donations, manage accounts, and improve our services
            </strong>
            . The information we collect includes:
          </p>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              1.1 Personal Information
            </p>
            <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
              When you interact with our platform, we may collect:
            </p>
            <ul className="ms-1 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
              <li>Full Name (for identification and communication)</li>
              <li>
                Email Address (for account creation, updates, and donor
                receipts)
              </li>
              <li>Phone Number (for notifications and support)</li>
              <li>Billing Address (for payment verification, if applicable)</li>
            </ul>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              1.2 Transaction Information
            </p>
            <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
              When making a donation or sponsoring a child, we collect:
            </p>
            <ul className="ms-1 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
              <li>
                Donation amount and purpose (e.g., WidowCare, MissionCare, DAD
                Project)
              </li>
              <li>Payment method (credit/debit card, bank transfer, etc.)</li>
              <li>Transaction history to maintain donation records</li>
            </ul>
            <p className="mt-2 font-montreal text-base tracking-[-0.4px] text-body-1">
              <strong className="font-medium">Note:</strong> We&nbsp;
              <strong className="font-medium">do not&nbsp;</strong>store your
              card details. Payments are processed securely through third-party
              providers.
            </p>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              1.3 Automatically Collected Information
            </p>
            <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
              When you visit our website, certain data is collected
              automatically:
            </p>
            <ul className="ms-1 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
              <li>
                IP Address and device details (to enhance security and prevent
                fraud)
              </li>
              <li>
                Browser Type and Operating System (for website optimization)
              </li>
              <li>Usage Data (e.g., pages visited, time spent on the site)</li>
            </ul>
            <p className="mt-2 font-montreal text-base tracking-[-0.4px] text-body-1">
              This information helps us understand how users interact with
              SOOWER and improve user experience.
            </p>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            2. How We Use Your Information
          </p>
          <div className="space-y-4">
            <div>
              <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
                We use the collected information for the following purposes:
              </p>
              <ul className="ms-2 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
                <li>
                  <strong className="font-medium">
                    To process donations and sponsorships
                  </strong>
                  &nbsp;- Ensuring funds reach the selected programs and
                  recipients.
                </li>
                <li>
                  <strong className="font-medium">
                    To create and manage donor accounts
                  </strong>
                  &nbsp;- Allowing users to track their giving history.
                </li>
                <li>
                  <strong className="font-medium">
                    To communicate with users
                  </strong>
                  &nbsp;- Sending donation confirmations, impact updates, and
                  important notifications.
                </li>
                <li>
                  <strong className="font-medium">To enhance security</strong>
                  &nbsp;- Detecting and preventing fraudulent activity.
                </li>
                <li>
                  <strong className="font-medium">
                    To improve our platform
                  </strong>
                  &nbsp;- Analyzing user behavior to optimize website
                  functionality.
                </li>
              </ul>
            </div>
            <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
              We only use your data for purposes that align with our mission and
              legal obligations.
            </p>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            3. Sharing and Disclosure of Information
          </p>
          <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
            SOOWER does&nbsp;
            <strong className="font-medium">not sell, trade, or rent</strong>
            &nbsp;your personal information. However, we may share information
            in the following cases:
          </p>

          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              3.1 With Payment Processors
            </p>
            <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
              We work with trusted third-party payment providers to process
              donations securely. Your financial details are handled by these
              providers in compliance with industry security standards.
            </p>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              3.2 Legal Requirements
            </p>
            <p className="font-montreal text-base tracking-[-0.4px] text-body-1">
              We may disclose your information if required to:
            </p>
            <ul className="ms-1 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
              <li>
                <strong className="font-medium">
                  Comply with legal obligations
                </strong>
                &nbsp;(e.g., court orders, law enforcement requests).
              </li>
              <li>
                <strong className="font-medium">
                  Protect the rights, safety, and security
                </strong>
                &nbsp;of SOOWER and its users.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            4. Data Security Measures
          </p>
          <div className="space-y-4">
            <p className="font-montreal tracking-[-0.4px] text-body-1">
              We take data protection seriously and implement the following
              measures:
            </p>
            <ul className="ms-2 list-inside list-disc space-y-1 font-montreal tracking-[-0.4px] text-body-1">
              <li>
                <strong className="font-medium">Encryption</strong>
                &nbsp;- Secure encryption protocols protect personal and
                transaction data.
              </li>
              <li>
                <strong className="font-medium">Access Controls</strong>
                &nbsp;- Only authorized personnel can access sensitive data.
              </li>
              <li>
                <strong className="font-medium">Regular Security Audits</strong>
                &nbsp;- We routinely review our systems to identify and fix
                vulnerabilities.
              </li>
            </ul>
            <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
              While we take strong precautions, no method of data transmission
              is 100% secure. Users should also take steps to protect their
              accounts by using strong passwords and keeping login credentials
              confidential.
            </p>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            5. Your Data Rights & Choices
          </p>
          <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
            As a user, you have the following rights regarding your data:
          </p>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              5.1 Right to Access
            </p>
            <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
              You can request a copy of the personal data we have about you.
            </p>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              5.2 Right to Update or Correct Information
            </p>
            <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
              If your personal details change, you can update your profile or
              contact us to make corrections.
            </p>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              5.3 Right to Request Deletion
            </p>
            <p className="flex flex-col gap-6 font-montreal tracking-[-0.4px] text-body-1">
              You can request that we delete your data, except for information
              needed to comply with legal or financial obligations.
            </p>
          </div>
          <div>
            <p className="my-2 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              5.4 Right to Opt-Out of Communications
            </p>
            <p className="font-montreal tracking-[-0.4px] text-body-1">
              You can unsubscribe from our emails and marketing messages at any
              time using the unsubscribe link in our emails. To exercise any of
              these rights, please contact us at:&nbsp;
              <Link
                href="mailto:info@soower.org"
                className="cursor-pointer font-medium"
              >
                info@soower.org
              </Link>
            </p>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            6. Cookies and Tracking Technologies
          </p>

          <p className="font-montreal tracking-[-0.4px] text-body-1">
            SOOWER uses cookies and similar tracking technologies to improve
            your browsing experience.
          </p>
          <div>
            <p className="mb-1 mt-3 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              6.1 What Are Cookies?
            </p>
            <p className="font-montreal tracking-[-0.4px] text-body-1">
              Cookies are small files stored on your device that help our
              website function efficiently and remember your preferences.
            </p>
          </div>
          <div>
            <p className="mb-1 mt-3 font-aeonik text-[18px] font-medium tracking-[-0.4px] text-black">
              6.2 How We Use Cookies
            </p>
            <ul className="ms-1 list-inside list-disc font-montreal tracking-[-0.4px] text-body-1">
              <li>
                <strong className="font-medium">Essential Cookies</strong>
                &nbsp;- Required for core website functions, such as logging in.
              </li>
              <li>
                <strong className="font-medium">Performance Cookies</strong>
                &nbsp;- Help us understand website traffic and user
                interactions.
              </li>
              <li>
                <strong className="font-medium">Marketing Cookies</strong>
                &nbsp;- Allow us to show relevant updates and fundraising
                campaigns.
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-1 mt-3 font-aeonik  text-[18px] font-medium tracking-[-0.4px] text-black">
              6.3 Managing Cookies
            </p>
            <p className="font-montreal tracking-[-0.4px] text-body-1">
              You can control or disable cookies in your browser settings.
              However, disabling cookies&nbsp;
              <strong className="font-medium">
                may affect website functionality.
              </strong>
            </p>
          </div>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            7. Changes to Privacy Policy
          </p>
          <p className="font-montreal leading-[26px] tracking-[-0.4px] text-body-1">
            SOOWER may update these policies periodically. The latest version
            will always be available on our website, and users will be notified
            of significant changes.
          </p>
        </li>
        <li>
          <p className="font-aeonik text-[21px] font-medium tracking-[-0.4px] text-black">
            8. Contact Information
          </p>
          <p className="flex flex-col font-montreal text-base leading-[26px] tracking-[-0.4px] text-body-1">
            <span>
              For any questions or concerns about our Terms of Use or Acceptable
              Use Policy, please contact us at:
            </span>
            <Link
              href="mailto:info@soower.org"
              className="font-montreal text-base font-medium leading-[26px] text-body-1 hover:cursor-pointer"
            >
              📧 info@soower.org
            </Link>
            <p className="font-montreal text-base font-medium leading-[26px] text-body-1">
              <span>📞</span>&nbsp;
              <Link href="tel:+2349055553431" className="hover:cursor-pointer">
                (+234) 905 555 3431
              </Link>
              <span>;</span>&nbsp;
              <Link href="tel:+2347076016055" className="hover:cursor-pointer">
                (+234) 707 601 6055
              </Link>
            </p>
          </p>
        </li>
      </ol>
    </section>
  );
};

export default PrivacyPolicy;
