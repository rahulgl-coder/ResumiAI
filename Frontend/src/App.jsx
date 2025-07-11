import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';


import Home from './Layouts/Home'
import ResultForm from './Components/Resumeform';

function App() {


  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/resume_result" element={<ResultForm />} />
     
      </Routes>
    </Router>

    </>
  )
}

export default App
