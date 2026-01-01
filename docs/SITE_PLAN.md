# Doral Scholars Website - Complete Site Plan & Implementation Guide

## 1. Information Architecture & Navigation

### Top-Level Navigation Structure
- **Home** - Landing page with hero, mission, featured programs, events preview
- **About** - Story, mission, vision, team, partners, impact
- **Programs** - Hub page with category grid and filtering
- **Resources** - Educational resources, guides, downloads
- **Community** - Success stories, testimonials, community highlights
- **Get Involved** - Registration flows (student, parent, school, volunteer, donate)
- **Events** - Calendar view, list view, filters, archive, event detail pages

### Programs Page Architecture
**Category Structure:**
1. **Academic Programs**
   - In-School Support
   - After-School Programs
   - Summer School
   - STEAM Projects
   - Attendance Support

2. **Workforce Development**
   - YouthWorks
   - Career Training
   - Internships
   - Job Readiness
   - Professional Skills

3. **College & Career**
   - College Preparation
   - Application Support
   - Career Exploration
   - Scholarship Resources
   - College Tours

4. **Youth Support Services**
   - Barrier Removal
   - Mental Health Support
   - Social-Emotional Learning
   - Conflict Resolution
   - Mentorship Programs

5. **Enrichment Programs**
   - Culinary Arts
   - Music Therapy
   - Photo Therapy
   - Horticulture
   - Arts & Culture

6. **Health & Wellness**
   - Healthy Meals
   - Physical Activities
   - Mental Health Resources
   - Nutrition Education
   - Wellness Workshops

7. **Youth Leadership**
   - Peer Mentoring
   - Student Ambassador
   - Leadership Development
   - Community Service
   - Youth Advisory Board

8. **Family Support**
   - Parent Resources
   - Family Engagement
   - Educational Support
   - Resource Connection
   - Emergency Assistance

## 2. Design System Specification

### Brand Colors (Exact Hex Values)
- **Primary Red:** #E21833
- **Primary Yellow:** #FFD200
- **Primary Black:** #191919
- **Primary Burgundy:** #880020
- **Secondary Teal:** #3C8080
- **Secondary Indigo:** #4B0082
- **Secondary Purple:** #9D34FF
- **Neutral White:** #FFFFFF
- **Neutral Light Gray:** #F9F9F9
- **Neutral Gray:** #EEF3F8

### Typography
- **Headlines:** Dela Gothic One (titles, section headers)
- **Body:** DM Sans (body text, UI, navigation)
- **Minimum body size:** 16px
- **Line length:** 50-70 characters
- **Line height:** 1.5-1.6

### Spacing System
- Base unit: 8px
- Scale: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- Section padding: 4rem (64px) vertical, 2rem (32px) horizontal
- Card padding: 2rem (32px)
- Component gaps: 1rem-2rem (16px-32px)

### Component Library
- Header with mega-menu navigation
- Footer with admin link
- Hero sections (with 1-2 CTA pattern)
- Program category cards
- Program detail sections (Who/What/Outcomes/How to Join)
- Event cards (date badge, tags, quick actions)
- Calendar component (month + list views)
- Filter chips + dropdowns
- Search bar
- Testimonial/success story blocks
- Impact stats blocks
- Partner logo strips
- CTA banners ("Leave Different" module variants)

## 3. Page Requirements

### A) Home Page
**Sections:**
1. Hero: "Doral Scholars" + mission statement + primary CTA ("Explore Programs") + secondary CTA ("View Events")
2. "Leave Different" Promise: short story + 3 outcomes (Academic, Personal, Community)
3. Featured Programs (4-6 cards)
4. Upcoming Events (3 cards + "Open Calendar" link)
5. Impact snapshot (metrics placeholders)
6. Success Story highlight (quote + image)
7. Partners strip + press mentions
8. Footer with admin login link

### B) About Page
**Sections:**
1. Mission & Vision
2. Our Story (timeline)
3. Team
4. Partners
5. Press/Media
6. Impact Report links
7. "Leave Different" module at bottom

### C) Programs Hub Page
**Layout:**
- "Find your path" selector (Student / Parent / School / Community)
- Category grid (8 categories listed above)
- Each category expands to clean list with descriptions + "Learn more" links
- Filtering by audience type
- Search functionality

### D) Program Detail Template
**Required Sections:**
- What it is (plain-language)
- Who it's for
- What you'll do
- Outcomes ("Leave Different" tie-in)
- How to join (CTA)
- Related programs

