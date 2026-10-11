import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext.jsx';
import {
  Users,
  CalendarDays,
  UserCheck,
  X,
  Clock,
} from 'lucide-react';

const Dashboard = () => {
  const {
    aToken,
    getDashData,
    cancelAppointment,
    dashData,
  } = useContext(AdminContext);

  const { dateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  const latestAppointments = dashData?.latestAppointments || [];

  const stats = [
    {
      label: 'Doctors',
      value: dashData?.doctors ?? 0,
      icon: UserCheck,
      background: 'var(--moss)',
      color: '#fff',
    },
    {
      label: 'Appointments',
      value: dashData?.appointments ?? 0,
      icon: CalendarDays,
      background: 'var(--sage-2)',
      color: 'var(--moss-2)',
    },
    {
      label: 'Patients',
      value: dashData?.users ?? 0,
      icon: Users,
      background: 'var(--bone-2)',
      color: 'var(--ink)',
    },
  ];

  return (
    <>
      <style>{`
        .admin-dashboard {
          width: 100%;
          max-width: 1280px;
          min-width: 0;
          margin-inline: auto;
          padding-block: 12px;
        }

        .admin-dashboard__heading {
          margin-bottom: 24px;
        }

        .admin-dashboard__heading h1 {
          margin: 6px 0 0;
          font-size: clamp(24px, 3vw, 32px);
          line-height: 1.25;
          font-weight: 700;
          color: var(--ink);
        }

        .admin-dashboard__stats {
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .admin-dashboard__stat {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
          padding: 20px;
          border: 1px solid var(--rule);
          border-radius: 14px;
          background: var(--paper);
        }

        .admin-dashboard__stat-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 12px;
        }

        .admin-dashboard__stat-value {
          margin: 0;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.2;
          font-weight: 700;
          color: var(--ink);
          overflow-wrap: anywhere;
        }

        .admin-dashboard__stat-label {
          margin: 5px 0 0;
          font-size: 13px;
          color: var(--mist);
        }

        .admin-dashboard__bookings {
          min-width: 0;
          border: 1px solid var(--rule);
          border-radius: 14px;
          background: var(--paper);
          overflow: hidden;
        }

        .admin-dashboard__bookings-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--rule);
        }

        .admin-dashboard__bookings-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
        }

        .admin-dashboard__booking {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 20px;
        }

        .admin-dashboard__booking + .admin-dashboard__booking {
          border-top: 1px solid var(--rule);
        }

        .admin-dashboard__person {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .admin-dashboard__avatar {
          width: 40px;
          height: 40px;
          min-width: 40px;
          max-width: 40px;
          min-height: 40px;
          max-height: 40px;
          flex: 0 0 40px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--sage-2);
        }

        .admin-dashboard__details {
          min-width: 0;
        }

        .admin-dashboard__name {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
          color: var(--ink);
          overflow-wrap: anywhere;
        }

        .admin-dashboard__date {
          margin: 3px 0 0;
          font-size: 12px;
          line-height: 1.5;
          color: var(--mist);
          overflow-wrap: anywhere;
        }

        .admin-dashboard__status {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .admin-dashboard__status--cancelled {
          color: var(--brick);
          background: #fff0f1;
        }

        .admin-dashboard__status--completed {
          color: var(--ok);
          background: var(--sage-2);
        }

        .admin-dashboard__cancel {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
          padding: 0;
          border: 1px solid var(--rule);
          border-radius: 10px;
          background: var(--paper);
          color: var(--brick);
          cursor: pointer;
        }

        .admin-dashboard__cancel:hover {
          background: #fff0f1;
          border-color: var(--brick);
        }

        .admin-dashboard__empty {
          margin: 0;
          padding: 36px 16px;
          text-align: center;
          color: var(--mist);
        }

        @media (max-width: 480px) {
          .admin-dashboard__stat {
            padding: 16px;
          }

          .admin-dashboard__bookings-header {
            padding: 16px;
          }

          .admin-dashboard__booking {
            flex-wrap: wrap;
            gap: 12px;
            padding: 16px;
          }

          .admin-dashboard__person {
            flex-basis: calc(100% - 60px);
          }

          .admin-dashboard__status {
            margin-left: 52px;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        <div className="admin-dashboard__heading">
          <span className="label uppercase tracking-widest">
            System Overview
          </span>
          <h1>Admin Dashboard</h1>
        </div>

        {!dashData ? (
          <p className="admin-dashboard__empty" role="status">
            Loading dashboard…
          </p>
        ) : (
          <>
            <div className="admin-dashboard__stats">
              {stats.map(({ label, value, icon: Icon, background, color }) => (
                <div className="admin-dashboard__stat" key={label}>
                  <div
                    className="admin-dashboard__stat-icon"
                    style={{ background, color }}
                  >
                    <Icon size={22} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p className="admin-dashboard__stat-value">{value}</p>
                    <p className="admin-dashboard__stat-label">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <section
              className="admin-dashboard__bookings"
              aria-labelledby="latest-bookings-heading"
            >
              <div className="admin-dashboard__bookings-header">
                <Clock
                  size={18}
                  style={{ color: 'var(--moss)', flexShrink: 0 }}
                />
                <h2 id="latest-bookings-heading">Latest Bookings</h2>
              </div>

              {latestAppointments.length === 0 ? (
                <p className="admin-dashboard__empty">
                  No recent bookings.
                </p>
              ) : (
                latestAppointments.map((item) => (
                  <div
                    className="admin-dashboard__booking"
                    key={item._id}
                  >
                    <div className="admin-dashboard__person">
                      <img
                        className="admin-dashboard__avatar"
                        src={item.docData?.image}
                        width={40}
                        height={40}
                        alt=""
                      />

                      <div className="admin-dashboard__details">
                        <p className="admin-dashboard__name">
                          {item.docData?.name || 'Doctor'}
                        </p>
                        <p className="admin-dashboard__date">
                          {dateFormat(item.slotDate)}
                          {item.slotTime && ` · ${item.slotTime}`}
                        </p>
                      </div>
                    </div>

                    {item.cancelled ? (
                      <span className="admin-dashboard__status admin-dashboard__status--cancelled">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="admin-dashboard__status admin-dashboard__status--completed">
                        Completed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          await cancelAppointment(item._id);
                          await getDashData();
                        }}
                        className="admin-dashboard__cancel"
                        title="Cancel booking"
                        aria-label={`Cancel booking with ${
                          item.docData?.name || 'doctor'
                        }`}
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;