 
 import { motion } from 'framer-motion';
 import Title from '../ResumeTitle'
 
 const Hero = () => (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration:1 }}
        className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white"
      >
        <div className="text-center">
           <motion.h1
      className="text-4xl sm:text-6xl font-extrabold mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Find Your Perfect Candidate with{" "}
      <Title target="Resumi" />
    </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Hire top talent pre-vetted through rigorous technical interviews.
          </motion.p>
          <motion.a 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            href="#" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Explore Candidates
          </motion.a>
        </div>
      </motion.section>
    );

    export default Hero;
