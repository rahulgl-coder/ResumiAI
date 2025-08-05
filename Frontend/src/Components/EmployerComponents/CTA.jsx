import { motion } from 'framer-motion';
 
 
 
 const CTA = () => (
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-16 flex items-center justify-center bg-gradient-to-b from-blue-100 to-white"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
  <div className="flex-1 p-4">
    <motion.h2 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold mb-4"
    >
      Ready to Hire Your Next Champ?
    </motion.h2>
    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-lg mb-8"
    >
      Join Resumi today and discover top talent effortlessly.
    </motion.p>
    <motion.a 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      href="#" 
      className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition"
    >
      Get Started
    </motion.a>
  </div>

  <div className="flex-1 p-4 ">
    <img 
      src="https://i.pinimg.com/1200x/3e/28/97/3e2897cd9215be43f51c912e8cf902a8.jpg" 
      alt="Hiring" 
      className="w-full object-cover rounded-xl"
    />
  </div>
</div>

      </motion.section>
    );
export default CTA;