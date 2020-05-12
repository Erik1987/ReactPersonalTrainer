import React, { useState, useEffect } from 'react';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ReactTable from 'react-table-v6';
import Customerlist from './Customerlist'


export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
      }, [])
      

     
      const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))               
      }
      

      const updateTraining = (link, training) => {
        fetch(link, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(training)
        })
        .then(_ => getTrainings())
        .then(_ => {
          setMsg('Training updated');
          setOpen(true);
        })
        .catch(err => console.error(err))  
      }
      const deleteTraining = (link, id) => {
        if (window.confirm('Are you sure?')) {
          fetch(link +id,  {method: 'DELETE'})
          .then(_ => getTrainings())
          .then(_ => {
            
            setMsg('Training deleted');
            setOpen(true);
          })
          .catch(err => console.error(err))
          
        }
      }
      const handleClose = () => {
        setOpen(false);
      }
      const columns = [
        {
          Header: 'Date',
          accessor: 'date'
        },
        {
          Header: 'Duration',
          accessor: 'duration'
        },    
        {
          Header: 'Activity',
          accessor: 'activity'
        }, 
        {
          Header: 'Firstname',
          accessor: 'customer.firstname'
        },
        {
          Header: 'Lastname',
          accessor: 'customer.lastname'
        },     
        {
          Header: 'Customer ID',
          accessor: 'customer.id'
        }, 
        {
          Header: 'Training ID',
          accessor: 'id'
        }, 
        {
          accessor: 'https://customerrest.herokuapp.com/api/trainings/',
          filterable: false,
          sortable: false,
          minWidth: 50,
          Cell: row => (<Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>)
        }
      ]
    return (
        <div>
          
            <ReactTable filterable={true} defaultPageSize={10} 
        data={trainings} columns={columns} />
        <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
           
        </div>
    )
}