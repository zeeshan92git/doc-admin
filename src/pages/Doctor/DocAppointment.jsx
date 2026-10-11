import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from "../../context/AppContext";
import { X, Check, Calendar } from 'lucide-react';

function DocAppointment() {
  const { dToken, appointments, getAppointments, cancelAppointments, completeAppointments } = useContext(DoctorContext);
  const { ageCalculator, dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="mb-6">
        <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Practitioner Schedule</span>
        <h1 className="t-h2 text-[var(--ink)]">Doctor Appointments</h1>
      </div>

      <div className="panel p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse appointment-table">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--bone)]">
                <th className="p-4 label">#</th>
                <th className="p-4 label">Patient</th>
                <th className="p-4 label">Payment</th>
                <th className="p-4 label">Age</th>
                <th className="p-4 label">Date & Time</th>
                <th className="p-4 label">Fee</th>
                <th className="p-4 label text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {appointments.length === 0 && <tr><td colSpan={7} className="empty-state">No appointments to display.</td></tr>}
              {[...appointments].reverse().map((item, index) => (
                <tr key={item._id} className="hover:bg-[var(--bone-2)]/50 transition-colors">
                  <td data-label="#" className="p-4 data text-[var(--mist)]">{index + 1}</td>
                  <td data-label="Patient" className="p-4">
                    <div className="flex items-center gap-3">
                      <img className="w-8 h-8 rounded-full object-cover border border-[var(--rule)]" src={item.userData.image} alt="" />
                      <span className="font-medium text-[var(--ink)]">{item.userData.name}</span>
                    </div>
                  </td>
                  <td data-label="Payment" className="p-4"><span className="chip text-[11px] py-1 px-3">{item.payment ? 'Online' : 'Cash'}</span></td>
                  <td data-label="Age" className="p-4 data">{ageCalculator(item.userData.dob)}</td>
                  <td data-label="Date & Time" className="p-4 text-sm">
                    <div className="flex items-center gap-1.5 text-[var(--ink-2)]">
                      <Calendar size={14} className="text-[var(--mist)] shrink-0" />
                      <span>{dateFormat(item.slotDate)}, {item.slotTime}</span>
                    </div>
                  </td>
                  <td data-label="Fee" className="p-4 data font-medium">{currency} {item.docData.fee}</td>
                  <td data-label="Action" className="p-4 text-right">
                    {item.cancelled ? (
                      <span className="chip text-[11px] py-1 px-3 bg-[var(--brick)]/10 text-[var(--brick)] border-[var(--brick)]/20">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="chip text-[11px] py-1 px-3 bg-[var(--ok)]/10 text-[var(--ok)] border-[var(--ok)]/20">Completed</span>
                    ) : (
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button onClick={() => cancelAppointments(item._id)} className="w-8 h-8 rounded-full border border-[var(--rule)] text-[var(--brick)] flex items-center justify-center hover:bg-[var(--brick)] hover:text-[var(--paper)] transition-colors" title="Cancel"><X size={14} /></button>
                        <button onClick={() => completeAppointments(item._id)} className="w-8 h-8 rounded-full border border-[var(--rule)] text-[var(--ok)] flex items-center justify-center hover:bg-[var(--ok)] hover:text-[var(--paper)] transition-colors" title="Complete"><Check size={14} /></button>
                      </div>
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
}

export default DocAppointment;