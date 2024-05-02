import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { AgGridReact } from 'ag-grid-react';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, GridReadyEvent, ModuleRegistry } from '@ag-grid-community/core';
import { AppBar, Snackbar } from '@mui/material';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setCustomers } from '../State/State';
import EditCustomers from '../components/EditAndDelete/EditCustomers';
import AddCustomers from '../components/EditAndDelete/AddCustomer';


const Customer = () => {

  const customers = useSelector((state) => state.customers)
  const dispatch = useDispatch()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const deleteCustomer = (params) => {
    if (window.confirm("Are You sure want to delete ?")) {
      fetch(params._links.customer.href, { method: "DELETE" }).then(response => {
        if (response.ok) {
          setSnackbarMessage("Successfully deleted the customer")
          fetchData()
        }else {
          console.error('Failed to delete row:', response.statusText);
      }
      })
      .catch(error => console.error('Error deleting row:', error));
    }
  }

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  const editRow = (link, newCustomer) => {

    fetch(link, {
      method: "PUT",
      body: JSON.stringify(newCustomer),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) {
        setSnackbarMessage("Car edited successfully")
        setOpenSnackbar(true);
        fetchData()
      }
    }).catch(error => {
      console.error('Error editing car:', error);
      setSnackbarMessage('Failed to edit car');
      setOpenSnackbar(true);
    });
  }
  const addcustomers = (customer) => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",{
      method: "POST",
      body: JSON.stringify(customer),
      headers: { 'Content-Type': 'application/json' }}).
      then(response => {
        if (response.ok) {
          setSnackbarMessage("Car added successfully")
          setOpenSnackbar(true);
          fetchData()
        }
      }).catch(error => {
        console.error('Error adding car:', error);
        setSnackbarMessage('Failed to add car');
        setOpenSnackbar(true);
      });
  }
  const addRow = (customers) => {
     
  }
  


  const fetchData = async () => {
    const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
      method: 'GET', headers: {
        "Content-Type": "application/json",

      }
    })
    const data = await response.json()
    dispatch(setCustomers({ customers: data._embedded.customers }))
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
    {
      headerName: "Edit",
      cellRenderer: (params) => <EditCustomers color='green' customer={params.data} editRow={editRow} />,
      width: 200,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: "Delete",
      cellRenderer: (params) => <Button variant='outlined' color="error" size='small' onClick={() => deleteCustomer(params.data)}  >Delete</Button>,
      width: 200,
      cellStyle: { textAlign: 'center' }
    }

  ]


  return (


    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <div className={"ag-theme-quartz-dark"} style={{ height: "100%", width: "100%", textAlign: "center" }}>



      <AddCustomers addCustomers={addcustomers}  >Add Customer</AddCustomers>

        <AgGridReact

          rowData={customers}
          columnDefs={columns}

          domLayout={"autoHeight"}
          pagination={true}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}

        />
        <Snackbar open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
    </div>

  )
}

export default Customer
