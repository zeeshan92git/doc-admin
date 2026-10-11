import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { DollarSign, CalendarDays, Users, Clock, X, Check } from 'lucide-react';

function DocDashBoard() {
  const { dToken, getDashData, dashData, completeAppointments, cancelAppointments } = useContext(DoctorContext);
  const { dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  return dashData && (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="mb-6">
        <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Performance</span>
        <h1 className="t-h2 text-[var(--ink)]">Doctor Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="panel flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-full bg-[var(--moss)] text-[var(--bone)] flex items-center justify-center shrink-0"><DollarSign size={22} /></div>
          <div>
            <p className="t-h1 text-[var(--ink)] font-semibold">{currency} {dashData.earning}</p>
            <p className="label">Earnings</p>
          </div>
        </div>
        <div className="panel flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-full bg-[var(--sage-2)] text-[var(--moss-2)] flex items-center justify-center shrink-0"><CalendarDays size={22} /></div>
          <div>
            <p className="t-h1 text-[var(--ink)] font-semibold">{dashData.appointments}</p>
            <p className="label">Appointments</p>
          </div>
        </div>
        <div className="panel flex items-center gap-4 p-5">
          <div className="w-12 h-12 rounded-full bg-[var(--bone-2)] text-[var(--ink)] flex items-center justify-center shrink-0"><Users size={22} /></div>
          <div>
            <p className="t-h1 text-[var(--ink)] font-semibold">{dashData.patient}</p>
            <p className="label">Patients</p>
          </div>
        </div>
      </div>

      <div className="panel p-0 overflow-hidden">
        <div className="p-5 border-b border-[var(--rule)] flex items-center gap-2.5">
          <Clock size={18} className="text-[var(--moss)]" />
          <h2 className="t-h3 text-[var(--ink)]">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-[var(--rule)]">
          {(dashData.latestAppointments || []).length === 0 && <p className="empty-state">No recent bookings.</p>}
          {(dashData.latestAppointments || []).map((item, index) => (
            <div className="flex items-center justify-between p-4 px-5 hover:bg-[var(--bone-2)]/40 transition-colors gap-3" key={item._id}>
              <div className="flex items-center gap-3 min-w-0">
                <img className="w-9 h-9 rounded-full object-cover shrink-0 border border-[var(--rule)]" src={item.userData.image} alt="" />
                <div className="min-w-0">
                  <p className="font-medium text-[var(--ink)] truncate">{item.userData.name}</p>
                  <p className="muted text-xs truncate">Booked on {dateFormat(item.slotDate)}</p>
                </div>
              </div>
              {item.cancelled ? (
                <span className="chip text-[11px] py-1 px-3 bg-[var(--brick)]/10 text-[var(--brick)] border-[var(--brick)]/20 shrink-0">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="chip text-[11px] py-1 px-3 bg-[var(--ok)]/10 text-[var(--ok)] border-[var(--ok)]/20 shrink-0">Completed</span>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => cancelAppointments(item._id)} className="w-8 h-8 rounded-full border border-[var(--rule)] text-[var(--brick)] flex items-center justify-center hover:bg-[var(--brick)] hover:text-[var(--paper)] transition-colors" title="Cancel"><X size={14} /></button>
                  <button onClick={() => completeAppointments(item._id)} className="w-8 h-8 rounded-full border border-[var(--rule)] text-[var(--ok)] flex items-center justify-center hover:bg-[var(--ok)] hover:text-[var(--paper)] transition-colors" title="Complete"><Check size={14} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocDashBoard;