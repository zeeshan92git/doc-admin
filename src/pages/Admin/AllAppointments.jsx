import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { X, Calendar } from 'lucide-react';

// Explicit dimensions prevent global image rules from expanding table avatars.
const avatarStyle = {
  width: 32, height: 32, minWidth: 32, maxWidth: 32,
  minHeight: 32, maxHeight: 32, flex: '0 0 32px',
  objectFit: 'cover', borderRadius: '50%', display: 'block',
};
const personStyle = { display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 };
const nameStyle = {
  minWidth: 0, whiteSpace: 'normal', overflowWrap: 'anywhere',
  lineHeight: 1.45, fontSize: 14,
};

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
  const { ageCalculator, dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="mb-6">
        <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Overview</span>
        <h1 className="t-h2 text-[var(--ink)]">All Scheduled Appointments</h1>
      </div>

      <div className="panel p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse appointment-table">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--bone)]">
                <th className="p-4 label">#</th>
                <th className="p-4 label">Patient</th>
                <th className="p-4 label">Age</th>
                <th className="p-4 label">Date & Time</th>
                <th className="p-4 label">Doctor</th>
                <th className="p-4 label">Fee</th>
                <th className="p-4 label text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {appointments.length === 0 && <tr><td colSpan={7} className="empty-state">No appointments to display.</td></tr>}
              {appointments.map((item, index) => (
                <tr key={item._id} className="hover:bg-[var(--bone-2)]/50 transition-colors">
                  <td data-label="#" className="p-4 data text-[var(--mist)]">{index + 1}</td>
                  <td data-label="Patient" className="p-4">
                    <div style={personStyle} className="flex items-center gap-3">
                      <img width={32} height={32} style={avatarStyle} className="shrink-0 w-8 h-8 rounded-full object-cover border border-[var(--rule)]" src={item.userData.image} alt="" />
                      <span style={nameStyle} className="font-medium text-[var(--ink)]">{item.userData.name}</span>
                    </div>
                  </td>
                  <td data-label="Age" className="p-4 data">{ageCalculator(item.userData.dob)}</td>
                  <td data-label="Date & Time" className="p-4 text-sm">
                    <div className="flex items-center gap-1.5 text-[var(--ink-2)]">
                      <Calendar size={14} className="text-[var(--mist)] shrink-0" />
                      <span>{dateFormat(item.slotDate)} @ {item.slotTime}</span>
                    </div>
                  </td>
                  <td data-label="Doctor" className="p-4">
                    <div style={personStyle} className="flex items-center gap-2">
                      <img width={32} height={32} style={avatarStyle} className="shrink-0 w-7 h-7 rounded-full object-cover bg-[var(--sage-2)]" src={item.docData.image} alt="" />
                      <span style={nameStyle} className="text-sm font-medium text-[var(--ink)]">{item.docData.name}</span>
                    </div>
                  </td>
                  <td data-label="Fee" className="p-4 data font-medium">{currency} {item.docData.fee}</td>
                  <td data-label="Action" className="p-4 text-right">
                    {item.cancelled ? (
                      <span className="chip text-[11px] py-1 px-3 bg-[var(--brick)]/10 text-[var(--brick)] border-[var(--brick)]/20">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="chip text-[11px] py-1 px-3 bg-[var(--ok)]/10 text-[var(--ok)] border-[var(--ok)]/20">Completed</span>
                    ) : (
                      <button onClick={() => cancelAppointment(item._id)} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--rule)] text-[var(--brick)] hover:bg-[var(--brick)] hover:text-[var(--paper)] transition-colors" title="Cancel Appointment">
                        <X size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;