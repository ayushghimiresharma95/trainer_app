import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { AgGridReact } from 'ag-grid-react';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, GridReadyEvent, ModuleRegistry } from '@ag-grid-community/core';
import { AppBar } from '@mui/material';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomers } from '../State/State';


const Customer = () => {

  const customers = useSelector((state) => state.customers)
  const dispatch = useDispatch()
  
  

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);
  
  const fetchData = async () => {
    const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
      method: 'GET', headers: {
        "Content-Type": "application/json",

      }
    })
    const data = await response.json()
    dispatch(setCustomers({customers:data._embedded.customers}))

   


  }
  useEffect(() => {
    fetchData()

  }, [])
  

  const columns = [
    { field: "firstname", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "lastname", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "city", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "streetaddress", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "email", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "postcode", filter: true, cellStyle: { textAlign: 'center' } },
    { field: "phone", filter: true, cellStyle: { textAlign: 'center' } },


  ]


  return (


    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <div className={"ag-theme-quartz-dark"} style={{ height: "100%", width: "100%", textAlign: "center" }}>





        <AgGridReact
          
          rowData={customers}
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

export default Customer
