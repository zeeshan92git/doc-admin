import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { X } from 'lucide-react';
const AllAppointments = () => {

  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
  const { ageCalculator, dateFormat, currency } = useContext(AppContext);

  console.log("Atoken on all appointments.jsx file", aToken);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5  px-2 '>
      <p className='mb-3 text-lg  font-medium'>All Appointments</p>
      <div className='bg-white border rounded  text-sm  max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grids-flow-col py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-start sm:items-center py-3 px-6 border-b hover:bg-blue-50 text-sm gap-2"
          >
            {/* Index */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="Patient" />
              <p>{item.userData.name}</p>
            </div>
            <p className="hidden sm:block">{ageCalculator(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="sm:text-left">
              <span className="sm:hidden font-medium">Date & Time: </span>
              {dateFormat(item.slotDate)} @ {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full bg-blue-300" src={item.docData.image} alt="Doctor" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fee */}
            <p>
              <span className="sm:hidden font-medium">Fee: </span>
              {currency} {item.docData.fee}
            </p>

            {/* Action */}
            {item.cancelled ? (
              <p className="bg-red-500 text-white px-2 py-1 rounded-sm text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-medium">Completed</p>
            ) : (
              <p
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer text-red-500 hover:text-red-700"
              >
                <X />
              </p>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments;
