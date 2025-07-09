import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Home from './component/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import AddDoct from './pages/Admin/AddDoct.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';

import DocDashBoard from './pages/Doctor/DocDashBoard.jsx';
import DocAppointment from './pages/Doctor/DocAppointment.jsx';
import DocProfile from './pages/Doctor/DocProfile.jsx';

function App() {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ?
    (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            {/* Admin Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/add-doctor" element={<AddDoct />} />
            <Route path="/all-appointment" element={<AllAppointments />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            {/* Doctor Routes */}
            <Route path="/doc-dashboard" element={<DocDashBoard />} />
            <Route path="/doc-profile" element={<DocProfile />} />
            <Route path="/doc-appointment" element={<DocAppointment />} />
          </Routes>
        </div>
      </div>
    ) : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App;