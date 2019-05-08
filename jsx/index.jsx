import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import { ItemsProvider } from './contexts/ItemsContext.jsx';
import { TasksProvider } from './contexts/TasksContext.jsx';
import { EventsProvider } from './contexts/EventsContext.jsx';

import ItemsList from './components/ItemsList.jsx';
import EventsList from './components/EventsList.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const { showEvents } = props;
  if (showEvents) {
    return (
      <EventsProvider>
        <Container>
          <EventsList />
        </Container>
      </EventsProvider>
    );
  }
  return (
    <ItemsProvider>
      <TasksProvider>
        <Container>
          <ItemsList />
        </Container>
      </TasksProvider>
    </ItemsProvider>
  );
}

ReactDOM.render(<App showEvents={true} />, document.querySelector('#main'));
