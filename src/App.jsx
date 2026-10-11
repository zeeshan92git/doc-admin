import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Login from './pages/Login';
import Home from './component/Home';
import AddDoct from './pages/Admin/AddDoct';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import DoctorList from './pages/Admin/DoctorList';
import InquiryInbox from './pages/Admin/InquiryInbox';
import DocAppointment from './pages/Doctor/DocAppointment';
import DocDashBoard from './pages/Doctor/DocDashBoard';
import DocProfile from './pages/Doctor/DocProfile';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <Login />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bone)] text-[var(--ink)]">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <div className="portal-layout">
        <Sidebar />

        <main className="portal-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointment" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoct />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/inquiries" element={<InquiryInbox />} />

            <Route path="/doc-dashboard" element={<DocDashBoard />} />
            <Route path="/doc-appointment" element={<DocAppointment />} />
            <Route path="/doc-profile" element={<DocProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;