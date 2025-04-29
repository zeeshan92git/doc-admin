import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { SquarePlus, CalendarDays, HousePlus, Users , CircleUser } from 'lucide-react';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);


  return (

    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to={'/admin-dashboard'}>
            <HousePlus />
            <p className='hidden md:block'>DashBoard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100  border-r-4 border-blue-500' : ''}`} to={'/all-appointment'}>
            <CalendarDays />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100  border-r-4 border-blue-500' : ''}`} to={'/add-doctor'}>
            <SquarePlus />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100  border-r-4 border-blue-500' : ''}`} to={'/doctor-list'}>
            <Users />
            <p className='hidden md:block'>Doctor List</p>
          </NavLink>
        </ul>
      }



      {
        dToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to={'/doc-dashboard'}>
            <HousePlus />
            <p className='hidden md:block'>DashBoard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100  border-r-4 border-blue-500' : ''}`} to={'/doc-appointment'}>
            <CalendarDays />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-100  border-r-4 border-blue-500' : ''}`} to={'/doc-profile'}>
          <CircleUser />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
          
        </ul>
      }
    </div>
  )
}

export default Sidebar;