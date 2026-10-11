import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets.js';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Upload, Plus, User, Mail, Lock, Award, DollarSign, Stethoscope, MapPin, FileText } from 'lucide-react';

const AddDoct = () => {
  const [docImg, setdocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fee, setFee] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backEndUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) return toast.error('Image required');
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fee', Number(fee));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backEndUrl + '/api/admin/add-doctor', formData, { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {
        toast.success(data.message);
        setdocImg(false); setName(''); setPassword(''); setEmail(''); setAddress2(''); setDegree(''); setFee(''); setAbout(''); setAddress1('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="mb-6">
        <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Administration</span>
        <h1 className="t-h2 text-[var(--ink)]">Add Doctor Profile</h1>
      </div>

      <form onSubmit={onSubmitHandler} className="panel max-w-4xl">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[var(--rule)]">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-[var(--ink)] bg-[var(--bone)] flex items-center justify-center transition-all group-hover:border-[var(--moss)]">
              {docImg ? <img className="w-full h-full object-cover" src={URL.createObjectURL(docImg)} alt="" /> : <Upload size={24} className="text-[var(--mist)]" />}
            </div>
          </label>
          <input onChange={(e) => setdocImg(e.target.files[0])} type="file" accept="image/*" id="doc-img" className="sr-only" />
          <div>
            <p className="font-semibold text-[var(--ink)]">Doctor Profile Photo</p>
            <p className="muted text-xs mt-0.5">{docImg ? 'Photo attached' : 'Upload professional photo'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="field">
            <label htmlFor="adddoct2" className="label flex items-center gap-1.5"><User size={14} /> Name</label>
            <input id="adddoct2" onChange={(e) => setName(e.target.value)} value={name} className="input" type="text" placeholder="Dr. Jane Doe" required />
          </div>
          <div className="field">
            <label htmlFor="adddoct3" className="label flex items-center gap-1.5"><Mail size={14} /> Email</label>
            <input id="adddoct3" onChange={(e) => setEmail(e.target.value)} value={email} className="input" type="email" placeholder="jane@doccure.com" required />
          </div>
          <div className="field">
            <label htmlFor="adddoct4" className="label flex items-center gap-1.5"><Lock size={14} /> Password</label>
            <input id="adddoct4" onChange={(e) => setPassword(e.target.value)} value={password} className="input" type="password" placeholder="••••••••" required />
          </div>
          <div className="field">
            <label htmlFor="adddoct5" className="label flex items-center gap-1.5"><Award size={14} /> Experience</label>
            <select id="adddoct5" onChange={(e) => setExperience(e.target.value)} value={experience} className="select">
              {[...Array(10)].map((_, i) => <option key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="adddoct6" className="label flex items-center gap-1.5"><DollarSign size={14} /> Fee</label>
            <input id="adddoct6" onChange={(e) => setFee(e.target.value)} value={fee} className="input" min="0" type="number" placeholder="50" required />
          </div>
          <div className="field">
            <label htmlFor="adddoct7" className="label flex items-center gap-1.5"><Stethoscope size={14} /> Speciality</label>
            <select id="adddoct7" onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="select">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gasteroenterologist">Gasteroenterologist</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="adddoct8" className="label flex items-center gap-1.5"><FileText size={14} /> Degree</label>
            <input id="adddoct8" onChange={(e) => setDegree(e.target.value)} value={degree} className="input" type="text" placeholder="MBBS, MD" required />
          </div>
          <div className="field">
            <label htmlFor="adddoct9" className="label flex items-center gap-1.5"><MapPin size={14} /> Address</label>
            <input id="adddoct9" onChange={(e) => setAddress1(e.target.value)} value={address1} className="input mb-2" type="text" placeholder="Address Line 1" required />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} aria-label="Address Line 2" className="input" type="text" placeholder="Address Line 2" required />
          </div>
        </div>

        <div className="field mt-5">
          <label htmlFor="adddoct10" className="label">About Doctor</label>
          <textarea id="adddoct10" onChange={(e) => setAbout(e.target.value)} value={about} className="textarea" placeholder="Biography and qualifications..." rows={4} required />
        </div>

        <div className="mt-6 pt-5 border-t border-[var(--rule)] flex justify-end">
          <button type="submit" className="btn btn-solid">
            <span>Register Doctor</span>
            <Plus size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoct;