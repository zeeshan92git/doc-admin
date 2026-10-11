import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, LogOut } from 'lucide-react';

const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const { dToken, setdToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setaToken('');
      localStorage.removeItem('aToken');
    }

    if (dToken) {
      setdToken('');
      localStorage.removeItem('dToken');
    }

    navigate('/');
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 70,
          zIndex: 100,
          background: 'var(--paper)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div
          className="shell nav"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            paddingInline: 'clamp(12px, 3vw, 24px)',
          }}
        >
          <button
            type="button"
            className="brand"
            aria-label="DocCure home"
            onClick={() => navigate('/')}
          >
            <span className="brand__mark">
              <HeartPulse size={20} />
            </span>

            <span className="brand__name">DocCure</span>

            <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-[var(--rule)] bg-[var(--bone)] text-[var(--ink-2)]">
              {aToken ? 'Admin' : 'Doctor'}
            </span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="btn btn-sm"
            style={{ flexShrink: 0 }}
          >
            <span>Log out</span>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Reserve space for the fixed navbar */}
      <div
        aria-hidden="true"
        style={{ height: 70, flexShrink: 0 }}
      />
    </>
  );
};

export default Navbar;