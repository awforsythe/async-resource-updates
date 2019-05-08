import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import ProgressBar from './ProgressBar.jsx';

function TaskHeadline(props) {
  const { id, progressPct, message } = props;
  if (!message) {
    return <h6>Task {id} &ndash; {(progressPct || 0) * 100.0}%</h6>;
  }
  return <h6>Task {id} &ndash; {(progressPct || 0) * 100.0}% &ndash; <em>{message}</em></h6>;
}
TaskHeadline.propTypes = {
  id: PropTypes.number.isRequired,
  progressPct: PropTypes.number,
  message: PropTypes.string,
};

function Task(props) {
  const { id, progressPct, message, finishedTime, successful } = props;
  const color = finishedTime ? (successful ? '#66dd66' : '#dd3333') : '#bcbccd';
  const headline = `Task ${id}` + (message ? `: ${message}` : '');
  return (
    <Card style={{marginTop: 8}}>
      <Card.Body style={{padding: 4}}>
        <div>
          <TaskHeadline id={id} progressPct={progressPct} message={message} />
        </div>
        <ProgressBar progressPct={progressPct} color={color} height={20} />
      </Card.Body>
    </Card>
  );
}
Task.propTypes = {
  id: PropTypes.number.isRequired,
  progressPct: PropTypes.number,
  message: PropTypes.string,
  startedTime: PropTypes.string,
  finishedTime: PropTypes.string,
  successful: PropTypes.bool,
};

export default Task;
