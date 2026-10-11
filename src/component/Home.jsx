import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { CalendarDays, Users, ArrowRight, LayoutDashboard } from 'lucide-react';
function Home() {
  const { aToken } = useContext(AdminContext);
  const links = aToken ? [
    ['/admin-dashboard', 'Dashboard', 'View doctors, patients and recent bookings.', LayoutDashboard],
    ['/all-appointment', 'Appointments', 'Review scheduled consultations.', CalendarDays],
    ['/doctor-list', 'Doctor directory', 'Manage your medical team and availability.', Users],
  ] : [
    ['/doc-dashboard', 'Dashboard', 'View earnings and recent bookings.', LayoutDashboard],
    ['/doc-appointment', 'Appointments', 'Manage your consultation schedule.', CalendarDays],
    ['/doc-profile', 'My profile', 'Update clinic details and availability.', Users],
  ];
  return <div className="shell section reveal">
    <div className="welcome-banner"><span className="label">DOCCURE MANAGEMENT PORTAL</span>
      <h1 className="t-h1">Welcome to your workspace</h1>
      <p>Everything you need to manage your {aToken ? 'healthcare operations' : 'practice'}, in one place.</p>
      <Link className="btn btn-solid" to={links[0][0]}>Open dashboard <ArrowRight size={16} /></Link>
    </div>
    <div className="quick-grid">{links.map(([to, title, description, Icon]) =>
      <Link key={to} to={to} className="quick-card"><Icon size={24} /><h2 className="t-h3">{title}</h2><p className="muted">{description}</p><span>View section <ArrowRight size={16} /></span></Link>
    )}</div>
  </div>;
}
export default Home;
