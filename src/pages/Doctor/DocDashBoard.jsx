import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets.js';
import { AppContext } from '../../context/AppContext';
import { X , Check } from 'lucide-react';

function DocDashBoard() {
  const { dToken, getDashData, dashData , completeAppointments, cancelAppointments } = useContext(DoctorContext);
  const { dateFormat, currency } = useContext(AppContext);

  console.log("dashData:", dashData);
  console.log("dashData.latestAppointments:", dashData?.latestAppointments);
  console.log("Is Array:", Array.isArray(dashData?.latestAppointments));

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (

    <div className='m-5'>

      <div className='flex flex-wrap gap-3 '>
        <div className='flex items-center gap-2  bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105  transition-all'>
          <img className='w-14' src={assets.earning_icon} alt='' />
          <div>
            <p className='text-xl text-gray-800 font-semibold'>{currency} {dashData.earning}</p>
            <p className='text-gray-400'>Earning</p>
          </div>
        </div>

        <div className='flex items-center gap-2  bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105  transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt='' />
          <div>
            <p className='text-xl text-gray-800 font-semibold'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2  bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105  transition-all'>
          <img className='w-14' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl text-gray-800 font-semibold'>{dashData.patient}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5  px-4 py-6 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="list_icon" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='w-10 h-10 rounded-full' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>Booked at {dateFormat(item.slotDate)}</p>
              </div>
              {
                item.cancelled ? <p className='text-white bg-red-500 p-2  rounded-sm  text-sm font-medium'>Cancelled</p>
                  : item.isCompleted ? <p className='text-white bg-green-500 p-2  rounded-sm  text-sm font-medium'>Completed</p>
                    : <div className='flex items-center gap-2 '>
                      <p onClick={() => cancelAppointments(item._id)} className='w-10 cursor-pointer rounded-full border  border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white'><X /></p>
                      <p onClick={() => completeAppointments(item._id)} className='w-10 cursor-pointer rounded-full p-2 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white'><Check /></p>
                    </div>
              }
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default DocDashBoard;
