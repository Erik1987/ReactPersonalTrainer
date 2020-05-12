import React from 'react';
import logo from './logo.svg';
import Customerlist from './components/Customerlist'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Trainings from './components/Trainings'
//Router imports
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {

  return (
    <div className="App">

<AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
           Personal Trainer
          </Typography>
        </Toolbar>
        
      </AppBar>
      <Router>
       <div>
          <Link to="/">Customers</Link>{' '}
          <Link to="/trainings/">Trainings</Link>
        
          <Route exact path="/" component={Customerlist}/>
          <Route path="/trainings" component={Trainings}/>
        </div>
      </Router> 
      
    </div>
  );
}

export default App;
