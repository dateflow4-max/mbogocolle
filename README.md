# Mbogo College School Management System

A demo school management web application built with vanilla HTML, CSS, and JavaScript.

## Features

### For Parents
- View student reports with term grades
- Check fee balances and payment history
- Sign permission slips
- Update medical details
- View school circulars
- Check calendar events
- Report absences and message teachers

### For Teachers
- View assigned classes and subjects
- Enter student marks
- Submit reports for review
- Manage class rosters

### For Office Staff
- Approve teacher accounts
- Manage students and staff
- Publish circulars
- Review and publish reports
- Process year-end promotions
- View fee collection statistics
- Handle parent requests

## Getting Started

### Demo Accounts

The app comes with seed data. You can create accounts using these codes:

**Parent Sign-up:**
- Parent Code: `PAR001` to `PAR030`
- Student Code: `STU001` to `STU052`
- Example: Use `PAR001` with `STU001`

**Teacher Sign-up:**
- Teacher Code: `TCH2026`
- Status: Pending (requires office approval)

**Office Account:**
- Office accounts can only be created by existing office staff
- For testing, you can create one through the office portal after creating an office user in the data

### Local Development

1. Open `index.html` in a web browser
2. The app runs entirely in the browser
3. All data is stored in localStorage

### Deployment

Deploy to Netlify or any static hosting:

1. Connect your Git repository
2. No build command needed
3. Publish directory: `.` (root)

## File Structure

```
mbogo/
├── index.html      # Main HTML structure
├── styles.css      # All styling and themes
├── data.js         # Mock data and seed generator
├── app.js          # Application logic
├── assets/
│   └── logo.svg    # School crest
└── README.md       # This file
```

## Features

- **Responsive Design**: Mobile-first, works on phones and desktops
- **Dark Mode**: Theme toggle with localStorage persistence
- **Animated Background**: Liquid blob effects using SVG filters
- **Glass Morphism**: Frosted glass cards on auth pages
- **Pull to Refresh**: Native-like mobile interactions
- **Splash Screen**: Animated logo on page load
- **Tab Navigation**: Clean portal navigation
- **Local Storage**: All data persists in browser

## Mock Data

The app includes:
- 52 students across 6 classes (S.1 to S.6)
- Ugandan names and realistic data
- Two terms of marks
- Mixed fee payment statuses
- Sample circulars and events
- Two permission slips
- Parent and student codes

## Color Scheme

- Green: `#16a34a` (primary actions, success)
- Black: `#000000` (text, secondary actions)
- White: `#ffffff` (backgrounds, contrast)
- Red: `#dc2626` (fees due, errors, warnings only)

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Demo application for Mbogo College School.
