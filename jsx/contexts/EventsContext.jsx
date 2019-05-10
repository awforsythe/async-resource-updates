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
      page: 0,
      pageSize: 30,
      numPages: 0,
      total: 0,
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
    const { page, pageSize } = this.state;
    fetch(`/api/events?n=${pageSize}&p=${page + 1}`)
      .then(response => response.json())
      .then(data => this.setState({
        isLoading: false,
        error: null,
        events: data.items,
        page: data.page - 1,
        pageSize: data.per_page,
        numPages: data.pages,
        total: data.total,
      }))
      .catch(error => this.setState({
        isLoading: false,
        error: error.toString()
      }));
  }

  onEventCreated = (event) => {
    const { page, pageSize, events } = this.state;
    if (page === 0) {
      if (events.length === pageSize) {
        this.setState({ events: [event].concat(events.slice(0, pageSize - 1)) });
      } else {
        this.setState({ events: [event].concat(events) });
      }
    }
  };

  onPageChanged = (newPage) => {
    const { numPages } = this.state;
    if (newPage >= 0 && newPage < numPages) {
      this.setState({ page: newPage }, this.fetchEvents);
    }
  };

  render() {
    const { children } = this.props;
    return (
      <EventsContext.Provider value={{ ...this.state, onPageChanged: this.onPageChanged }}>
        {children}
      </EventsContext.Provider>
    );
  }
}

export { EventsContext, EventsProvider };
