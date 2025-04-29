import React, { useCallback, useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from "../../context/AppContext";
import { X, Check } from 'lucide-react';

function DocAppointment() {

  const { dToken, appointments, getAppointments, cancelAppointments, completeAppointments } = useContext(DoctorContext);
  const { ageCalculator, dateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white  border rounded text-sm max-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden  grid  grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]  gap-1 py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
      </div>

      {appointments.reverse().map((item, index) => (
        <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base  sm:grid  grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b ' key={index}>
          <p className='max-sm:hidden'>{index + 1}</p>
          <div className='flex items-center gap-2'>
            <img className='w-8 h-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
          </div>
          <div>
            <p className='text-sm inline border  border-gray-500 px-2  rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
          </div>
          <p className='max-sm:hidden'>{ageCalculator(item.userData.dob)}</p>
          <p>{dateFormat(item.slotDate)},{item.slotTime}</p>
          <p>{currency} {item.docData.fee}</p>
          {
            item.cancelled ? <p className='text-white bg-red-500 p-2  rounded-sm text-sm font-medium'>Cancelled</p>
              : item.isCompleted ? <p className='text-white bg-green-500 p-2 rounded-sm text-sm font-medium'>Completed</p>
                : <div className='flex items-center gap-2 '>
                  <p onClick={() => cancelAppointments(item._id)} className='w-10 cursor-pointer rounded-full border  border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white'><X /></p>
                  <p onClick={() => completeAppointments(item._id)} className='w-10 cursor-pointer rounded-full p-2 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white'><Check /></p>
                </div>
          }

        </div>
      ))}
    </div>
  )
}

export default DocAppointment;
