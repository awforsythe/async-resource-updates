import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/Pagination';

import { EventsContext } from '../contexts/EventsContext.jsx';

import EventsList from './EventsList.jsx';

function EventsView(props) {
  const { isLoading, error, events, page, pageSize, numPages, total, onPageChanged } = props;
  return (
    <React.Fragment>
      <EventsList
        isLoading={isLoading}
        error={error}
        events={events}
      />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
        <Pagination>
          <Pagination.First
            disabled={page <= 0}
            onClick={() => onPageChanged(0)}
          />
          <Pagination.Prev
            disabled={page <= 0}
            onClick={() => onPageChanged(page - 1)}
          />
        </Pagination>
        <div style={{ textAlign: 'center' }}>
          Page {page + 1} of {numPages}
        </div>
        <Pagination>
          <Pagination.Next
            disabled={page + 1 >= numPages}
            onClick={() => onPageChanged(page + 1)}
          />
          <Pagination.Last
            disabled={page + 1 >= numPages}
            onClick={() => onPageChanged(numPages - 1)}
          />
        </Pagination>
      </div>
    </React.Fragment>
  );
}
EventsView.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  events: PropTypes.array,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  numPages: PropTypes.number,
  total: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default (props) => (
  <EventsContext.Consumer>
    {context => <EventsView {...context} />}
  </EventsContext.Consumer>
);
