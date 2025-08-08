import Navbar from "../../Components/EmployerComponents/Navbar"
import Hero from "../../Components/EmployerComponents/Hero"
import Features from "../../Components/EmployerComponents/Features"
import CTA from "../../Components/EmployerComponents/CTA"
import Footer from "../../Components/EmployerComponents/Footer"
import {useState} from "react"
import EmployerRegisterModal from "../../Components/EmployerComponents/EmployerRegistrationModal"


const Home=()=>{
  const [isOpen, setOpen]=useState(true)

    return(

    <div>
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Footer />
        <EmployerRegisterModal isOpen={isOpen}  onClose={()=>setOpen(false)}/>
      </div>
)

}

export default Home;