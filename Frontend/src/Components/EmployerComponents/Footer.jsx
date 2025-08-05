

import { motion } from 'framer-motion';

const Footer = () => (
      <footer className="py-8 bg-gray-800 text-white text-center">
        <div className="container mx-auto">
          <p>&copy; 2025 Resumi. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    );


 export   default Footer;