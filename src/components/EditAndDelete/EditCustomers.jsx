import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetEditCustomer } from '../../State/State';

const EditCustomers = ({ customer,editRow }) => {
    const dispatch = useDispatch()
    const [editCustomer, setEditCustomer] = useState({
        firstname: customer.firstname,
        lastname: customer.lastname,
        city: customer.city,
        phone: customer.phone,
        email: customer.email,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode
    })
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {
        const {name,value} = e.target 
        setEditCustomer(prevDetails => ({
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
        
        
        editRow(customer._links.self.href,editCustomer)
    }
    


    return (
        <div>
            <Button variant='outlined' color='success' size='small' onClick={handleClickOpen} >
                EDIT
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Customer Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="firstname"
                        onChange={handleChange}
                        value={editCustomer.firstname}
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
                        value={editCustomer.lastname}
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={editCustomer.city}
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
                        value={editCustomer.email}
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
                        value={editCustomer.phone}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        value={editCustomer.streetaddress}
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
                        value={editCustomer.postcode}
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
                    <Button onClick={handleSubmit}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomers
