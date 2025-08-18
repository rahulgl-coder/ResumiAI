import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Contact from "../Components/Contact";
import About from "../Components/About";
import Footer from "../Components/Footer";
import CounterHero from '../Components/CounterHero'
import { useSelector,useDispatch  } from 'react-redux';
import { useEffect } from "react";
import { clearUser } from '../Redux/userSlice';





const Home=()=>{    

 const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.role === 'employer') {
      dispatch(clearUser());  

 
    }
  }, []);

return(
    <>
<div className="font-poppins bg-gray-50">
     <Navbar/>
     <Hero/>
     <CounterHero/>
     <Features/>
     <About/>
     <Contact/>
     <Footer/>
</div>
    </>
)
}

export default Home;