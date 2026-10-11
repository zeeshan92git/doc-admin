import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight } from 'lucide-react';

const Login = () => {
  const [state, setState] = useState('Admin');
  const { setaToken, backEndUrl } = useContext(AdminContext);
  const { setdToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backEndUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setaToken(data.token);
          if (data.message) toast.success(data.message);
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(backEndUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setdToken(data.token);
          if (data.message) toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bone)]">
      <div className="flex w-full lg:w-1/2 bg-[var(--moss-2)] text-[var(--bone)] p-6 sm:p-10 lg:p-16 flex-col justify-between relative overflow-hidden">
        <div className="brand z-10">
          <div className="brand__mark"><HeartPulse size={20} /></div>
          <span className="brand__name text-[var(--bone)]">DocCure</span>
        </div>
        <div className="my-auto z-10 max-w-lg">
          <h1 className="t-h1 text-[var(--bone)] mb-4">Healthcare Management Portal</h1>
          <p className="muted text-[var(--sage)]">Streamline healthcare operations, schedule consultations, and keep patient records effortless.</p>
        </div>
        <p className="label text-[var(--sage)] z-10">© DocCure Portal System</p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-12">
        <div className="w-full max-w-md panel bg-[var(--paper)] reveal">
          <div className="mb-6">
            <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Authentication</span>
            <h2 className="t-h2 text-[var(--ink)]">{state} Login</h2>
          </div>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
            <div className="field">
              <label htmlFor="login-email" className="label">Email Address</label>
              <input id="login-email" autoComplete="username" type="email" required placeholder="name@doccure.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </div>
            <div className="field">
              <label htmlFor="login-password" className="label">Password</label>
              <input id="login-password" autoComplete="current-password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>
            <button disabled={isSubmitting} type="submit" className="btn btn-solid btn-block mt-4">
              <span>{isSubmitting ? 'Signing in…' : 'Login to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-[var(--rule)] text-center text-sm text-[var(--mist)]">
            {state === 'Admin' ? (
              <p>Are you a Doctor? <button type="button" onClick={() => setState('Doctor')} className="font-medium text-[var(--brick)] hover:underline ml-1 cursor-pointer">Switch to Doctor Login</button></p>
            ) : (
              <p>Are you an Admin? <button type="button" onClick={() => setState('Admin')} className="font-medium text-[var(--brick)] hover:underline ml-1 cursor-pointer">Switch to Admin Login</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;