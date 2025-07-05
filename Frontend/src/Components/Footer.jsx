




const Footer=()=>{



    return(
        <>
         <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Resumi. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#home" className="hover:text-teal-300 transition-colors duration-300">Home</a>
              <a href="#features" className="hover:text-teal-300 transition-colors duration-300">Features</a>
              <a href="#about" className="hover:text-teal-300 transition-colors duration-300">About</a>
              <a href="#contact" className="hover:text-teal-300 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
        </>
    )
}

export default Footer;