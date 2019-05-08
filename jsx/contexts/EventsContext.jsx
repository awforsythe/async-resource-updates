import React from 'react';
import io from 'socket.io-client';

const EventsContext = React.createContext();

class EventsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      events: [],
    };
    this.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  }

  componentDidMount() {
    this.fetchEvents();
    this.socket.on('event insert', this.onEventCreated);
  }

  componentWillUnmount() {
    this.socket.off('event insert', this.onEventCreated);
  }

  fetchEvents() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, error: null, events: data.items }))
      .catch(error => this.setState({ isLoading: false, error }));
  }

  onEventCreated = (event) => {
    const { events } = this.state;
    this.setState({
      events: [event].concat(events),
    });
  };

  render() {
    const { children } = this.props;
    return (
      <EventsContext.Provider value={{ ...this.state }}>
        {children}
      </EventsContext.Provider>
    );
  }
}

export { EventsContext, EventsProvider };
