// import { useState } from "react";

// const Signin = () => {
//     const [error,setError]=useState('')
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });


const validate=()=>{

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
     setError("")
    if(!nameRegex.test(form.name)){
      setError("no name")
    }

}




//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...form, [name]: value };
//     setForm(updatedFormData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//    validate()
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               value={form.name}
//               name="name"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
//               placeholder="Enter your name"
//             />
//           </div>
//           {error&&<p>{error}</p>}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={form.email}
//               name="email"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={form.password}
//               name="password"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={form.confirmPassword}
//               name="confirmPassword"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
//               placeholder="Confirm your password"
//             />
//           </div>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signin;
