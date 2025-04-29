import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets.js';
import { X } from 'lucide-react';
import { AppContext } from '../../context/AppContext.jsx';
const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const {dateFormat} = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3 '>
        <div className='flex items-center gap-2  bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105  transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt='' />
          <div>
            <p className='text-xl text-gray-800 font-semibold'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
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
            <p className='text-xl text-gray-800 font-semibold'>{dashData.users}</p>
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
              <img className='w-10 rounded-full' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>Booked at {dateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='bg-red-500 text-white p-2 rounded-sm text-center text-xs font-medium'>Cancelled</p>
                : <p onClick={() => 
                  {cancelAppointment(item._id).then(()=>{getDashData();});}} className='w-10 cursor-pointer hover:text-white hover:rounded-full hover:p-2 hover:bg-red-500 '><X /></p>
              }
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard;
