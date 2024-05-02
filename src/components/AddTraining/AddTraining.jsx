import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, duration } from '@mui/material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Customer from '../../pages/Customer';

const AddTraining = ({addTrainer}) => {
    const [open, setOpen] = useState(false)
    const customers = useSelector((state) => state.customers)
    const [newTraining, setNewTraining] = useState({
        date: null,
        time: "",
        duration: "",
        activity: "",
        customer: ""
    })

    const handleSubmit = async () => {
       addTrainer(newTraining)
       setOpen(false)

    }


   
    const handleChange = (e) => {
        const { name, value } = e.target;
        let customerLink = null;
        if (name === "customer") {
            customerLink = customers.find(customer => `${customer.firstname} ${customer.lastname}` === value);
            
            if (customerLink) {
                
                setNewTraining(prev => ({ ...prev, [name]: customerLink._links.self.href }));
            }
        } else {
            setNewTraining(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Button variant="contained" style={{ marginBottom: "20px", backgroundColor: "#FFC470" }} onClick={handleClickOpen} >
                Add Trainer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Trainer Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="date"
                        name="date"

                        value={newTraining.date}
                        onChange={handleChange}
                        type="date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="time"
                        name="time"

                        value={newTraining.time}
                        onChange={handleChange}
                        type="time"
                        fullWidth
                        variant="standard"

                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="duration"
                        name="duration"
                        label="duration"
                        value={newTraining.duration}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={newTraining.activity}
                        onChange={handleChange}
                        margin="dense"
                        id="activity"
                        name="activity"
                        label="activity"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required

                        onChange={handleChange}
                        select
                        margin="dense"
                        id="customer"
                        name="customer"
                        label="customer"
                        type="Select"
                        fullWidth
                        variant="standard"
                        helperText="Please select the customer"
                    >
                        {
                            customers.map((customer) => (
                                <MenuItem key={`${customer.firstname} ${customer.lastname}`} value={`${customer.firstname} ${customer.lastname}`} >
                                    {customer.firstname + " " + customer.lastname}
                                </MenuItem>
                            ))
                        }
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} >Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining
