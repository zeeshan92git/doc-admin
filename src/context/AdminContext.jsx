import React from "react";
import { createContext, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setaToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctors,setdoctors] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [dashData,setdashData] = useState(false);
    console.log('Token received from local storage in admincontext.jsx....', aToken);

    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const updateToken = (newToken) => {
        setaToken(newToken);
        localStorage.setItem('aToken', newToken);
        console.log('aToken updated in context:', newToken); 
    };

    const getAllDoctors = async()=>{
        try{
            const {data} = await axios.post(backEndUrl + '/api/admin/all-doctors',{},{
                headers: { Authorization: `Bearer ${aToken}` }
              });
            if(data.success){
                setdoctors(data.data);
                console.log(data.data);
            }else{
                console.log(data.message);
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error.message);
            toast.error(error.message);
        }
    }  

    const changeAvailability = async(docId) =>{
        try{
            const {data} = await axios.post(backEndUrl + '/api/admin/change-availability', {docId} , {
                headers: { Authorization: `Bearer ${aToken}` }
            });
            if(data.success)
            {
                toast.success(data.message);
                getAllDoctors();
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async (req,res) => {
        try{
            const {data} = await axios.post(backEndUrl + '/api/admin/appointments' ,{}, {headers: { Authorization: `Bearer ${aToken}` }});
            if(data.success){
                setAppointments(data.data);
                console.log(data.data);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try{
            const {data} = await axios.post(backEndUrl + '/api/admin/appointment-cancel' ,{appointmentId}, {headers: { Authorization: `Bearer ${aToken}` }});
            if(data.success){
               toast.success(data.message);
               getAllAppointments();
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    };

    const getDashData = async ()=>{
        try{
            
            const {data} = await axios.post(backEndUrl + '/api/admin/dashboard' , {} ,{headers : { Authorization: `Bearer ${aToken}` }})
            if(data.success){
                toast.success(data.messsage);
                setdashData(data.data);
                console.log(data);
            }
            else{
                toast.error(data.message);
            }
        }catch(error)
        {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,
        backEndUrl ,  setaToken: updateToken
        ,doctors , getAllDoctors , changeAvailability
        ,appointments , setAppointments , getAllAppointments , cancelAppointment , dashData , getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider;

