# She Can Foundation Contact Form

A clean, responsive full-stack internship task for She Can Foundation. The project includes a public contact form, validation, Neon PostgreSQL database storage, and a simple password-protected admin panel to view submissions.

## Live Project Goal

This project was built for the Full Stack Development Internship Task. The required form fields are included:

- Name
- Email
- Message
- Submit button
- Success message: `Form Submitted Successfully`

Additional features were added to make the submission stronger while keeping it simple to deploy on Vercel.

## Tech Stack

- **Next.js**: App Router based full-stack React framework
- **React**: Interactive form UI
- **CSS**: Custom responsive UI using She Can Foundation inspired colors
- **Lucide React**: Clean icons for form and feature elements
- **Neon PostgreSQL**: Cloud database for storing contact submissions
- **pg**: PostgreSQL client used by the API routes
- **Vercel**: Recommended deployment platform

## Main Features

- Beautiful She Can Foundation themed UI
- Single-screen laptop layout with responsive mobile design
- Name, email, and message form
- Client-side and server-side validation
- Success message after submission
- API route for form submission
- Neon PostgreSQL database integration
- Automatic database table creation
- Password-protected admin page
- Latest 50 submissions visible in admin panel
- Vercel-ready environment variable setup

## Pages

### Home Page

URL:

```text
/
```

The home page contains the contact form and the main UI. On successful submission, it displays:

```text
Form Submitted Successfully
```

### Admin Page

URL:

```text
/admin
```

The admin page allows the project owner to view submitted form messages.

Admin password:

```text
shecan123
```

For the admin page to work locally or on Vercel, set this environment variable:

```env
ADMIN_PASSWORD="shecan123"
```

## API Routes

### Submit Contact Form

```text
POST /api/contact
```

Stores a valid form submission in the database and returns a success message.

### Load Admin Submissions

```text
POST /api/submissions
```

Checks the admin password and returns the latest submissions from the database.

## Database

The project uses Neon PostgreSQL. The table is created automatically when the first valid form submission is received.

Table name:

```text
contact_submissions
```

Columns:

- `id`
- `name`
- `email`
- `message`
- `created_at`

## Environment Variables

Create a `.env.local` file for local development:

```env
DATABASE_URL="your-neon-postgres-connection-string"
ADMIN_PASSWORD="shecan123"
```

Important:

- Do not push `.env`, `.env.local`, or real database credentials to GitHub.
- Add these same variables in Vercel before deploying.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin page:

```text
http://localhost:3000/admin
```

## Build Check

Run this before deployment:

```bash
npm run build
```

Optional lint check:

```bash
npm run lint
```

## Deploy On Vercel

1. Push the code to GitHub.
2. Open Vercel and import the GitHub repository.
3. Add environment variables in Vercel Project Settings:

```env
DATABASE_URL="your-neon-postgres-connection-string"
ADMIN_PASSWORD="shecan123"
```

4. Click Deploy.

After deployment:

- Public form: `https://your-project.vercel.app/`
- Admin panel: `https://your-project.vercel.app/admin`
- Admin password: `shecan123`

## Folder Structure

```text
app/
  admin/
    page.jsx
  api/
    contact/
      route.js
    submissions/
      route.js
  globals.css
  layout.jsx
  page.jsx
lib/
  db.js
public/
  she-can-mark.svg
```

## Project Highlights

This project is intentionally simple, but it demonstrates real full-stack development:

- A polished frontend
- A working backend API
- Database persistence
- Validation
- Authentication-style admin access
- Deployment-ready setup
