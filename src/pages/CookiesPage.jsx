// 📄 FILE: src/pages/CookiesPage.jsx
// Cookies Policy - NEW PAGE explaining Google Analytics cookies and user controls

import React from 'react';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

function CookiesPage() {
  return (
    <>
      <SEO 
        title="Cookies Policy - Restaurant Standards"
        description="Learn about cookies used on Restaurant Standards platform. We use Google Analytics to improve your experience. Control your cookie preferences."
        keywords="cookies policy, google analytics cookies, website cookies, privacy controls"
        canonicalUrl="https://www.restaurantstandards.com/cookies"
      />
      
      <div className="legal-page">
        <UnifiedHeader />
        
        <div className="legal-content-wrapper">
          <h1 className="legal-page-title">Cookies Policy</h1>
          <p className="legal-last-updated">Last Updated: October 28, 2025</p>
          
          <div className="legal-content">
            
            {/* SECTION 1: What Are Cookies */}
            <div className="legal-section-title">1. What Are Cookies?</div>
            <p className="legal-paragraph">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when 
              you visit a website. They are widely used to make websites work more efficiently and provide 
              information to website owners.
            </p>
            <p className="legal-paragraph">
              Cookies allow a website to recognize your device and remember information about your visit, such as 
              your preferred settings or which pages you visited. This helps improve your browsing experience on 
              future visits.
            </p>
            
            {/* SECTION 2: How We Use Cookies */}
            <div className="legal-section-title">2. How We Use Cookies</div>
            <p className="legal-paragraph">
              Restaurant Standards uses cookies for a single purpose: <strong>website analytics</strong>. We use 
              Google Analytics to understand how visitors interact with our training platform so we can improve 
              the user experience and content.
            </p>
            <p className="legal-paragraph">
              We do <strong>not</strong> use cookies for:
            </p>
            <ul className="legal-list">
              <li>Advertising or marketing purposes</li>
              <li>Tracking you across other websites</li>
              <li>Selling your data to third parties</li>
              <li>Creating user profiles for commercial purposes</li>
              <li>Storing personal information like names or email addresses</li>
            </ul>
            
            {/* SECTION 3: Types of Cookies */}
            <div className="legal-section-title">3. Types of Cookies We Use</div>
            
            <div className="legal-subsection-title">3.1 Google Analytics Cookies</div>
            <p className="legal-paragraph">
              These cookies collect information about how visitors use our website. All information collected 
              is anonymous and used only to improve our Service. Google Analytics cookies collect:
            </p>
            <ul className="legal-list">
              <li>Number of visitors to the site</li>
              <li>Pages visited and time spent on each page</li>
              <li>Where visitors came from (referring website)</li>
              <li>Device type (mobile, tablet, desktop)</li>
              <li>Browser type and version</li>
              <li>General geographic location (city/country level)</li>
            </ul>
            
            <div className="legal-subsection-title">3.2 Cookie Details</div>
            <p className="legal-paragraph">
              Below are the specific cookies set by Google Analytics on our website:
            </p>
            
            <table className="legal-table">
              <thead>
                <tr>
                  <th className="legal-table-header">Cookie Name</th>
                  <th className="legal-table-header">Purpose</th>
                  <th className="legal-table-header">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="legal-table-cell"><strong>_ga</strong></td>
                  <td className="legal-table-cell">Distinguishes unique users by assigning a randomly generated number</td>
                  <td className="legal-table-cell">2 years</td>
                </tr>
                <tr>
                  <td className="legal-table-cell"><strong>_ga_[container-id]</strong></td>
                  <td className="legal-table-cell">Used to persist session state</td>
                  <td className="legal-table-cell">2 years</td>
                </tr>
                <tr>
                  <td className="legal-table-cell"><strong>_gid</strong></td>
                  <td className="legal-table-cell">Distinguishes users</td>
                  <td className="legal-table-cell">24 hours</td>
                </tr>
                <tr>
                  <td className="legal-table-cell"><strong>_gat</strong></td>
                  <td className="legal-table-cell">Used to throttle request rate</td>
                  <td className="legal-table-cell">1 minute</td>
                </tr>
              </tbody>
            </table>
            
            {/* SECTION 4: First vs Third Party */}
            <div className="legal-section-title">4. First-Party vs. Third-Party Cookies</div>
            
            <div className="legal-subsection-title">4.1 Third-Party Cookies</div>
            <p className="legal-paragraph">
              The cookies we use are <strong>third-party cookies</strong> because they are set by Google Analytics, 
              not directly by Restaurant Standards. However, these cookies are used solely for our benefit to 
              understand how our website is being used.
            </p>
            
            <div className="legal-subsection-title">4.2 No First-Party Cookies</div>
            <p className="legal-paragraph">
              We do not set any first-party cookies (cookies set directly by restaurantstandards.com) at this time. 
              If this changes in the future, we will update this policy.
            </p>
            
            {/* SECTION 5: How to Control Cookies */}
            <div className="legal-section-title">5. How to Control and Delete Cookies</div>
            <p className="legal-paragraph">
              You have several options to control or delete cookies:
            </p>
            
            <div className="legal-subsection-title">5.1 Browser Settings</div>
            <p className="legal-paragraph">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="legal-list">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies after each browsing session</li>
              <li>Receive notifications when cookies are being set</li>
            </ul>
            <p className="legal-paragraph">
              Here's how to manage cookies in popular browsers:
            </p>
            <ul className="legal-list">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            
            <div className="legal-subsection-title">5.2 Google Analytics Opt-Out</div>
            <p className="legal-paragraph">
              You can specifically opt out of Google Analytics tracking by installing the Google Analytics 
              Opt-out Browser Add-on. This add-on prevents Google Analytics JavaScript from sharing information 
              with Google Analytics about your visit.
            </p>
            <p className="legal-paragraph">
              Download the add-on at:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
            
            <div className="legal-subsection-title">5.3 Do Not Track</div>
            <p className="legal-paragraph">
              We respect Do Not Track (DNT) signals. If your browser has DNT enabled, we honor that preference. 
              However, please note that Google Analytics may still set cookies unless you specifically opt out 
              using the methods above.
            </p>
            
            {/* SECTION 6: Impact of Disabling */}
            <div className="legal-section-title">6. Impact of Disabling Cookies</div>
            <p className="legal-paragraph">
              If you disable or delete cookies:
            </p>
            <ul className="legal-list">
              <li><strong>Our website will still function normally.</strong> We don't require cookies for basic functionality.</li>
              <li>We won't be able to see how you use our website, which may limit our ability to improve your experience.</li>
              <li>Your preferences (if any are set in the future) won't be saved between visits.</li>
            </ul>
            <p className="legal-paragraph">
              <strong>Bottom line:</strong> You can completely disable cookies and still access all of our training 
              content without any issues.
            </p>
            
            {/* SECTION 7: Data We Don't Collect */}
            <div className="legal-section-title">7. What We DON'T Collect Through Cookies</div>
            <div className="legal-emphasis-box">
              <p className="legal-paragraph">
                To be completely transparent, our cookies do <strong>not</strong> collect or store:
              </p>
              <ul className="legal-list">
                <li>Personally identifiable information (names, emails, phone numbers)</li>
                <li>Payment or financial information</li>
                <li>Login credentials or passwords</li>
                <li>Precise geolocation data (GPS coordinates)</li>
                <li>Information about other websites you visit</li>
                <li>Content you create or input on our website</li>
                <li>Social media account information</li>
              </ul>
              <p className="legal-paragraph">
                The cookies we use are strictly limited to anonymous analytics data to help us understand 
                website usage patterns.
              </p>
            </div>
            
            {/* SECTION 8: Google's Privacy */}
            <div className="legal-section-title">8. Google Analytics and Privacy</div>
            <p className="legal-paragraph">
              Google Analytics is provided by Google, Inc. Google uses the data collected to track and examine 
              the use of our website, to prepare reports on its activities, and share them with other Google services.
            </p>
            <p className="legal-paragraph">
              Google may use the data collected to contextualize and personalize the ads of its own advertising 
              network, though we do not participate in Google's advertising programs.
            </p>
            <p className="legal-paragraph">
              For more information on Google's privacy practices, visit:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </a>
            </p>
            
            {/* SECTION 9: International Users */}
            <div className="legal-section-title">9. International Users and Cookie Consent</div>
            <p className="legal-paragraph">
              If you are accessing our website from the European Economic Area (EEA), United Kingdom, or other 
              regions with strict cookie laws, please be aware that by continuing to use our website, you consent 
              to the use of cookies as described in this policy.
            </p>
            <p className="legal-paragraph">
              You have the right to withdraw consent at any time by disabling cookies in your browser or using 
              the Google Analytics opt-out methods described above.
            </p>
            
            {/* SECTION 10: Updates */}
            <div className="legal-section-title">10. Updates to This Cookies Policy</div>
            <p className="legal-paragraph">
              We may update this Cookies Policy from time to time to reflect changes in our use of cookies or 
              legal requirements. Any changes will be posted on this page with an updated "Last Updated" date.
            </p>
            <p className="legal-paragraph">
              We encourage you to review this policy periodically to stay informed about how we use cookies.
            </p>
            
            {/* SECTION 11: More Information */}
            <div className="legal-section-title">11. More Information</div>
            <p className="legal-paragraph">
              For more information about how we handle your data, please see our{' '}
              <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>.
            </p>
            <p className="legal-paragraph">
              To learn more about cookies in general, visit:{' '}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
                www.allaboutcookies.org
              </a>
            </p>
            
            {/* SECTION 12: Contact */}
            <div className="legal-contact-section">
              <div className="legal-contact-title">Questions About Cookies?</div>
              <p className="legal-paragraph">
                If you have any questions about our use of cookies or this Cookies Policy, please contact us:
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

export default CookiesPage;