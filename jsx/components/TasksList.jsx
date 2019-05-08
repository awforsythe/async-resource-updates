import React from 'react';
import PropTypes from 'prop-types';

import { TasksContext } from '../contexts/TasksContext.jsx';

import Task from './Task.jsx';

function TasksList(props) {
  const { isLoading, error, tasks } = props;
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>ERROR: {error}</h2>;
  }
  return (
    <React.Fragment>
      { tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          progressPct={task.progress_pct}
          message={task.message}
          startedTime={task.started_time}
          finishedTime={task.finished_time}
          successful={task.successful}
        />
      ))}
    </React.Fragment>
  );
}
TasksList.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  tasks: PropTypes.array,
};

export default (props) => (
  <TasksContext.Consumer>
    {context => (
      <TasksList
        isLoading={context.isLoading}
        error={context.error}
        tasks={context.tasks.filter(task => task.item_id === props.itemId)}
      />
    )}
  </TasksContext.Consumer>
);
