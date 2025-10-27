# Restaurant Standards - Professional Hospitality Training Platform

A comprehensive React-based training platform for luxury hospitality professionals pursuing Michelin stars, Forbes Travel Guide ratings, and other prestigious industry recognition.

## Project Overview

Restaurant Standards provides video-based training modules, interactive quizzes, and comprehensive service standards for fine dining establishments. The platform covers:

- Reservation System protocols
- Arrival & Departure service standards
- Dinner Service execution
- Food & Beverage Quality benchmarks
- Presentation of Facilities standards

## Tech Stack

- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 7.6.2
- **SEO:** React Helmet Async 2.0.5
- **Icons:** Phosphor React, Lucide React
- **Analytics:** React GA4
- **Hosting:** Vercel
- **Video:** Vimeo embeds

## Project Structure

```
restaurant-standards/
├── public/
│   ├── sitemap.xml          # SEO sitemap
│   ├── robots.txt           # Search engine directives
│   └── assets/              # Static images, icons
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── data/                # JSON data files
│   ├── styles/              # CSS stylesheets
│   ├── utils/               # Utility functions (analytics, etc.)
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Application entry point
├── index.html               # HTML template with SEO meta tags
└── package.json             # Dependencies and scripts
```

## Development Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Dereks-Projects/restaurant-service-standards.git

# Navigate to project directory
cd restaurant-service-standards

# Install dependencies (with legacy peer deps for React 19 compatibility)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## SEO Implementation

This project implements comprehensive SEO best practices:

- **React Helmet Async** for dynamic meta tags on all pages
- **Unique titles and descriptions** for every route
- **XML sitemap** with proper priority and changefreq settings
- **robots.txt** for search engine crawling directives
- **Schema.org structured data** (EducationalOrganization, Course, WebSite)
- **Open Graph and Twitter Card** meta tags for social sharing
- **Google Search Console** integration

### Key SEO Pages

- Homepage: Luxury Hospitality Training Platform
- Training Dashboard: Comprehensive training modules
- Section Pages: Dynamic SEO for each service category
- Resources: Training materials and downloads

## Design Philosophy

**Mobile-First Responsive Design**
- Hamburger navigation for mobile
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized for screens from 320px to 2560px

**Professional Color Palette**
- Navy (#001f3f) - Primary brand color
- Clean whites and grays for readability
- Accent colors for interactive elements

## Analytics

Google Analytics 4 (GA4) is integrated for tracking:
- Page views
- User navigation patterns
- Training module engagement
- Quiz completion rates

## Configuration Files

### .npmrc

```
legacy-peer-deps=true
```

Required for React 19 compatibility with react-helmet-async.

### vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Ensures client-side routing works correctly on Vercel.

## Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Deployment Process

```bash
# Commit changes
git add .
git commit -m "Your commit message"

# Push to trigger deployment
git push origin main
```

Vercel automatically:
1. Detects the push
2. Runs npm install --legacy-peer-deps
3. Builds with vite build
4. Deploys to production

**Live Site:** https://www.restaurantstandards.com

## Key Features

### Training Modules
- Video-based instruction with Vimeo integration
- Section-specific content delivery
- Classification-based organization
- Progress tracking capability

### Interactive Quizzes
- Timed questions (20 seconds per question)
- Multiple choice format
- Immediate feedback
- Score tracking and summary

### Resources Library
- Downloadable training guides
- Manager checklists
- Service procedure documentation
- Educational articles on rating systems

## Educational Content

Content is organized around five core sections:

1. **Reservation System** - Booking protocols and guest communication
2. **Arrival & Departure** - First and last impressions
3. **Dinner Service** - Table service execution
4. **Food & Beverage Quality** - Quality standards and presentation
5. **Presentation of Facilities** - Cleanliness and ambiance

## About the Creator

Created by Derek Engles, a hospitality professional with 20+ years of experience in luxury hotels and restaurants including Wynn Resort and MGM Grand. The platform distills decades of industry expertise into actionable training content.

## Related Resources

- **Book:** Restaurant Standards on Amazon - https://www.amazon.com/dp/B0FNDMTK5F
- **Creator Site:** https://derekengles.com
- **Beverage Education:** https://beverage.fyi

## License

Copyright 2025 Derek Engles. All rights reserved.

## Contributing

This is a proprietary training platform. For inquiries about licensing or white-label opportunities, contact: derekengles@gmail.com

## Known Issues

- React 19 requires --legacy-peer-deps flag for some dependencies
- Client-side rendering may cause slight delays in SEO indexing (addressed with React Helmet and proper sitemap configuration)

## Support

For technical support or business inquiries:
- Email: derekengles@gmail.com
- Website: https://www.restaurantstandards.com/about

---

Built with React - Powered by Vite - Hosted on Vercel