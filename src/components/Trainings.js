import React, { useState, useEffect } from 'react';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ReactTable from 'react-table-v6';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
      }, [])
      
      const addTraining = (link, training) => {
        fetch('"https://customerrest.herokuapp.com/api/trainings',
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
          setMsg('New training added');
          setOpen(true);
        })
        .catch(err => console.error(err))  
      }
      
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', 
        )
        .then(response => response.json())
        //console.log(trainings)
        .then(data => {console.log(data). setTrainings(data)})
        
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
      const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
          fetch(link, {method: 'DELETE'})
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
          Header: 'Customer',
          accessor: 'customer'
        },    
        
        {
          Cell: row => (<Edittraining training={row.original} updateTraining={updateTraining} />)
        },
        {
          accessor: 'links[2].href',
          filterable: false,
          sortable: false,
          minWidth: 60,
          Cell: row => (<Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>)
        }
      ]
    return (
        <div>
            <Addtraining addTraining={addTraining}/>
            <ReactTable filterable={true} defaultPageSize={10} 
        data={trainings} columns={columns} />
        <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
            <h1>This is Trainings page</h1>
        </div>
    )
}