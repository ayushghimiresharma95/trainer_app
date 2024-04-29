import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { AgGridReact } from 'ag-grid-react'
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from 'dayjs';
const Trainings = () => {
  const [training, setTrainings] = useState([])

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
        activity: training.activity
      }));
  
      // Set the formatted training data to the state
      setTrainings(formattedTrainings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  ]


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='container-ag' style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <div className={"ag-theme-quartz-dark"} style={{ height: "100%", width: "100%", textAlign: "center" }}>
        <AgGridReact

          rowData={training}
          columnDefs={columns}

          domLayout={"autoHeight"}
          pagination={true}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}

        />


      </div>
    </div>
  )
}

export default Trainings
