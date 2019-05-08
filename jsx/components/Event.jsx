import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

function Event(props) {
  const { id, message, severity, createdTime } = props;
  const variant = severity == 'error' ? 'danger' : (severity == 'warning' ? 'warning' : (severity == 'debug' ? 'secondary' : 'primary'));
  return (
    <Alert variant={variant} style={{marginBottom: 4, padding: '2px 16px'}}>
      <h6 style={{marginBottom: 2}}>[{id}] - {createdTime} - {severity} - {message}</h6>
    </Alert>
  );
}
Event.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  severity: PropTypes.string,
  createdTime: PropTypes.string,
};

export default Event;
