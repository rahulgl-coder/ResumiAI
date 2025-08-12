//   import Navbar from "../../Components/EmployerComponents/Navbar"
//   import Hero from "../../Components/EmployerComponents/Hero"
//   import Features from "../../Components/EmployerComponents/Features"
//   import CTA from "../../Components/EmployerComponents/CTA"
//   import Footer from "../../Components/EmployerComponents/Footer"
//   import {useState,useEffect} from "react"
//   import EmployerRegisterModal from "../../Components/EmployerComponents/EmployerRegistrationModal"
//   import { useSelector } from 'react-redux';
//   import axios from 'axios'

//   const Home=()=>{
//     const [isOpen, setOpen]=useState(false)
//     const BASEURL=import.meta.env.VITE_BASEURL
//     const { token } = useSelector((state) => state.user);


//  useEffect(() => {
//     let intervalId;

//     const checkRegistration = async () => {
//       try {
//         const res = await axios.get(`${BASEURL}/employer/check-registration`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.status === false) {
//           // Open modal immediately
//           setOpen(true);

//           //
//           intervalId = setInterval(() => {
//             setOpen(true); 
//           }, 15 * 60 * 1000);
//         }
//       } catch (error) {
//         console.error(error.response?.data || error.message);
//       }
//     };

//     if (token) {
//       checkRegistration();
//     }

//   })
//       return(

//       <div>
//           <Navbar />
//           <Hero />
//           <Features />
//           <CTA />
//           <Footer />
//           <EmployerRegisterModal isOpen={isOpen}  onClose={()=>setOpen(false)}/>
//         </div>
//   )

//   }

//   export default Home;

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../Components/EmployerComponents/Navbar";
import Hero from "../../Components/EmployerComponents/Hero";
import Features from "../../Components/EmployerComponents/Features";
import CTA from "../../Components/EmployerComponents/CTA";
import Footer from "../../Components/EmployerComponents/Footer";
import EmployerRegisterModal from "../../Components/EmployerComponents/EmployerRegistrationModal";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const BASEURL = import.meta.env.VITE_BASEURL;
  const { token } = useSelector((state) => state.user);
  const intervalRef = useRef(null);

const startReminder = () => {
  if (!intervalRef.current) {
    intervalRef.current = setInterval(() => {
      setOpen(prev => {
        if (!prev) { 
          return true;
        }
        return prev;
      });
    }, 15 * 60 * 1000);
  }
};


  const stopReminder = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const checkRegistration = async () => {
    try {
      const res = await axios.get(`${BASEURL}/employer/check-registration`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status === false) {
        setOpen(true);
        startReminder();
      } else {
        stopReminder(); 
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      checkRegistration();
    }
    return () => stopReminder();
  }, [token]);

  const handleRegistrationSuccess = () => {
    stopReminder();
    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
      <EmployerRegisterModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onRegisterSuccess={handleRegistrationSuccess} 
      />
    </div>
  );
};

export default Home;
