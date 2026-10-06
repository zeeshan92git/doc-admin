# DocCure Admin and Doctor Portal

Administrative and doctor-facing web application for managing the DocCure appointment platform.

## Features

- Administrator login and doctor management.
- Appointment and dashboard workflows.
- Doctor portal pages for appointments, profile, and dashboard.
- Protected contact inquiry inbox for reviewing patient messages.
- Mark inquiries as handled and open a reply in the administrator's email client.

The inquiry inbox displays submissions saved by the backend. SMTP is optional; if it is not configured, contact messages are still stored and available here.

## Tech stack

React 19, Vite, React Router, Axios, Tailwind CSS, and Lucide icons.

## Requirements

- Node.js and npm
- The [DocCure backend](https://github.com/zeeshan92git/doc-backend) running locally or deployed

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file at the project root:

```dotenv
VITE_BACKEND_URL=http://localhost:5000
```

Set `VITE_BACKEND_URL` to the backend origin, without an API path suffix. For a deployed admin application, configure this variable in the hosting provider's build environment to point at the deployed API.

Start the Vite development server:

```bash
npm run dev
```

Sign in with an administrator account configured for the backend. The **Inquiries** page is available from the admin navigation and requires an admin token.

## Inquiry API used by this app

The admin portal sends the token as `Authorization: Bearer <token>`.

| Method and path | Purpose |
| --- | --- |
| `GET /api/admin/inquiries?page=1&limit=100` | Load the newest inquiries |
| `PATCH /api/admin/inquiries/:inquiryId/status` | Mark an inquiry as `handled` or return it to `new` |

The inbox uses a `mailto:` link to open a reply in the user's email client; it does not send replies from the app.

## Scripts

- `npm run dev`: Start the local development server.
- `npm run build`: Create a production build in `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## Related applications

- [Backend API](https://github.com/zeeshan92git/doc-backend)
- [Patient frontend](https://github.com/zeeshan92git/doc-frontend)
