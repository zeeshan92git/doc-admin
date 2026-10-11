# DocCure portal UI update

Replace the matching files in your existing admin frontend's src folder:

- App.jsx, main.jsx and index.css → src/
- Sidebar.jsx, Navbar.jsx and Home.jsx → src/component/
- Login.jsx → src/pages/
- AddDoct.jsx, AllAppointments.jsx, Dashboard.jsx, DoctorList.jsx and InquiryInbox.jsx → src/pages/Admin/
- DocAppointment.jsx, DocDashBoard.jsx and DocProfile.jsx → src/pages/Doctor/

Uses your existing React, React Router, Tailwind CSS, lucide-react, axios and react-toastify dependencies. Keep your existing context providers, assets and backend configuration. No new dependency is required.

Changes: teal and slate styling, consistent typography and form controls, labeled horizontal navigation on mobile, persistent desktop sidebar, mobile appointment cards, responsive doctor directory, dashboard empty states, larger action targets, accessible form labels and login submission feedback.

After replacing files, run your existing npm run dev and npm run build commands. Confirm your HTML includes <meta name="viewport" content="width=device-width, initial-scale=1.0">. Check login in both roles, dashboard loading, appointment actions, doctor creation and availability, profile save and inquiry handling.

Validation: every JSX file was syntax checked. The attachments do not include package.json, context providers or assets, so a complete production build and live API verification require your existing project.
