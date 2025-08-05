
 
 
import { motion } from 'framer-motion';
 
 const Features = () => (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-blue-600 mb-12"
          >
            Why Choose Resumi?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pre-Vetted Talent", desc: "Candidates pass rigorous technical interviews to ensure quality." },
              { title: "Skill-Based Matching", desc: "Find candidates tailored to your specific requirements." },
              { title: "Seamless Hiring", desc: "Streamlined process to connect you with top champs." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );



    export default Features;