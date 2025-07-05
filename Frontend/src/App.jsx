import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


import Home from './Layouts/Home'
import SignInModal from './Components/Signup';

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInModal/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App
