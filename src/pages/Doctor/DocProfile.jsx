import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-blue-100 shadow-lg  shadow-blue-950 rounded-lg p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={profileData?.image}
            alt={profileData?.name || 'Doctor Image'}
            className="w-32 h-32 bg-blue-500 rounded-full object-cover shadow-md"
          />
        </div>

        {/* Doctor Basic Info */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{profileData?.name}</h1>
          <p className="text-gray-500">{profileData?.speciality}</p>
          <p className="text-gray-600 mt-2">{profileData?.degree} • {profileData?.experience} Experience</p>
        </div>

        {/* Divider */}
        <hr className="my-4 " />

        {/* Address */}
        <div className='mb-1'>
          <p className="text-lg font-semibold mb-1 text-gray-700">Address</p>
          <div className="text-gray-600">
            {isEdit ? (
              <>
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                />
              </>
            ) : (
              <>
                <p>{profileData?.address?.line1}</p>
                <p>{profileData?.address?.line2}</p>
              </>
            )}
          </div>
        </div>

        {/* About Doctor */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
          <p className="text-gray-600 leading-relaxed">{profileData?.about}</p>
        </div>

        {/* Consultation Fee */}
        <div className="mb-1 text-center">
          <p className="text-lg font-semibold text-green-600">
            Consultation Fee: {currency}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) => setProfileData((prev) => ({ ...prev, fee: e.target.value }))}
                value={profileData?.fee}
                className="ml-2 w-20 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <span>{profileData?.fee}</span>
            )}
          </p>
        </div>

        {/* Email */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">Email: {profileData?.email}</p>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))}
            checked={profileData.available}
            className="w-4 h-4"
          />
          <label className="text-gray-700">Available</label>
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-center mt-6">
          {isEdit ? (
            <button
              onClick={upDateProfile}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setisEdit(true)}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default DocProfile;
