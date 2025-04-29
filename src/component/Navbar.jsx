import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { DoctorContext } from '../context/DoctorContext.jsx';
const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const {dToken , setdToken} = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
    aToken && setaToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setdToken('');
    dToken && localStorage.removeItem('dToken');
  };
  return (
    <div className='flex items-center justify-between sm:px-10 py-3  px-4   border-b bg-white '>
      <div className='flex items-center gap-2 text-xs justify-between '>
        <div onClick={() => navigate('/')} className="flex items-center justify-between">
          <div className="mt-2">
            <HeartPulse size={34} className="text-blue-600" />
          </div>
          <div className="font-bold text-3xl text-blue-900 font-sans ">
            DocCure
          </div>
        </div>
        <p className='border mt-2 px-2.5  py-0.5  rounded-full border-gray-500 text-gray-600 '>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>

      <button onClick={logout} className='bg-blue-500  text-white text-sm py-2 px-10 rounded-full cursor-pointer  '>Log out</button>
    </div>
  )
}
export default Navbar;