import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './Layouts/Home'
import InterviewIntro from './Pages/InterviewIntro';
import Interview from './Pages/InterviewPage';
import ChatComponent from './Pages/ChatContainer';
import Profile from './Pages/Profile';
import VerifyEmailPage from './Pages/VerifyEmailPage';

import ManageSkillPage from './Pages/AdminPage/ManageSylubus';

import EmployerHome from './Pages/EmployerPages/Home'
import CandidatesPage from './Pages/EmployerPages/CandidatesPage';


import ProtectedRoute from './Components/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import { Toaster } from 'react-hot-toast';

function App() {



  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <Router>
 <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/verify-email' element={<VerifyEmailPage/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/employer'element={<EmployerHome/>}/>

    <Route element={<ProtectedRoute allowedRoles={['user']} redirectTo="/" role="user" />}> 
        <Route path="/interview-intro" element={<InterviewIntro/>}/>
        <Route path="/interview" element={<Interview/>}/>
        <Route path="/chat" element={<ChatComponent/>}/>
      </Route>    
{/*        
        : {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }, */}

    <Route element={<ProtectedRoute allowedRoles={['user','employer']} />}> 
        <Route path="/profile" element={<Profile/>}/>
      </Route> 

    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path='/admin'element={<ManageSkillPage/>}/>
      </Route>
    
    
    <Route element={<ProtectedRoute allowedRoles={['employer','admin']} redirectTo="/employer" role="employer" />}> 
        <Route path='/candidates'element={<CandidatesPage/>}/>
    </Route>
        
 </Routes>
    </Router>

    </>
  )
}

export default App


