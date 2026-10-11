import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import {
  SquarePlus,
  CalendarDays,
  HousePlus,
  Users,
  CircleUser,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: HousePlus },
    { to: '/all-appointment', label: 'Appointments', icon: CalendarDays },
    { to: '/add-doctor', label: 'Add Doctor', icon: SquarePlus },
    { to: '/doctor-list', label: 'Doctor List', icon: Users },
    { to: '/inquiries', label: 'Inquiry Inbox', icon: Mail },
  ];

  const doctorLinks = [
    { to: '/doc-dashboard', label: 'Dashboard', icon: HousePlus },
    { to: '/doc-appointment', label: 'Appointments', icon: CalendarDays },
    { to: '/doc-profile', label: 'Profile', icon: CircleUser },
  ];

  const links = aToken ? adminLinks : dToken ? doctorLinks : [];

  const closeOnMobile = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .sidebar-control,
        .sidebar-control * {
          box-sizing: border-box;
        }

        .sidebar-control {
          flex: 0 0 64px;
          width: 64px;
          min-width: 0;
          align-self: stretch;
          background: var(--paper);
          border-right: 1px solid var(--rule);
        }

        .sidebar-control.is-open {
          flex-basis: 240px;
          width: 240px;
        }

        .sidebar-control__inner {
          position: sticky;
          top: 70px;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          max-height: calc(100dvh - 70px);
          padding: 12px 11px;
          overflow: hidden;
        }

        .sidebar-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid var(--rule);
          border-radius: 9px;
          background: var(--paper);
          color: var(--ink);
          cursor: pointer;
        }

        .sidebar-toggle:hover {
          background: var(--bone-2);
        }

        .sidebar-toggle:focus-visible,
        .sidebar-menu__link:focus-visible {
          outline: 2px solid var(--moss);
          outline-offset: 2px;
        }

        .sidebar-navigation {
          width: 100%;
          min-width: 0;
          min-height: 0;
          margin-top: 12px;
          overflow-x: hidden;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sidebar-navigation::-webkit-scrollbar {
          display: none;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          min-width: 0;
          padding: 3px;
        }

        .sidebar-menu__heading {
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--mist);
        }

        .sidebar-menu__link {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-width: 0;
          min-height: 46px;
          padding: 12px 10px;
          border-radius: 9px;
          color: var(--ink-2);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          text-decoration: none;
        }

        .sidebar-menu__link:hover {
          background: var(--bone-2);
          color: var(--ink);
        }

        .sidebar-menu__link.is-active {
          background: var(--moss);
          color: white;
        }

        .sidebar-menu__link svg {
          flex: 0 0 18px;
        }

        .sidebar-menu__link span {
          min-width: 0;
          white-space: normal;
          overflow-wrap: anywhere;
        }

        @media (max-width: 767px) {
          .sidebar-control,
          .sidebar-control.is-open {
            position: sticky;
            top: 70px;
            z-index: 40;
            flex: 0 0 auto;
            width: 100%;
            align-self: auto;
            border-right: 0;
            border-bottom: 1px solid var(--rule);
          }

          .sidebar-control__inner {
            position: static;
            max-height: calc(100dvh - 70px);
            padding: 10px 16px;
          }
        }
      `}</style>

      <aside className={`sidebar-control ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar-control__inner">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Hide navigation' : 'Show navigation'}
            aria-expanded={isOpen}
            aria-controls="portal-sidebar-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            id="portal-sidebar-menu"
            className="sidebar-navigation"
            aria-label="Portal navigation"
            hidden={!isOpen}
          >
            {isOpen && (
              <div className="sidebar-menu">
                <span className="sidebar-menu__heading">
                  Navigation
                </span>

                {links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={closeOnMobile}
                    className={({ isActive }) =>
                      `sidebar-menu__link ${
                        isActive ? 'is-active' : ''
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;