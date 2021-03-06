import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Addtraining from './Addtraining';
import Editcar from './Editcar';


export default function Customerlist() {
  const [cars, setCars] = useState([]);
 // const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    getCars();
    getTrainings();
  }, [])

  const getCars = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCars(data.content))
    
    .catch(err => console.error(err))    
  }
  /*const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data[0]))
    .catch(err => console.error(err))
   
  } */
  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => getCars())
      .then(_ => {
        setMsg('Car deleted');
        setOpen(true);
      })
      .catch(err => console.error(err))
    }
  }
  const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(training)
      }
    )  
    .then(_ => getTrainings())
    .then(_ => {
     
      console.log(training);
      setMsg('New training added');
      setOpen(true);
    })
    .catch(err => console.error(err)) 
    
  }
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))               
  }
  
  const addCar = (car) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(car)
      }
    )  
    .then(_ => getCars())
    .then(_ => {
      setMsg('New customer added');
      setOpen(true);
    })
    .catch(err => console.error(err)) 
    console.log(car); 
  }
 /* const addTraining = (link, car) => {
    fetch('"https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(car)
      }
    )  
    .then(_ => getCars())
    .then(_ => {
      setMsg('New customer added');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }*/

  const updateCar = (link, car) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(_ => getCars())
    .then(_ => {
      setMsg('Customer updated');
      setOpen(true);
    })
    .catch(err => console.error(err))
     
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    {
      Header: 'Firstname',
      accessor: 'firstname'
    },
    {
      Header: 'Lastname',
      accessor: 'lastname'
    },    
    {
      Header: 'Streetaddress',
      accessor: 'streetaddress'
    }, 
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },    
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
   
    {
      Cell: row => (<Editcar car={row.original} updateCar={updateCar} />)
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      minWidth: 60,
      Cell: row => (<Button color="secondary" size="small" onClick={() => deleteCar(row.value)}>Delete</Button>)
    }
  ]

  return(
    <div>
      <Addcar addCar={addCar}/>
      <Addtraining addTraining={addTraining}/>
      <ReactTable filterable={true} defaultPageSize={10} 
        data={cars} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}