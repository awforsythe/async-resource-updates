import React from 'react';
import io from 'socket.io-client';

const TasksContext = React.createContext();

class TasksProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      tasks: [],
    };
    this.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  }

  componentDidMount() {
    this.fetchTasks();
    this.socket.on('task insert', this.onTaskUpdate);
    this.socket.on('task update', this.onTaskUpdate);
    this.socket.on('task delete', this.onTaskDeleted);
  }

  componentWillUnmount() {
    this.socket.off('task insert', this.onTaskUpdate);
    this.socket.off('task update', this.onTaskUpdate);
    this.socket.off('task delete', this.onTaskDeleted);
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(tasks => this.setState({ isLoading: false, error: null, tasks }))
      .catch(error => this.setState({ isLoading: false, error }));
  }

  onTaskUpdate = (task) => {
    const { tasks } = this.state;
    const index = tasks.findIndex(x => x.id === task.id);
    if (index >= 0) {
      this.setState({
        tasks: tasks.slice(0, index).concat([task]).concat(tasks.slice(index + 1)),
      });
    } else {
      this.setState({
        tasks: [task].concat(tasks),
      });
    }
  };

  onTaskDeleted = (taskId) => {
    const { tasks } = this.state;
    const index = tasks.findIndex(x => x.id === taskId);
    if (index >= 0) {
      this.setState({
        tasks: tasks.slice(0, index).concat(tasks.slice(index + 1)),
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <TasksContext.Provider value={{ ...this.state }}>
        {children}
      </TasksContext.Provider>
    );
  }
}

export { TasksContext, TasksProvider };
