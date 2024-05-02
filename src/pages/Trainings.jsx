import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { AgGridReact } from 'ag-grid-react'
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainer } from '../State/State';
import { Button, Snackbar } from '@mui/material';
import AddTraining from '../components/AddTraining/AddTraining';
const Trainings = () => {
 
  const dispatch = useDispatch()
  const training = useSelector((state) => state.trainings)
  const [openSnackbar,setOpenSnackbar] = useState(false)
  const [openSnackMessage,setOpenSnackMessage] = useState("")


  
  /* Getting the data from the API */
  const fetchData = async () => {
    try {
      const trainingTime = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings");
      const data = await trainingTime.json();
  
      // Fetch customer data for each training and map it to a new array of promises
      const customerPromises = data._embedded.trainings.map(async (training) => {
        const customerResponse = await fetch(training._links.customer.href);
        const customerData = await customerResponse.json();
        return `${customerData.firstname} ${customerData.lastname}`;
      });
  
      // Wait for all customer data promises to resolve
      const customerNames = await Promise.all(customerPromises);
  
      // Format training data with customer names
      const formattedTrainings = data._embedded.trainings.map((training, index) => ({
        date: dayjs(training.date).format("DD/MM/YYYY"),
        time: dayjs(training.time).format("HH:MM"),
        customer: customerNames[index],
        duration: training.duration,
        activity: training.activity,
        _links: training._links
      }));
  
      // Set the formatted training data to the state 
      dispatch(setTrainer({trainings: formattedTrainings}))
    } catch (error) {

      console.error("Error fetching data:", error);
    }
  };

  const addTrainer = (newTraining) => {
    const updatedTrainer = {
      date: new Date(`${newTraining.date}T${newTraining.time}`).toISOString(),
      duration: newTraining.duration,
      customer: newTraining.customer,
      activity: newTraining.activity
  }
  fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",

      {
          method: "post",
          body: JSON.stringify(updatedTrainer),
          headers: { 'Content-Type': 'application/json' }
      }).then(response => {
          
          setOpenSnackMessage("Successfully added the trainer ")
          setOpenSnackbar(true)
          fetchData()
      }).catch(err => {
        
        setOpenSnackMessage("Error: " + err.message)
        setOpenSnackbar(true)
      })
  }

  /* opening the data for the snackbar */
  const handleCloseSnackbar = () => {
    openSnackbar(false) ;
  }
  const deleteTraining = (params) => {
    console.log(params)
   if(window.confirm("Are you sure ?")){
    fetch(params,{method: "delete", headers: { 'Content-Type': 'application/json' }}).then((response) => {
      console.log(response)
      if (response.ok){
        setOpenSnackbar(true)
        setOpenSnackMessage("Successfully deleted the training schedule.");
        fetchData()
      }else{
        setOpenSnackbar(true)
        setOpenSnackMessage("Failed to deleted the training schedule.");
        console.log("Failed to delete the training schedule")
      }
    }).catch(error => {
      console.error("Failed to get the server",error)
    })
   }
  }
  



  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);
  const columns = [
    { field: "date", filter: true, cellStyle: { textAlign: 'center' }, width: 400 },
    { field: "time", filter: true, cellStyle: { textAlign: 'center' }, width: 250 },
    { field: "duration", filter: true, cellStyle: { textAlign: 'center' }, width: 250 },
    { field: "activity", filter: true, cellStyle: { textAlign: 'center' }, width: 250 },
    { field: "customer", filter: true, cellStyle: { textAlign: 'center' }, width: 250 },
    {
      headerName: "Delete",
      cellRenderer: (params) => <Button variant='outlined' color="error" size='small' onClick={() => deleteTraining(params.data._links.training.href)}  >Delete</Button>,
      width: 200,
      cellStyle: { textAlign: 'center' }
    }
  ]


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='container-ag' style={{ width: "100%", height: "100%" }}>
      <Navbar />
      
      <div className={"ag-theme-quartz-dark"} style={{ height: "100%", width: "100%", textAlign: "center" }}>
      <AddTraining addTrainer={addTrainer}   />
        <AgGridReact

          rowData={training}
          columnDefs={columns}

          domLayout={"autoHeight"}
          pagination={true}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}

        />

        <Snackbar
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={openSnackMessage}
         />
      </div>
    </div>
  )
}

export default Trainings
