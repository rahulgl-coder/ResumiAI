import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Contact from "../Components/Contact";
import About from "../Components/About";
import Footer from "../Components/Footer";
import { useSelector } from 'react-redux';



const Home=()=>{

    const { user, token } = useSelector((state) => state.user);

    if(user){
        console.log(user);
        }



return(
    <>
<div className="font-poppins bg-gray-50">
     <Navbar/>
     <Hero/>
     <Features/>
     <About/>
     <Contact/>
     <Footer/>
</div>
    </>
)
}

export default Home;