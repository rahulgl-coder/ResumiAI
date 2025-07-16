import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';
import InterviewIntro from './Pages/InterviewIntro';
import Interview from './Pages/InterviewPage';
import ChatComponent from './Pages/ChatContainer';

import Home from './Layouts/Home'


function App() {


  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview-intro" element={<InterviewIntro/>}/>
        <Route path="/interview" element={<Interview/>}/>
      <Route path="/chat" element={<ChatComponent/>}/>
     
      </Routes>
    </Router>

    </>
  )
}

export default App
