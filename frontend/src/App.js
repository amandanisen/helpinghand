import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/homepage/homepage.js'
import VolunteerPage from './components/volunteertaskspage/volunteertasks.js'
import AccessCodePage from './components/accesscodepage/acesscodepage.js';
import VolunteerLogin from './components/login/volunteerLogin';
import CoordinatorPage from './components/coordinatorpage/coordinatorpage.js'
import EventRegistrationForm from './components/eventRegistration/eventRegistration.js'
import EventConfirmation from './components/eventconfirmation/eventconfirmation.js'
import AdminLink from './components/links/adminLink.js'
import { makeStyles } from '@material-ui/core/styles';
import FindTaskPage from "./components/tasknearpage/tasknearpage.js"
import TaskRegistration from "./components/taskform/taskform.js"
import CreateVolunteer from "./components/createVolunteer/createVolunteer.js"
import CreateCoordinator from "./components/createCoordinator/createCoordinator.js"
import VerifyVol from "./components/verify/verifyVol.js";
import Forgot from "./components/forgotpassword/forgot";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
            {/* <EventConfirmation /> */}
            {/* <VolunteerPage /> */}
          </Route>
          <Route path="/accesscode">
            <VolunteerLogin/>
            {/* <AccessCodePage /> */}
          </Route>
          <Route path="/forgot">
            <Forgot/>
          </Route>
          <Route path="/findtask">
            <FindTaskPage />
          </Route>
          <Route path="/vol/verify/">
            <VerifyVol />
          </Route>
          <Route path="/createCoordinator">
            <CreateCoordinator />
          </Route>
          <Route path="/createVolunteer">
            <CreateVolunteer />
          </Route>
          <Route path="/event">
            <EventRegistrationForm />
          </Route>
          <Route path="/eventConfirmation">
            <EventConfirmation />
          </Route>
          <Route path="/taskRegistration">
            <TaskRegistration />
          </Route>
          <Route path="/volunteer">
            <VolunteerPage />
          </Route>
          <Route path="/coordinatorPage">
            <CoordinatorPage />
          </Route>
          <Route path="/coordinatorPage">
            <CoordinatorPage />
          </Route>
          <Route path="/coordinatorPage">
            <CoordinatorPage />
          </Route>
          <Route path="/findTaskPage">
            <FindTaskPage />
          </Route>
        </Switch>
      </Router >
    </div>

  );
}

export default App;
