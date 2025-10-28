// 📄 FILE: src/pages/AboutPage.jsx
// REDESIGNED - Modern, elegant About page that sells the platform

import React from 'react';
import { Link } from 'react-router-dom';
import UnifiedHeader from "../components/UnifiedHeader";
import MobileNav from '../components/MobileNav';
import DesktopFooter from '../components/DesktopFooter';
import SEO from '../components/SEO';
import '../styles/AboutPage.css';

function AboutPage() {
  return (
    <>
      <SEO 
        title="About Restaurant Standards - Luxury Hospitality Training"
        description="Professional training platform built by hospitality veterans for restaurants pursuing Michelin, Forbes, and AAA recognition. 20+ years of service excellence distilled into actionable training."
        keywords="hospitality training, luxury restaurant training, Michelin service standards, Forbes training, Derek Engles, restaurant excellence"
        canonicalUrl="https://www.restaurantstandards.com/about"
      />
      
      <div className="about-page">
        <UnifiedHeader />

        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="about-hero__container">
            <h1 className="about-hero__title">
              Training Built by Operators,<br />
              For Operators
            </h1>
            <p className="about-hero__subtitle">
              No consultants. No theory. Just 20+ years of building award-winning service teams 
              at the world's most demanding luxury properties—distilled into a system that actually works.
            </p>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="about-values">
          <div className="about-values__container">
            <div className="about-values__card">
              <div className="about-values__icon">🎯</div>
              <h3 className="about-values__title">Battle-Tested Standards</h3>
              <p className="about-values__text">
                Every module reverse-engineered from Forbes, Michelin, and AAA requirements. 
                Not theory—actual standards that earn stars and ratings.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">⚡</div>
              <h3 className="about-values__title">On-Demand Training</h3>
              <p className="about-values__text">
                Your team trains when it works for them. Before shifts, during breaks, or at home. 
                No more scheduling nightmares or lost productivity.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">📈</div>
              <h3 className="about-values__title">Consistent Excellence</h3>
              <p className="about-values__text">
                Stop losing knowledge when employees leave. Build systems that maintain five-star 
                service regardless of turnover.
              </p>
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="about-problem">
          <div className="about-problem__container">
            <h2 className="about-problem__title">Most Training Programs Fail</h2>
            <p className="about-problem__text">
              Here's the uncomfortable truth: Most hospitality training is either locked in outdated 
              manuals, trapped in departing employees' heads, or delivered by expensive consultants 
              who've never run a dinner service.
            </p>
            <p className="about-problem__text">
              Meanwhile, you're bleeding talent every quarter, scrambling to onboard replacements, 
              and watching service standards slip while your competitors are earning the recognition 
              you're working toward.
            </p>
            <div className="about-problem__stat">
              <span className="about-problem__stat-number">73.8%</span>
              <span className="about-problem__stat-label">Annual turnover in hospitality—highest of any industry</span>
            </div>
          </div>
        </section>

        {/* THE SOLUTION */}
        <section className="about-solution">
          <div className="about-solution__container">
            <h2 className="about-solution__title">A Better Way to Build Excellence</h2>
            <p className="about-solution__lead">
              Restaurant Standards changes the game by giving you what luxury properties actually use: 
              comprehensive, structured training that transforms good service into Forbes Five-Star caliber.
            </p>
            
            <div className="about-solution__grid">
              <div className="about-solution__item">
                <h4>Complete Service Framework</h4>
                <p>
                  Every guest touchpoint covered—from reservation protocols to wine service to 
                  departure rituals. Nothing left to interpretation.
                </p>
              </div>
              
              <div className="about-solution__item">
                <h4>Video + Written Standards</h4>
                <p>
                  See standards demonstrated in real scenarios, then reference written guides. 
                  Multiple learning styles, one platform.
                </p>
              </div>
              
              <div className="about-solution__item">
                <h4>Knowledge Retention Quizzes</h4>
                <p>
                  Ensure your team actually retains training with scenario-based assessments 
                  that test real-world application.
                </p>
              </div>
              
              <div className="about-solution__item">
                <h4>Mobile-First Access</h4>
                <p>
                  Train anywhere, anytime. Your team accesses content on phones, tablets, or 
                  computers—whatever works for their schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER STORY */}
        <section className="about-founder">
          <div className="about-founder__container">
            <div className="about-founder__content">
              <h2 className="about-founder__title">Built From the Trenches</h2>
              <p className="about-founder__text">
                I'm Derek Engles, and I've spent over 20 years building and leading service teams 
                at properties like Wynn Resorts and MGM Grand—establishments where "good enough" 
                doesn't exist.
              </p>
              <p className="about-founder__text">
                After training hundreds of employees and developing service standards from scratch 
                for luxury properties pursuing Forbes and Michelin recognition, I noticed something: 
                the best training knowledge was locked away in expensive consultants or buried in 
                outdated manuals that no one actually used.
              </p>
              <p className="about-founder__text">
                Restaurant Standards is the training system I wish I had when I was developing 
                programs for enterprise hospitality groups. It's every hard-won lesson, every 
                service standard, every training technique that actually moved the needle—now 
                accessible to any restaurant or hotel serious about excellence.
              </p>
              
              <div className="about-founder__credentials">
                <div className="about-founder__credential">
                  <strong>20+ years</strong>
                  <span>Luxury hospitality operations</span>
                </div>
                <div className="about-founder__credential">
                  <strong>200,000+</strong>
                  <span>Guests served</span>
                </div>
                <div className="about-founder__credential">
                  <strong>Multiple properties</strong>
                  <span>Forbes & AAA rated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE BOOK */}
        <section className="about-book">
          <div className="about-book__container">
            <div className="about-book__content">
              <h2 className="about-book__title">The Framework Behind the Platform</h2>
              <p className="about-book__text">
                The comprehensive guide <em>Restaurant Standards: A Framework for Excellence in 
                Hospitality Service</em> details the complete methodology behind this training system. 
                Available on Amazon Kindle, it's the theoretical foundation and strategic roadmap 
                that powers every module you see here.
              </p>
              <a 
                href="https://www.amazon.com/dp/B0FNDMTK5F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="about-book__button"
              >
                View Book on Amazon
              </a>
            </div>
          </div>
        </section>

        {/* NOT AFFILIATED DISCLAIMER */}
        <section className="about-disclaimer">
          <div className="about-disclaimer__container">
            <p className="about-disclaimer__text">
              <strong>Independent Training Platform:</strong> Restaurant Standards is not affiliated 
              with or endorsed by Forbes Travel Guide, Michelin Guide, AAA, World's 50 Best Restaurants, 
              or La Liste. Our training incorporates publicly available best practices studied from these 
              prestigious rating systems to help establishments pursue excellence.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="about-cta">
          <div className="about-cta__container">
            <h2 className="about-cta__title">Ready to Elevate Your Standards?</h2>
            <p className="about-cta__text">
              Explore the training platform or reach out to discuss how Restaurant Standards 
              can transform your team's service delivery.
            </p>
            <div className="about-cta__buttons">
              <Link to="/training" className="about-cta__button about-cta__button--primary">
                Explore Training Modules
              </Link>
              <a 
                href="mailto:derekengles@gmail.com" 
                className="about-cta__button about-cta__button--secondary"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER WITH LEGAL LINKS */}
        <footer className="about-footer">
          <div className="about-footer__links">
            <Link to="/cookies" className="about-footer__link">Cookies Policy</Link>
            <span className="about-footer__separator">•</span>
            <Link to="/terms" className="about-footer__link">Terms of Use</Link>
            <span className="about-footer__separator">•</span>
            <Link to="/privacy" className="about-footer__link">Privacy Policy</Link>
          </div>
        </footer>

        <DesktopFooter />
        <MobileNav />
      </div>
    </>
  );
}

export default AboutPage;