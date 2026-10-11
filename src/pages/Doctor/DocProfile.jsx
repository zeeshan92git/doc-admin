import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MapPin, DollarSign, Mail, Edit3, Save } from 'lucide-react';

function DocProfile() {
  const { dToken, getProfileData, profileData, setProfileData, backendURL } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setisEdit] = useState(false);

  const upDateProfile = async () => {
    try {
      const updatedData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };
      const { data } = await axios.post(backendURL + '/api/doctor/update-profile', updatedData, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) {
        toast.success(data.message);
        setisEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="max-w-3xl mx-auto">
        <div className="panel">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[var(--rule)] text-center sm:text-left">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-[var(--rule)] bg-[var(--sage-2)]">
              <img src={profileData?.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Medical Practitioner</span>
              <h1 className="t-h2 text-[var(--ink)] truncate">{profileData?.name}</h1>
              <p className="muted text-sm mt-0.5">{profileData?.speciality}</p>
              <p className="data text-xs mt-2 text-[var(--ink-2)]">{profileData?.degree} · {profileData?.experience} Experience</p>
            </div>
          </div>

          <div className="py-6 flex flex-col gap-6 border-b border-[var(--rule)]">
            <div>
              <h3 className="label mb-2">About Practitioner</h3>
              <p className="text-sm leading-relaxed text-[var(--ink-2)] bg-[var(--bone)]/50 p-4 rounded-xl border border-[var(--rule-faint)]">
                {profileData?.about}
              </p>
            </div>

            <div>
              <h3 className="label mb-2 flex items-center gap-1.5"><MapPin size={14} /> Clinic Address</h3>
              {isEdit ? (
                <div className="flex flex-col gap-2 max-w-md">
                  <input type="text" onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData?.address?.line1 || ''} className="input" placeholder="Address Line 1" />
                  <input type="text" onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData?.address?.line2 || ''} className="input" placeholder="Address Line 2" />
                </div>
              ) : (
                <p className="text-sm text-[var(--ink-2)]">{profileData?.address?.line1}<br />{profileData?.address?.line2}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="label mb-1 flex items-center gap-1.5"><DollarSign size={14} /> Consultation Fee</h3>
                {isEdit ? (
                  <div className="flex items-center gap-2">
                    <span className="data">{currency}</span>
                    <input min="0" type="number" onChange={(e) => setProfileData((prev) => ({ ...prev, fee: e.target.value }))} value={profileData?.fee || ''} className="input w-24" />
                  </div>
                ) : (
                  <p className="data text-base font-semibold text-[var(--ok)]">{currency} {profileData?.fee}</p>
                )}
              </div>
              <div>
                <h3 className="label mb-1 flex items-center gap-1.5"><Mail size={14} /> Email Address</h3>
                <p className="data text-sm text-[var(--ink-2)] truncate">{profileData?.email}</p>
              </div>
            </div>

            <div className="pt-1">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))} checked={profileData?.available || false} disabled={!isEdit} className="w-4 h-4 accent-[var(--moss)] rounded cursor-pointer" />
                <span className={`avail ${profileData?.available ? 'is-on' : ''}`}>
                  <span className="dot"></span>
                  {profileData?.available ? 'Currently Available for Appointments' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            {isEdit ? (
              <button onClick={upDateProfile} className="btn btn-solid"><Save size={16} /><span>Save Changes</span></button>
            ) : (
              <button onClick={() => setisEdit(true)} className="btn"><Edit3 size={16} /><span>Edit Profile</span></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocProfile;