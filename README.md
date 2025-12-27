# DoralScholarsWeb
This is a website intended to transform visits into either donations or transfer information 
about current events to the user

## Plan for the website

Use a CRM for Ajah (event manager / CEO) to be able to easily add pages for events

Use github pages to deploy this website 

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
- **Event Fields:**
  - Title (required)
  - Date (required)
  - Names/Organizers (optional)
  - Description/Text (optional)

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
- `docs/index.html` - Home page
- `docs/about.html` - About page
- `docs/events.html` - Events page (displays admin events or default programs)
- `docs/contact.html` - Contact page
- `docs/admin.html` - Admin CMS interface
- `docs/admin.js` - Admin functionality
- `docs/login.js` - Login system
- `docs/events-data.js` - Events data loader
- `docs/events.json` - Events storage (for GitHub sync)
- `docs/styles.css` - Brand styles
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

