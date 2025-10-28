// 📄 FILE: src/pages/PrivacyPolicyPage.jsx
// Privacy Policy - Comprehensive legal page with Google Analytics disclosure

import React from 'react';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Restaurant Standards"
        description="Privacy policy for Restaurant Standards training platform. Learn how we protect your data and respect your privacy."
        keywords="privacy policy, data protection, restaurant standards privacy"
        canonicalUrl="https://www.restaurantstandards.com/privacy"
      />
      
      <div className="legal-page">
        <UnifiedHeader />
        
        <div className="legal-content-wrapper">
          <h1 className="legal-page-title">Privacy Policy</h1>
          <p className="legal-last-updated">Last Updated: October 28, 2025</p>
          
          <div className="legal-content">
            
            {/* SECTION 1: Introduction */}
            <div className="legal-section-title">1. Introduction</div>
            <p className="legal-paragraph">
              Welcome to Restaurant Standards ("we," "our," or "us"). We are committed to protecting your privacy 
              and being transparent about how we handle information when you use our website and training platform 
              at restaurantstandards.com (the "Service").
            </p>
            <p className="legal-paragraph">
              This Privacy Policy explains what information we collect, how we use it, and your rights regarding 
              your personal data. By using our Service, you agree to the collection and use of information in 
              accordance with this policy.
            </p>
            
            {/* SECTION 2: Information We Collect */}
            <div className="legal-section-title">2. Information We Collect</div>
            
            <div className="legal-subsection-title">2.1 Analytics Information</div>
            <p className="legal-paragraph">
              We use Google Analytics to understand how visitors use our Service. Google Analytics collects 
              information such as:
            </p>
            <ul className="legal-list">
              <li>Pages you visit on our website</li>
              <li>Time spent on each page</li>
              <li>Browser type and version</li>
              <li>Device type (mobile, tablet, desktop)</li>
              <li>General geographic location (city/country level)</li>
              <li>Referring website (how you found us)</li>
              <li>Anonymous identifiers and cookies</li>
            </ul>
            
            <div className="legal-subsection-title">2.2 No Personal Data Collection</div>
            <p className="legal-paragraph">
              We do not collect, store, or process any personally identifiable information such as:
            </p>
            <ul className="legal-list">
              <li>Names, email addresses, or phone numbers</li>
              <li>Account credentials or login information</li>
              <li>Payment or financial information</li>
              <li>Social security numbers or government IDs</li>
              <li>Photos or personal documents</li>
            </ul>
            <p className="legal-paragraph">
              Our Service does not require user accounts or registration at this time.
            </p>
            
            {/* SECTION 3: How We Use Information */}
            <div className="legal-section-title">3. How We Use Information</div>
            <p className="legal-paragraph">
              The analytics data we collect through Google Analytics is used solely to:
            </p>
            <ul className="legal-list">
              <li>Understand how users navigate and interact with our training content</li>
              <li>Improve the user experience and platform functionality</li>
              <li>Identify technical issues and optimize website performance</li>
              <li>Analyze which training modules are most valuable to users</li>
              <li>Make informed decisions about content development</li>
            </ul>
            
            {/* SECTION 4: What We Don't Do */}
            <div className="legal-section-title">4. What We Don't Do With Your Information</div>
            
            <div className="legal-emphasis-box">
              <p className="legal-paragraph">
                <strong>We want to be crystal clear about what we DON'T do:</strong>
              </p>
              <ul className="legal-list">
                <li><strong>We do not sell your data</strong> to anyone, ever.</li>
                <li><strong>We do not share your data</strong> with third-party advertisers or marketers.</li>
                <li><strong>We do not track you</strong> across other websites beyond standard Google Analytics.</li>
                <li><strong>We do not create user profiles</strong> for advertising purposes.</li>
                <li><strong>We do not send spam</strong> or unsolicited communications (we don't even have your email).</li>
              </ul>
            </div>
            
            {/* SECTION 5: Google Analytics */}
            <div className="legal-section-title">5. Google Analytics</div>
            <p className="legal-paragraph">
              Google Analytics is a web analytics service provided by Google, Inc. Google uses the data collected 
              to track and monitor the use of our Service. This data is shared with other Google services and may 
              be used by Google to contextualize and personalize ads in its own advertising network.
            </p>
            <p className="legal-paragraph">
              For more information on Google's privacy practices, please visit the Google Privacy & Terms page: 
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> 
                https://policies.google.com/privacy
              </a>
            </p>
            <p className="legal-paragraph">
              You can opt-out of having your activity on the Service made available to Google Analytics by 
              installing the Google Analytics opt-out browser add-on. The add-on prevents Google Analytics 
              JavaScript from sharing information with Google Analytics about visit activity. Visit: 
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                {' '}https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
            
            {/* SECTION 6: Cookies */}
            <div className="legal-section-title">6. Cookies</div>
            <p className="legal-paragraph">
              Our Service uses cookies (small data files stored on your device) for Google Analytics tracking. 
              These cookies help us understand how you use our website. For detailed information about the 
              cookies we use and how to manage them, please see our{' '}
              <a href="/cookies">Cookies Policy</a>.
            </p>
            
            {/* SECTION 7: Your Rights */}
            <div className="legal-section-title">7. Your Rights and Choices</div>
            <p className="legal-paragraph">
              Even though we don't collect personal information, you still have control over your data:
            </p>
            <ul className="legal-list">
              <li><strong>Cookie Control:</strong> You can disable cookies in your browser settings, though this may affect website functionality.</li>
              <li><strong>Do Not Track:</strong> We honor Do Not Track signals and do not track users when a DNT browser mechanism is in place.</li>
              <li><strong>Analytics Opt-Out:</strong> You can opt out of Google Analytics using the browser add-on mentioned above.</li>
            </ul>
            
            {/* SECTION 8: Data Security */}
            <div className="legal-section-title">8. Data Security</div>
            <p className="legal-paragraph">
              Since we don't collect or store personal information on our servers, there is minimal risk to your 
              data from our Service. The analytics data collected by Google Analytics is secured according to 
              Google's security policies and practices.
            </p>
            
            {/* SECTION 9: Children's Privacy */}
            <div className="legal-section-title">9. Children's Privacy</div>
            <p className="legal-paragraph">
              Our Service is intended for professional use in the hospitality industry and is not directed at 
              children under the age of 13. We do not knowingly collect information from children under 13. 
              If you are a parent or guardian and believe your child has accessed our Service, please contact 
              us at the email below.
            </p>
            
            {/* SECTION 10: International Users */}
            <div className="legal-section-title">10. International Users</div>
            <p className="legal-paragraph">
              Our Service is operated in the United States. If you are accessing our Service from outside the 
              United States, please be aware that information collected through Google Analytics may be 
              transferred to, stored, and processed in the United States and other countries where Google 
              operates.
            </p>
            
            {/* SECTION 11: Third-Party Links */}
            <div className="legal-section-title">11. Third-Party Links</div>
            <p className="legal-paragraph">
              Our Service may contain links to third-party websites (such as Amazon for our book). We are not 
              responsible for the privacy practices of these external sites. We encourage you to review the 
              privacy policies of any third-party sites you visit.
            </p>
            
            {/* SECTION 12: Changes to Privacy Policy */}
            <div className="legal-section-title">12. Changes to This Privacy Policy</div>
            <p className="legal-paragraph">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date at the top.
            </p>
            <p className="legal-paragraph">
              We encourage you to review this Privacy Policy periodically for any changes. Changes to this 
              Privacy Policy are effective when they are posted on this page.
            </p>
            
            {/* SECTION 13: GDPR Compliance */}
            <div className="legal-section-title">13. European Users (GDPR)</div>
            <p className="legal-paragraph">
              If you are located in the European Economic Area (EEA), you have certain data protection rights 
              under the General Data Protection Regulation (GDPR). Since we do not collect personal data directly, 
              GDPR rights primarily relate to Google Analytics data:
            </p>
            <ul className="legal-list">
              <li><strong>Right to Access:</strong> You can request information about data Google Analytics collects.</li>
              <li><strong>Right to Deletion:</strong> You can opt out of Google Analytics tracking.</li>
              <li><strong>Right to Object:</strong> You can object to analytics tracking by using browser settings.</li>
            </ul>
            
            {/* SECTION 14: Contact */}
            <div className="legal-contact-section">
              <div className="legal-contact-title">Questions About This Privacy Policy?</div>
              <p className="legal-paragraph">
                If you have any questions or concerns about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <a href="mailto:derekengles@gmail.com" className="legal-contact-email">
                derekengles@gmail.com
              </a>
            </div>
            
          </div>
        </div>
        
        <DesktopFooter />
        <MobileNav />
      </div>
    </>
  );
}

export default PrivacyPolicyPage;