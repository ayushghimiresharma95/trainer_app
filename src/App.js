
import './App.css';
import { Switch, Typography } from '@mui/material';
import { Route, Routes } from 'react-router';
import Customer from './pages/Customer';
import Profile from './pages/Profile';
import Trainings from './pages/Trainings';
import { BrowserRouter } from 'react-router-dom';
import Calender from './components/Calender/Calender';

function App() {
  

  return (
    <Typography variant='h6' color={'inherit'} component={"div"}>
      <Routes>
        <Route path='/customer' element={<Customer/>} />
        <Route path='/profile' element={ <Profile/>} />
        <Route path="/training" element={<Trainings/>} />
        <Route path='/calender' element={<Calender />} />
      </Routes>
    </Typography>
      
   
  );
}

export default App;
