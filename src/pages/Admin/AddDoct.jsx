import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets.js';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

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
      if (!docImg) {
        return toast.error('Image required')
      }
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

      //log data
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      })

      const { data } = await axios.post(backEndUrl + '/api/admin/add-doctor', formData, { headers: { Authorization: `Bearer ${aToken}` }});
      console.log(data);
      if(data.success){
        toast.success(data.message);
        setdocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress2('');
        setDegree('');
        setFee('');
        setAbout('');
        setAddress1('');
      }else{
        toast.error(data.message);
      }
    }
    catch (error) {
      console.error(error);
      toast.error("An error occured.")
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='w-full m-5'>
      <p className='mb-3 font-medium text-lg'>Add Doctors</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setdocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          {docImg ? <p>Image Uploaded<br />Successfully!</p>: <p>Upload Doctor <br />Image!</p>}
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border  rounded px-3 py-2' type="text" placeholder='Enter Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Enter Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Enter Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Fee</p>
              <input onChange={(e) => setFee(e.target.value)} value={fee} className='border rounded px-3 py-2' type="numbaer" placeholder='Fee' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4 '>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gasteroenterologist">Gasteroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Degree Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-black font-semibold'>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>

          </div>
        </div>

        <div>

        </div>

        <div>
          <p className='mt-4 mb-2 text-black font-semibold'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded text-gray-500 ' placeholder='Write About Doctor' rows={5} required />
        </div>


        <button type='submit' className='bg-blue-600 px-10 py-3 mt-4 text-lg  text-white rounded-full cursor-pointer hover:bg-blue-700 hover:font-semibold transition-all duration-300 '>Add Doctor</button>
      </div>

    </form>

  )
}

export default AddDoct; 