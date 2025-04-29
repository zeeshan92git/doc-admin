import React from "react";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setdToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [dashData, setdashData] = useState({
        latestAppointments: [],
        earning: 0,
        appointments: 0,
        patient: 0,
    });
    console.log("backendURL : ", backendURL);
    console.log("dToken on DocContext: ", dToken);

    const getAppointments = async () => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/appointment', {}, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                toast.success(data.message);
                setAppointments(data.data);
                console.log(data.data);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const cancelAppointments = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/appointment-cancel', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const completeAppointments = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/appointment-done', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getDashData = async () => {
        try {

            const { data } = await axios.post(backendURL + '/api/doctor/dashboard', {}, { headers: { Authorization: `Bearer ${dToken}` } })
            if (data.success) {
                toast.success(data.messsage);
                setdashData(data.data);
                console.log("dasd data at docContext", data);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getProfileData = async (docId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/profile', {docId}, { headers: { Authorization: `Bearer ${dToken}` } })
            if (data.success) {
                toast.success(data.messsage);
                setProfileData(data.data);
                console.log("Doc Profile data at docContext", data);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        dToken, setdToken, backendURL,
        appointments, setAppointments, getAppointments,
        completeAppointments, cancelAppointments,
        getDashData, dashData, setdashData,
        getProfileData , profileData, setProfileData
    }

    return (
        <DoctorContext value={value}>
            {props.children}
        </DoctorContext>
    )
};

export default DoctorContextProvider;

