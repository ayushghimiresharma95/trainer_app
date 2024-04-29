
import './App.css';
import { Switch } from '@mui/material';
import { Route, Routes } from 'react-router';
import Customer from './pages/Customer';
import Profile from './pages/Profile';
import Trainings from './pages/Trainings';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/customer' element={<Customer/>} />
        <Route path='/profile' element={ <Profile/>} />
        <Route path="/training" element={<Trainings/>} />
      </Routes>
    </>
      
   
  );
}

export default App;
