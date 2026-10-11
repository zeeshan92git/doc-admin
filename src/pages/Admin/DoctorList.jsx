import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { getAllDoctors, doctors, aToken, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="mb-6">
        <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Directory</span>
        <h1 className="t-h2 text-[var(--ink)]">Registered Doctors</h1>
      </div>

      {doctors.length === 0 && <div className="panel empty-state">No doctors registered yet.</div>}
      <div className="doc-grid">
        {doctors.map((item, index) => (
          <div className="doc-card" key={item._id}>
            <div className="doc-card__frame">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="pt-3 flex flex-col gap-1">
              <h3 className="t-card text-[var(--ink)]">{item.name}</h3>
              <p className="muted text-sm">{item.speciality}</p>
              <label className="mt-2 inline-flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" onChange={() => changeAvailability(item._id)} checked={item.available} className="w-4 h-4 accent-[var(--moss)] rounded cursor-pointer" />
                <span className={`avail ${item.available ? 'is-on' : ''}`}>
                  <span className="dot"></span>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;