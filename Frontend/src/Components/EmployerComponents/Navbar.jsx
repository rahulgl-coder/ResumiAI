import { motion } from 'framer-motion';

import React, { useState } from 'react';
import Navbar from '../Navbar';
  

    const Nav = () =>{
 const [modalOpen, setModalOpen] = useState(false);


  return(
    <>
       <Navbar type="employer" />
          </>
    );

    
  } 
    export default Nav