# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Restaurant Standards seriously. If you discover a security vulnerability, please follow these steps:

### 🚨 DO NOT Open a Public Issue

Security vulnerabilities should NOT be reported through public GitHub issues.

### ✅ Recommended Reporting Method

Please report security vulnerabilities by emailing:
**security@restaurantstandards.com**

Include the following information:
1. **Type of vulnerability** (XSS, CSRF, SQLi, etc.)
2. **Affected component/page** (URL, component name)
3. **Steps to reproduce** the vulnerability
4. **Potential impact** of the vulnerability
5. **Suggested fix** (if you have one)
6. **Your contact information** for follow-up

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity
  - Critical: 1-3 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

### Disclosure Policy

- Please give us reasonable time to fix the vulnerability before public disclosure
- We will acknowledge your contribution in our security advisories (unless you prefer anonymity)
- We may coordinate with you on the disclosure timeline

## Security Best Practices

### For Users

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use environment variables** for sensitive data
   - Never commit API keys or secrets
   - Use `.env.local` for local development
   - Keep `.env` in `.gitignore`

3. **Verify URLs** before deployment
   - Check all external links
   - Validate API endpoints
   - Review third-party integrations

### For Developers

1. **Input Validation**
   - Sanitize all user inputs
   - Validate form data
   - Escape output to prevent XSS

2. **Authentication & Authorization**
   - Use secure authentication methods
   - Implement proper session management
   - Validate user permissions

3. **Dependencies**
   - Regularly update npm packages
   - Review dependency security advisories
   - Use `npm audit` before deployment

4. **Code Review**
   - All changes require peer review
   - Check for security anti-patterns
   - Test security-sensitive features

## Known Security Considerations

### Current Implementation

1. **External Links** - Opens Amazon book link in new tab (_blank)
   - Mitigation: Uses `rel="noopener noreferrer"` (if implemented)

2. **Video Embeds** - Vimeo iframes used for training videos
   - Mitigation: CSP headers recommended for production

3. **Analytics** - Google Analytics tracking
   - User data: Anonymized page views only
   - No PII collected through analytics

4. **No Authentication** - Currently public content only
   - Future: Implement secure authentication when user accounts added

### Recommended Production Setup

```nginx
# Example security headers (nginx)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://player.vimeo.com; frame-src https://player.vimeo.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;" always;
```

## Security Checklist for Deployment

- [ ] All dependencies updated and audited
- [ ] Environment variables properly configured
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security headers configured on server
- [ ] Analytics tracking GDPR/CCPA compliant
- [ ] No sensitive data in client-side code
- [ ] Error messages don't expose system details
- [ ] Backup and disaster recovery plan in place
- [ ] Monitoring and logging configured
- [ ] Rate limiting implemented (if applicable)

## Third-Party Security

We rely on the security of:
- **GitHub** for code hosting
- **Vimeo** for video hosting
- **Google Fonts** for typography
- **npm** for package management

Stay informed about security updates from these providers.

## Compliance

This project aims to comply with:
- OWASP Top 10 security principles
- Web Content Accessibility Guidelines (WCAG)
- General Data Protection Regulation (GDPR) when applicable
- California Consumer Privacy Act (CCPA) when applicable

## Contact

For security concerns, contact:
- **Email:** security@restaurantstandards.com
- **General Support:** support@restaurantstandards.com
- **Website:** https://www.restaurantstandards.com/about

---

**Last Updated:** January 2025

Thank you for helping keep Restaurant Standards secure! 🔒