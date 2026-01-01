# Doral Scholars Website

A comprehensive, modern informational website for Doral Scholars built with static HTML/CSS/JavaScript, designed for GitHub Pages deployment with an admin CMS system.

## Overview

This website serves as the primary digital presence for Doral Scholars, featuring:
- Complete program information and navigation
- Events calendar with views/likes tracking
- Community stories and resources
- Admin CMS for event management
- "Leave Different" narrative throughout

## Site Structure

- **Home** - Landing page with hero, featured programs, events preview
- **About** - Mission, vision, story, team
- **Programs** - Hub page with 8 program categories and filtering
- **Resources** - Educational resources for students, parents, educators
- **Community** - Success stories, testimonials, impact highlights
- **Get Involved** - Registration flows (student, parent, school, volunteer, donate)
- **Events** - Calendar/list views with filters and event detail pages
- **Contact** - Contact form
- **Admin** - CMS for event management 

## Admin CMS System

### Login
- **Username:** Ajah
- **Password:** 123
- Login form appears at the bottom-right of all pages
- After login, you'll be redirected to the admin page

### Admin Features
- **Create Events:** Click "Add New Event" to create a new event
- **Edit Events:** Click on any event in the list to edit it
- **Delete Events:** Click "Delete Event" when editing an event
- **Date Sorting:** Events are automatically sorted by date
- **Event Fields (Full Schema):**
  - **Basic**: Title (required), Date (required), Start/End Time
  - **Location**: Location Name, Address, Virtual Link
  - **Content**: Summary (for cards), Full Description
  - **Metadata**: Audience Tags, Program Tags, Host, Capacity
  - **Actions**: Registration URL, Status (published/draft)

### How It Works
1. Admin logs in and manages events through the admin interface
2. Events are stored in browser localStorage
3. Events page displays events sorted by date
4. If no admin events exist, default monthly programs are shown

### GitHub Pages Deployment
- GitHub Actions workflow is set up in `.github/workflows/deploy.yml`
- The workflow deploys the `docs` folder to GitHub Pages
- Events can be synced to `events.json` for persistent storage across sessions

## File Structure

### Main Pages
- `docs/index.html` - Home page with hero, featured programs, events preview
- `docs/about.html` - About page with mission, story, team
- `docs/programs.html` - Programs hub with 8 categories and filtering
- `docs/resources.html` - Resources page
- `docs/community.html` - Community page with success stories
- `docs/get-involved.html` - Get Involved page with registration flows
- `docs/events.html` - Events page (legacy, shows monthly programs)
- `docs/events-enhanced.html` - Enhanced events page with calendar/list views
- `docs/event-detail.html` - Event detail page with views/likes tracking
- `docs/contact.html` - Contact page
- `docs/admin.html` - Admin CMS interface

### JavaScript
- `docs/admin.js` - Admin functionality with full event schema support
- `docs/login.js` - Login system
- `docs/events-data.js` - Events data loader
- `docs/events-enhanced.js` - Events calendar/list logic
- `docs/event-detail.js` - Event detail & tracking logic
- `docs/programs.js` - Programs filtering logic
- `docs/home-events.js` - Home page events preview
- `docs/navigation.js` - Navigation component
- `docs/script.js` - General site scripts

### Styles & Assets
- `docs/styles.css` - Complete brand styles with component library
- `docs/assets/` - Images, logos, videos

### Data & Config
- `docs/events.json` - Events storage (for GitHub sync)
- `docs/sitemap.xml` - SEO sitemap
- `docs/robots.txt` - SEO robots file

### Documentation
- `docs/SITE_PLAN.md` - Complete site plan and IA
- `docs/CHANGELOG.md` - Change log
- `docs/IMPLEMENTATION_SUMMARY.md` - Implementation summary

### Deployment
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## Features

### Events System
- **Calendar View**: Month view with event highlights
- **List View**: Card-based event listings
- **Filters**: By audience type, event type, past events
- **Event Detail Pages**: Full information with views/likes tracking
- **Views Tracking**: Deduplicated by day
- **Likes Tracking**: Rate-limited to prevent spam

### Design System
- Brand colors: Red #E21833, Yellow #FFD200, Black #191919, Burgundy #880020
- Typography: Dela Gothic One (headlines), DM Sans (body)
- Component library: Cards, buttons, filters, calendar, navigation

### "Leave Different" Narrative
- Integrated on Home, Programs, Resources, Community, Get Involved pages
- Consistent module design with proof points and CTAs

## Deployment

### GitHub Pages Setup
1. Push all files to GitHub repository
2. Go to repository Settings > Pages
3. Select source: "GitHub Actions"
4. The workflow will automatically deploy on push to `main` branch

### Update URLs
1. Update `docs/sitemap.xml` with your actual GitHub Pages URL
2. Update `docs/robots.txt` with your actual GitHub Pages URL

## Next Steps

See `docs/IMPLEMENTATION_SUMMARY.md` for detailed next steps including:
- GitHub API integration for persistent event storage
- Program detail template pages
- Serverless metrics endpoint
- Structured data for SEO

