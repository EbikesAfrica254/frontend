import { PolicyData } from "@/data/policies";
import {
  CURRENT_TERMS_VERSION,
  CURRENT_PRIVACY_VERSION,
  POLICY_EFFECTIVE_DATE,
  POLICY_LAST_UPDATED,
} from "./constants";

// TODO: Replace with actual backend fetch when ready
// Example: import { iamFetch } from "@repo/iam/resources/core";
// return iamFetch<PolicyData>(`/api/policies/${type}`, { params: { version } });

const TERMS_CONTENT = `
# Terms & Conditions

## 1. Acceptance of Terms

By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.

## 2. Use License

Permission is granted to temporarily access the materials (information or software) on our service for personal, non-commercial transitory viewing only.

### 2.1 Restrictions

You may not:
- Modify or copy the materials
- Use the materials for any commercial purpose, or for any public display
- Attempt to decompile or reverse engineer any software contained on our service
- Remove any copyright or other proprietary notations from the materials
- Transfer the materials to another person or "mirror" the materials on any other server

### 2.2 Termination

This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.

## 3. Account Terms

### 3.1 Account Responsibility

You are responsible for:
- Maintaining the security of your account and password
- All activities that occur under your account
- Notifying us immediately of any unauthorized use of your account

### 3.2 Account Requirements

- You must be 18 years or older to use this service
- You must provide accurate and complete registration information
- You must not use the service for any illegal or unauthorized purpose

## 4. Service Modifications

We reserve the right to:
- Modify or discontinue the service (or any part thereof) at any time with or without notice
- Refuse service to anyone for any reason at any time
- Update these terms periodically

Your continued use of the service following any changes indicates your acceptance of the new terms.

## 5. Privacy

Your use of the service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the service and informs users of our data collection practices.

## 6. Payment Terms

### 6.1 Billing

- Subscription fees are billed in advance on a recurring basis
- All fees are exclusive of all taxes, levies, or duties
- Refunds are processed according to our refund policy

### 6.2 Cancellation

You may cancel your subscription at any time. Cancellation is effective at the end of the current billing period.

## 7. Intellectual Property

### 7.1 Ownership

The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors.

### 7.2 User Content

You retain all rights to any content you submit, post, or display on or through the service.

## 8. Limitation of Liability

In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
- Your access to or use of or inability to access or use the service
- Any conduct or content of any third party on the service
- Any content obtained from the service
- Unauthorized access, use or alteration of your transmissions or content

## 9. Disclaimer

Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.

## 10. Governing Law

These terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.

## 11. Changes to Terms

We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.

## 12. Contact Information

If you have any questions about these Terms, please contact us at:
- Email: legal@example.com
- Address: Nairobi, Kenya

**Last Updated:** January 15, 2025
`.trim();

const PRIVACY_CONTENT = `
# Privacy Policy

## Introduction

This Privacy Policy describes how we collect, use, and handle your information when you use our service.

## 1. Information We Collect

### 1.1 Information You Provide

- **Account Information**: Name, email address, password
- **Profile Information**: Optional profile details you choose to provide
- **Payment Information**: Billing details processed by our payment providers
- **Communications**: Messages you send to us

### 1.2 Information We Collect Automatically

- **Usage Data**: How you interact with our service
- **Device Information**: Device type, operating system, browser type
- **Log Data**: IP address, access times, pages viewed
- **Cookies**: Small data files stored on your device

## 2. How We Use Your Information

We use the information we collect to:

### 2.1 Provide and Improve Services

- Operate and maintain our service
- Improve, personalize, and expand our service
- Understand and analyze how you use our service
- Develop new products, services, features, and functionality

### 2.2 Communications

- Send you technical notices, updates, security alerts
- Respond to your comments, questions, and customer service requests
- Send you marketing and promotional communications (with your consent)
- Monitor and prevent fraud and abuse

### 2.3 Legal Compliance

- Comply with legal obligations
- Protect our rights and property
- Prevent or investigate possible wrongdoing

## 3. How We Share Your Information

We do not sell your personal information. We may share your information with:

### 3.1 Service Providers

Third-party vendors who perform services on our behalf:
- Cloud hosting providers
- Payment processors
- Analytics providers
- Email service providers

### 3.2 Legal Requirements

When required by law or to:
- Comply with legal process
- Protect our rights, privacy, safety, or property
- Enforce our terms and policies
- Respond to government requests

### 3.3 Business Transfers

In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.

## 4. Data Security

We implement appropriate technical and organizational measures to protect your personal information, including:
- Encryption of data in transit and at rest
- Regular security assessments
- Access controls and authentication
- Secure data centers

However, no method of transmission over the Internet is 100% secure.

## 5. Your Rights and Choices

### 5.1 Access and Update

You can access and update your account information through your account settings.

### 5.2 Data Portability

You can request a copy of your personal information in a portable format.

### 5.3 Deletion

You can request deletion of your personal information, subject to certain exceptions.

### 5.4 Marketing Communications

You can opt out of promotional emails by following the unsubscribe instructions in those emails.

### 5.5 Cookies

You can control cookies through your browser settings.

## 6. Data Retention

We retain your information for as long as necessary to:
- Provide our services
- Comply with legal obligations
- Resolve disputes
- Enforce our agreements

## 7. Children's Privacy

Our service is not directed to children under 18. We do not knowingly collect personal information from children under 18.

## 8. International Data Transfers

Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place.

## 9. Third-Party Links

Our service may contain links to third-party websites. We are not responsible for the privacy practices of these third parties.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by:
- Posting the new Privacy Policy on this page
- Updating the "Last Updated" date
- Sending you an email notification (for material changes)

## 11. Contact Us

If you have questions about this Privacy Policy, please contact us at:
- Email: privacy@example.com
- Address: Nairobi, Kenya

## 12. GDPR Compliance (For EU Users)

If you are in the European Economic Area (EEA), you have additional rights under GDPR:

### 12.1 Legal Basis for Processing

We process your data based on:
- Your consent
- Performance of a contract
- Compliance with legal obligations
- Our legitimate interests

### 12.2 Your GDPR Rights

- Right to access your data
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Right to withdraw consent
- Right to lodge a complaint with a supervisory authority

**Last Updated:** January 15, 2025
`.trim();

export async function getPolicy(
  type: "terms" | "privacy",
  version?: string,
): Promise<PolicyData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const currentVersion =
    type === "terms" ? CURRENT_TERMS_VERSION : CURRENT_PRIVACY_VERSION;
  const requestedVersion = version || currentVersion;

  // In a real implementation, you would fetch from your backend:
  // const response = await fetch(`/api/policies/${type}?version=${requestedVersion}`);
  // return response.json();

  return {
    id: `${type}-${requestedVersion}`,
    type,
    version: requestedVersion,
    effectiveDate: POLICY_EFFECTIVE_DATE,
    lastUpdated: POLICY_LAST_UPDATED,
    content: type === "terms" ? TERMS_CONTENT : PRIVACY_CONTENT,
  };
}

export async function getTermsPolicy(version?: string): Promise<PolicyData> {
  return getPolicy("terms", version);
}

export async function getPrivacyPolicy(version?: string): Promise<PolicyData> {
  return getPolicy("privacy", version);
}
