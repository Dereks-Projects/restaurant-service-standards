// 📄 src/pages/LandingPage.jsx
// Restaurant Standards Landing Page - Mobile First Design
// Focus: Clean hero section matching mockup specifications

import React from 'react';
import { Link } from 'react-router-dom';
import LandingFooter from '../components/LandingFooter';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing">
      {/* ============================== */}
      {/* SECTION 1: HERO                */}
      {/* ============================== */}
      <section className="landing-hero">
        <div className="landing-hero__overlay">
          <div className="landing-hero__container">
            <div className="landing-hero__content">
              {/* Logo - smaller as requested */}
              <img 
                src="/rss-logo-new.svg" 
                alt="Restaurant Standards Logo" 
                className="landing-hero__logo" 
              />
              
              {/* Title - smaller font size */}
              <div className="landing-hero__title">Restaurant Standards</div>
              
              {/* Subtitle - larger, with updated text */}
              <p className="landing-hero__subtitle">
                The Best Restaurant Training Platform Built from the Highest Industry Standards.
              </p>
              
              {/* Buttons - wider at 300px */}
              <div className="landing-hero__buttons">
                <a href="#hidden-costs" className="landing-button landing-button--outline">
                  Learn More
                </a>
                <Link to="/training" className="landing-button landing-button--solid">
                  Enter the Site
                </Link>
              </div>
              
              {/* Tagline - below buttons */}
              <p className="landing-hero__tagline">
                Unlock your team's potential today!
              </p>
              
              {/* Awards with dots between */}
              <div className="landing-hero__awards">
                <span className="landing-hero__award">Forbes</span>
                <span className="landing-hero__award-divider">•</span>
                <span className="landing-hero__award">Michelin</span>
                <span className="landing-hero__award-divider">•</span>
                <span className="landing-hero__award">50 Best</span>
                <span className="landing-hero__award-divider">•</span>
                <span className="landing-hero__award">La Liste</span>
                <span className="landing-hero__award-divider">•</span>
                <span className="landing-hero__award">AAA</span>
              </div>
            </div>
            
            {/* Device mockup for desktop only */}
            <div className="landing-hero__mockup">
              <img 
                src="/app-devices-mockup.png" 
                alt="Restaurant Standards App on devices" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* SECTION 2: HIDDEN COSTS        */}
      {/* ============================== */}
      <section className="landing-costs" id="hidden-costs">
        <div className="landing-costs__container">
          <div className="landing-costs__title">
            The Hidden Cost of Inconsistent Training
          </div>
          
          <div className="landing-costs__grid">
            <div className="landing-costs__item">
              <div className="landing-costs__icon">
                <img src="/cost-icon.svg" alt="Cost icon" />
              </div>
              <div className="landing-costs__stat">
                <span className="landing-costs__number">$150,000+</span>
                <span className="landing-costs__label"> Average annual cost of employee turnover for a single restaurant</span>
              </div>
              <p className="landing-costs__source">National Restaurant Association</p>
            </div>
            
            <div className="landing-costs__item">
              <div className="landing-costs__icon">
                <img src="/person-icon.svg" alt="Turnover icon" />
              </div>
              <div className="landing-costs__stat">
                <span className="landing-costs__number">73.8%</span>
                <span className="landing-costs__label"> Annual turnover rate in the hospitality industry—the highest of any sector</span>
              </div>
              <p className="landing-costs__source">Bureau of Labor Statistics</p>
            </div>
            
            <div className="landing-costs__item">
              <div className="landing-costs__icon">
                <img src="/gear-icon.svg" alt="Time icon" />
              </div>
              <div className="landing-costs__stat">
                <span className="landing-costs__number">6 weeks</span>
                <span className="landing-costs__label"> Average time to fully train a new server to luxury service standards</span>
              </div>
              <p className="landing-costs__source">Workday Analysis</p>
            </div>
          </div>
          
          <p className="landing-costs__tagline">
            There's a better way to train, retain, and maintain service excellence.
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/* SECTION 3: ELITE TRAINING      */}
      {/* ============================== */}
      <section className="landing-training">
        <div className="landing-training__container">
          <div className="landing-training__title">
            Elite Training, Simplified
          </div>
          <p className="landing-training__subtitle">
            From onboarding to Michelin-level mastery, streamlined into one powerful platform.
          </p>
          
          <div className="landing-training__grid">
            <div className="landing-training__box">
              <div className="landing-training__box-title">Complete Standards Library</div>
              <p className="landing-training__box-text">
                Every guest touchpoint covered—from reservation systems to wine service to departure protocols. A complete framework.
              </p>
            </div>
            
            <div className="landing-training__box">
              <div className="landing-training__box-title">Relevant Modules</div>
              <p className="landing-training__box-text">
                Customize training paths for each role. Front-of-house gets guest experience modules that are pertinent to their duties.
              </p>
            </div>
            
            <div className="landing-training__box">
              <div className="landing-training__box-title">Train Anytime, On Any Device</div>
              <p className="landing-training__box-text">
                No more scheduling training sessions during peak hours. Your team learns on their schedule—before shifts, during breaks, or at home.
              </p>
            </div>
            
            <div className="landing-training__box">
              <div className="landing-training__box-title">Progress through Consistency</div>
              <p className="landing-training__box-text">
                Built-in quizzes ensure knowledge retention. Perfect for maintaining awards program compliance and driving revenue in each job code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* SECTION 4: FOUNDER             */}
      {/* ============================== */}
      <section className="landing-founder">
        <div className="landing-founder__container">
          <div className="landing-founder__title">
            Built by an Industry Veteran
          </div>
          
          <div className="landing-founder__content">
            <div className="landing-founder__image">
              <img 
                src="/founder.png" 
                alt="Derek Engles, Founder" 
                className="landing-founder__photo"
              />
              <p className="landing-founder__name">Derek Engles, Founder</p>
            </div>
            
            <div className="landing-founder__bio">
              <p className="landing-founder__text">
                After years of developing service standards from scratch, onboarding hundreds of employees, and maintaining elite ratings, I recognized a critical gap: the industry's most valuable training knowledge was locked in expensive consultants, outdated manuals, and tribal knowledge that disappeared with every resignation.
              </p>
              <p className="landing-founder__text">
                Restaurant Standards changes that. It's the training program I wished I had: comprehensive, accessible, and designed for the realities of modern restaurant operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* SECTION 5: CALL TO ACTION      */}
      {/* ============================== */}
      <section className="landing-cta">
        <div className="landing-cta__container">
          <p className="landing-cta__text">
            I can help you drive revenue and improve guest service.
          </p>
          <p className="landing-cta__text">
            Browse the site and contact me for additional information.
          </p>
          
          <div className="landing-cta__buttons">
            <Link to="/training" className="landing-button landing-button--outline-light">
              Enter the Site
            </Link>
            <a href="mailto:contact@restaurantstandards.com" className="landing-button landing-button--solid-light">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* SECTION 6: FOOTER              */}
      {/* ============================== */}
      <LandingFooter />
    </div>
  );
}

export default LandingPage;