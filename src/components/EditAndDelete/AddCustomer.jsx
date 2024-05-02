import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetaddCustomer } from '../../State/State';

const AddCustomers = ({addCustomers}) => {
    const dispatch = useDispatch()
    const [addCustomer, setaddCustomer] = useState({
        firstname: "",
        lastname: "",
        city: "",
        phone: "",
        email: "",
        streetaddress: "",
        postcode: ""
    })
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {
        const {name,value} = e.target 
        setaddCustomer(prevDetails => ({
            ...prevDetails,
            [name] : value
        }))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        
        addCustomers(addCustomer)
        setOpen(false)
        
    }
    


    return (
        <div>
            <Button variant="contained" style={{ marginBottom:"20px",backgroundColor:"#FFC470"}}  onClick={handleClickOpen} >
                Add Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>AddCustomer Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="firstname"
                        onChange={handleChange}
                        value={addCustomer.firstname}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        label="lastname"
                        value={addCustomer.lastname}
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={addCustomer.city}
                        onChange={handleChange}
                        margin="dense"
                        id="city"
                        name="city"
                        label="city"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={addCustomer.email}
                        onChange={handleChange}
                        margin="dense"
                        id="email"
                        name="email"
                        label="email"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        label="phone"
                        value={addCustomer.phone}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        value={addCustomer.streetaddress}
                        id="streetaddress"
                        name="streetaddress"
                        label="streetaddress"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        value={addCustomer.postcode}
                        id="postcode"
                        name="postcode"
                        label="postcode"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCustomers
