import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';
import InterviewIntro from './Pages/InterviewIntro';
import Interview from './Pages/InterviewPage';
import ChatComponent from './Pages/ChatContainer';
import AdminPanel from './Pages/AdiminPage';
import Profile from './Pages/Profile';
import VerifyEmailPage from './Pages/VerifyEmailPage';

import Home from './Layouts/Home'
import ProtectedRoute from './Components/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import { persistor } from './Redux/store'; 
import { useEffect } from 'react';

function App() {



  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <Router>
 <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/verify-email' element={<VerifyEmailPage/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />

    <Route element={<ProtectedRoute allowedRoles={['user']} />}> 
        <Route path="/interview-intro" element={<InterviewIntro/>}/>
        <Route path="/interview" element={<Interview/>}/>
        <Route path="/chat" element={<ChatComponent/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>    

    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path='/admin'element={<AdminPanel/>}/>
      </Route>


 </Routes>
    </Router>

    </>
  )
}

export default App


