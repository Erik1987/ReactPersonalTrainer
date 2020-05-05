import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    props.addCar(car);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={car.firstname}
            onChange={inputChanged}
            label="Firstname"
            fullWidth
          />
          <TextField
            margin="dense"
            id="lastname"
            name="lastname"
            value={car.lastname}
            onChange={inputChanged}
            label="Lastname"
            fullWidth
          />
          <TextField
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            value={car.streetaddress}
            onChange={inputChanged}
            label="Streetaddress"
            fullWidth
          />
          <TextField
            margin="dense"
            id="postcode"
            name="postcode"
            value={car.postcode}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            value={car.city}
            onChange={inputChanged}
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            value={car.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={car.phone}
            onChange={inputChanged}
            label="Phone"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>    
    </div>
  )
}