### E) Events Page
**Features:**
- Calendar view (month/week)
- List view (upcoming default)
- Filters: type, audience, location, date range
- Past events archive with search
- Event cards: title, date/time, location, tags, summary, "Learn more"
- Card/grid browsing patterns

### F) Event Detail Page
**Required Elements:**
- Hero: event title + date/time + location + register/RSVP CTA
- About this event
- Who it's for
- Agenda (optional)
- Photos/videos (post-event)
- Share functionality
- Views + Likes count display
- Related events

### G) Get Involved Page
**Flows:**
- Student registration
- Parent registration
- School partnerships
- Volunteer opportunities
- Donation programs

### H) Resources Page
- Educational resources
- Guides and downloads
- Program materials
- Parent resources

### I) Community Page
- Success stories
- Testimonials
- Community highlights
- Impact stories

## 4. Events Data Model

### Event Schema
```json
{
  "id": "slug",
  "title": "string",
  "status": "draft|published",
  "startDateTime": "ISO 8601",
  "endDateTime": "ISO 8601",
  "timezone": "string",
  "locationName": "string",
  "locationAddress": "string",
  "virtualLink": "string (optional)",
  "summary": "string (card text)",
  "description": "string (rich text)",
  "audienceTags": ["student", "parent", "educator", "community"],
  "programTags": ["Academic", "Workforce", "Wellness", etc.],
  "featuredImage": "string (URL)",
  "galleryImages": ["array of URLs"],
  "registrationUrl": "string (optional)",
  "capacity": "number (optional)",
  "host": "string (optional)",
  "seoTitle": "string",
  "seoDescription": "string",
  "views": "number",
  "likes": "number"
}
```

### Additional Features
- Event listing cards
- ICS calendar export per event
- Site-wide calendar feed (ICS)

## 5. CMS + GitHub Pages Architecture

### Requirements
- Static site hosted on GitHub Pages
- Admin CMS at `/admin` (footer link)
- Admin can create/edit events
- Changes commit to GitHub
- Publishing triggers GitHub Pages build/deploy

### Implementation Approach
- **Static Site Generator:** Astro (recommended) or Next.js static export
- **Content Storage:** Markdown files in `/content/events/*.md` with frontmatter
- **CMS:** Decap CMS (formerly Netlify CMS) configured for GitHub repo commits
- **Deployment:** GitHub Actions builds on push to main, deploys to GitHub Pages

### Admin UX
- Event editor form maps 1:1 to event schema
- Preview mode (or staging branch)
- Image upload handling
- Publish workflow

## 6. Views + Likes Tracking

### Views Tracking
- Count view when event detail page loads
- Dedupe by session/day
- Options:
  - Privacy-friendly analytics tool + custom events
  - Lightweight serverless endpoint (increment eventId counters)

### Likes Tracking
- "Like" button increments counter
- Prevent spam (rate limiting, per-IP/per-session cooldown)
- Display on event pages: "X views" and "Y likes"

### Admin Dashboard (Optional)
- Top events by views/likes
- Trend lines over time
- Data export

### API/Export
- `/api/events/metrics` => `{ eventId: { views, likes } }`
- JSON export for spreadsheets/dashboards

## 7. "Leave Different" Narrative

### Site-Wide Narrative Spine
Barrier → Support → Growth → Leadership → Community Impact

### Micro-CTA Pattern
"Learn → Plan → Join → Return Changed"

### "Leave Different" Module
- Short story
- 3 proof points
- Next-step button
- Present on: Home, Programs hub, and at least one module per major section

## 8. SEO + Social

- Clean URLs: `/programs/academic/in-school-support`, `/events/<slug>`
- Metadata for every page
- OpenGraph images (brand-compliant)
- `sitemap.xml` and `robots.txt`
- Structured data for events (Event schema)

## 9. Acceptance Criteria

✅ Site matches brand colors, typography, and logo rules
✅ Navigation matches provided structure
✅ Events calendar exists with filters + past archive + event detail pages
✅ Views and likes metrics work and display on event pages, with exportable JSON
✅ `/admin` exists, login works, event edits commit to GitHub and redeploy
✅ Accessibility basics validated (headings, contrast, alt text)
✅ Site is fast and feels modern (optimized images, clean UI)
✅ "Leave Different" narrative present on Home, Programs hub, and major sections

