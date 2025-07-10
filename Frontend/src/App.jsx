import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';


import Home from './Layouts/Home'
import SignInModal from './Components/Signup';

function App() {


  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
     
      </Routes>
    </Router>

    </>
  )
}

export default App
