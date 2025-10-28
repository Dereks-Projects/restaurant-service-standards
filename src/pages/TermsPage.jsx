// 📄 FILE: src/pages/TermsPage.jsx
// Terms of Use - Comprehensive legal terms for Restaurant Standards platform

import React from 'react';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms of Use - Restaurant Standards"
        description="Terms and conditions for Restaurant Standards training platform. Review usage policies and legal terms for accessing hospitality training materials."
        keywords="terms of use, terms and conditions, restaurant standards terms, legal terms"
        canonicalUrl="https://www.restaurantstandards.com/terms"
      />
      
      <div className="legal-page">
        <UnifiedHeader />
        
        <div className="legal-content-wrapper">
          <h1 className="legal-page-title">Terms of Use</h1>
          <p className="legal-last-updated">Last Updated: October 28, 2025</p>
          
          <div className="legal-content">
            
            {/* SECTION 1: Acceptance */}
            <div className="legal-section-title">1. Acceptance of Terms</div>
            <p className="legal-paragraph">
              Welcome to Restaurant Standards. By accessing or using our website at restaurantstandards.com 
              (the "Service"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to 
              these Terms, please do not use our Service.
            </p>
            <p className="legal-paragraph">
              These Terms constitute a legally binding agreement between you and Restaurant Standards 
              ("we," "us," or "our"). We reserve the right to update these Terms at any time, and your 
              continued use of the Service after changes are posted constitutes acceptance of the updated Terms.
            </p>
            
            {/* SECTION 2: Description of Service */}
            <div className="legal-section-title">2. Description of Service</div>
            <p className="legal-paragraph">
              Restaurant Standards is an educational platform providing hospitality training content, including:
            </p>
            <ul className="legal-list">
              <li>Training modules on restaurant service standards</li>
              <li>Educational videos and written content</li>
              <li>Best practices for luxury hospitality service</li>
              <li>Resources inspired by Michelin, Forbes, AAA, and other rating systems</li>
              <li>Quiz assessments and training materials</li>
            </ul>
            <p className="legal-paragraph">
              The Service is provided for <strong>informational and educational purposes only</strong>. It is 
              designed to supplement professional training programs, not replace them.
            </p>
            
            {/* SECTION 3: Disclaimer of Affiliation */}
            <div className="legal-section-title">3. Disclaimer of Affiliation</div>
            <div className="legal-emphasis-box">
              <p className="legal-paragraph">
                <strong>Important Notice:</strong> Restaurant Standards is an independent training platform. 
                We are <strong>not affiliated with, endorsed by, or officially connected to</strong>:
              </p>
              <ul className="legal-list">
                <li>Michelin Guide or Michelin corporation</li>
                <li>Forbes Travel Guide</li>
                <li>AAA (American Automobile Association)</li>
                <li>World's 50 Best Restaurants</li>
                <li>La Liste</li>
                <li>Any other rating organization mentioned in our content</li>
              </ul>
              <p className="legal-paragraph">
                Our training content is based on publicly available information and industry best practices 
                studied from these rating systems. Use of these names is for educational reference only.
              </p>
            </div>
            
            {/* SECTION 4: User Responsibilities */}
            <div className="legal-section-title">4. User Responsibilities</div>
            <p className="legal-paragraph">
              By using our Service, you agree to:
            </p>
            <ul className="legal-list">
              <li><strong>Use the Service lawfully</strong> and in accordance with these Terms</li>
              <li><strong>Not misrepresent</strong> our content as official guidance from rating organizations</li>
              <li><strong>Not reproduce, distribute, or sell</strong> our content without written permission</li>
              <li><strong>Not use automated tools</strong> (bots, scrapers) to access or copy our content</li>
              <li><strong>Not attempt to harm</strong> the Service through hacking, viruses, or other malicious means</li>
              <li><strong>Not impersonate</strong> Restaurant Standards or claim affiliation without authorization</li>
            </ul>
            
            {/* SECTION 5: Intellectual Property */}
            <div className="legal-section-title">5. Intellectual Property Rights</div>
            
            <div className="legal-subsection-title">5.1 Our Content</div>
            <p className="legal-paragraph">
              All content on the Service, including but not limited to text, videos, graphics, logos, images, 
              training materials, and software, is the property of Restaurant Standards or its content creators 
              and is protected by United States and international copyright, trademark, and other intellectual 
              property laws.
            </p>
            
            <div className="legal-subsection-title">5.2 Limited License</div>
            <p className="legal-paragraph">
              We grant you a limited, non-exclusive, non-transferable license to access and use the Service 
              for personal or internal business training purposes. This license does not include the right to:
            </p>
            <ul className="legal-list">
              <li>Resell or commercially exploit our content</li>
              <li>Distribute our materials to third parties</li>
              <li>Modify or create derivative works</li>
              <li>Remove copyright or proprietary notices</li>
            </ul>
            
            <div className="legal-subsection-title">5.3 Trademarks</div>
            <p className="legal-paragraph">
              "Restaurant Standards" and associated logos are trademarks of Restaurant Standards. Use of 
              these trademarks without written permission is prohibited.
            </p>
            
            {/* SECTION 6: Educational Disclaimer */}
            <div className="legal-section-title">6. Educational Content Disclaimer</div>
            <div className="legal-emphasis-box">
              <p className="legal-paragraph">
                <strong>Training Content is Informational Only:</strong>
              </p>
              <p className="legal-paragraph">
                The training content provided through our Service is for <strong>general educational purposes</strong> 
                and should not be considered:
              </p>
              <ul className="legal-list">
                <li>A guarantee of achieving any specific rating or recognition</li>
                <li>Official guidance from Michelin, Forbes, AAA, or other rating organizations</li>
                <li>Professional consulting advice tailored to your specific establishment</li>
                <li>A substitute for professional training, certification, or consulting services</li>
                <li>Legal, financial, or business advice</li>
              </ul>
              <p className="legal-paragraph">
                Results will vary based on implementation, staff capability, facility quality, and many other 
                factors beyond our control. We make no guarantees about outcomes from using our training materials.
              </p>
            </div>
            
            {/* SECTION 7: Limitation of Liability */}
            <div className="legal-section-title">7. Limitation of Liability</div>
            <p className="legal-paragraph">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul className="legal-list">
              <li>Restaurant Standards and its creator shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from your use of the Service</li>
              <li>We are not liable for any business losses, loss of revenue, income, profits, or anticipated 
              savings resulting from use of our training materials</li>
              <li>We are not liable for any failure to achieve ratings, awards, or recognition from third-party 
              organizations</li>
              <li>Our total liability for any claims related to the Service shall not exceed the amount you paid 
              to access the Service (currently $0, as the Service is free)</li>
            </ul>
            
            {/* SECTION 8: Disclaimer of Warranties */}
            <div className="legal-section-title">8. Disclaimer of Warranties</div>
            <p className="legal-paragraph">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="legal-list">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the Service will be uninterrupted, error-free, or secure</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
            
            {/* SECTION 9: Indemnification */}
            <div className="legal-section-title">9. Indemnification</div>
            <p className="legal-paragraph">
              You agree to indemnify, defend, and hold harmless Restaurant Standards and its creator from any 
              claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising 
              from:
            </p>
            <ul className="legal-list">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit or transmit through the Service</li>
            </ul>
            
            {/* SECTION 10: External Links */}
            <div className="legal-section-title">10. Third-Party Links and Resources</div>
            <p className="legal-paragraph">
              Our Service may contain links to third-party websites, services, or resources (such as Amazon, 
              Google Analytics, social media platforms). We do not control these external sites and are not 
              responsible for their content, privacy policies, or practices.
            </p>
            <p className="legal-paragraph">
              Your use of third-party websites is at your own risk and subject to their terms and conditions.
            </p>
            
            {/* SECTION 11: Termination */}
            <div className="legal-section-title">11. Termination</div>
            <p className="legal-paragraph">
              We reserve the right to terminate or suspend access to our Service immediately, without prior 
              notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="legal-paragraph">
              Upon termination, your right to use the Service will cease immediately. All provisions of these 
              Terms that by their nature should survive termination shall survive, including ownership provisions, 
              warranty disclaimers, and limitations of liability.
            </p>
            
            {/* SECTION 12: Changes to Service */}
            <div className="legal-section-title">12. Modifications to Service</div>
            <p className="legal-paragraph">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any 
              time, with or without notice. We shall not be liable to you or any third party for any modification, 
              suspension, or discontinuation of the Service.
            </p>
            
            {/* SECTION 13: Changes to Terms */}
            <div className="legal-section-title">13. Changes to These Terms</div>
            <p className="legal-paragraph">
              We may revise these Terms at any time by updating this page. The "Last Updated" date at the top 
              indicates when these Terms were last revised. Your continued use of the Service after changes are 
              posted constitutes your acceptance of the revised Terms.
            </p>
            <p className="legal-paragraph">
              We encourage you to review these Terms periodically to stay informed about our policies.
            </p>
            
            {/* SECTION 14: Governing Law */}
            <div className="legal-section-title">14. Governing Law and Jurisdiction</div>
            <p className="legal-paragraph">
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions.
            </p>
            <p className="legal-paragraph">
              Any disputes arising from these Terms or your use of the Service shall be resolved in the courts 
              of the United States, and you consent to the jurisdiction of such courts.
            </p>
            
            {/* SECTION 15: Severability */}
            <div className="legal-section-title">15. Severability</div>
            <p className="legal-paragraph">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary so that the remaining Terms shall otherwise 
              remain in full force and effect.
            </p>
            
            {/* SECTION 16: Entire Agreement */}
            <div className="legal-section-title">16. Entire Agreement</div>
            <p className="legal-paragraph">
              These Terms, together with our Privacy Policy and Cookies Policy, constitute the entire agreement 
              between you and Restaurant Standards regarding the Service and supersede all prior agreements and 
              understandings.
            </p>
            
            {/* SECTION 17: Contact */}
            <div className="legal-contact-section">
              <div className="legal-contact-title">Questions About These Terms?</div>
              <p className="legal-paragraph">
                If you have any questions or concerns about these Terms of Use, please contact us:
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

export default TermsPage;