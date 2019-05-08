import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { ItemsProvider } from './contexts/ItemsContext.jsx';
import { TasksProvider } from './contexts/TasksContext.jsx';
import { EventsProvider } from './contexts/EventsContext.jsx';

import ItemsList from './components/ItemsList.jsx';
import EventsList from './components/EventsList.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>async-resource-updates</Navbar.Brand>
      <Nav>
        <LinkContainer to="/items"><Nav.Link>Items</Nav.Link></LinkContainer>
        <LinkContainer to="/events"><Nav.Link>Events</Nav.Link></LinkContainer>
      </Nav>
    </Container>
  </Navbar>
);

const ItemsPage = () => (
  <ItemsProvider>
    <TasksProvider>
      <Container>
        <ItemsList />
      </Container>
    </TasksProvider>
  </ItemsProvider>
);

const EventsPage = () => (
  <EventsProvider>
    <Container style={{marginTop: 16}}>
      <EventsList />
    </Container>
  </EventsProvider>
);

const App = () => (
  <Router>
    <NavigationBar />
    <Route path="/" exact render={() => (
      <Redirect to="/items" />
    )} />
    <Route path="/items" component={ItemsPage} />
    <Route path="/events" component={EventsPage} />
  </Router>
);

ReactDOM.render(<App />, document.querySelector('#main'));
