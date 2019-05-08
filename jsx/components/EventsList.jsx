import React from 'react';
import PropTypes from 'prop-types';

import { EventsContext } from '../contexts/EventsContext.jsx';

import Event from './Event.jsx';

function EventsList(props) {
  const { isLoading, error, events } = props;
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>ERROR: {error}</h2>;
  }
  return (
    <React.Fragment>
      { events.map(event => (
        <Event
          key={event.id}
          id={event.id}
          message={event.message}
          severity={event.severity}
          createdTime={event.created_time}
        />
      ))}
    </React.Fragment>
  );
}
EventsList.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  events: PropTypes.array,
};

export default (props) => (
  <EventsContext.Consumer>
    {context => (
      <EventsList
        isLoading={context.isLoading}
        error={context.error}
        events={context.events}
      />
    )}
  </EventsContext.Consumer>
);
