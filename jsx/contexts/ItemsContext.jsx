import React from 'react';
import io from 'socket.io-client';

const ItemsContext = React.createContext();

class ItemsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      items: [],
    };
    this.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  }

  componentDidMount() {
    this.fetchItems();
    this.socket.on('item_created', this.onItemUpdate);
    this.socket.on('item_changed', this.onItemUpdate);
    this.socket.on('item_deleted', this.onItemDeleted);
  }

  componentWillUnmount() {
    this.socket.off('item_created', this.onItemUpdate);
    this.socket.off('item_changed', this.onItemUpdate);
    this.socket.off('item_deleted', this.onItemDeleted);
  }

  fetchItems() {
    fetch('/api/items')
      .then(response => response.json())
      .then(items => this.setState({ isLoading: false, error: null, items }))
      .catch(error => this.setState({ isLoading: false, error }));
  }

  onItemUpdate = (item) => {
    const { items } = this.state;
    const index = items.findIndex(x => x.id === item.id);
    if (index >= 0) {
      this.setState({
        items: items.slice(0, index).concat([item]).concat(items.slice(index + 1)),
      });
    } else {
      this.setState({
        items: [item].concat(items),
      });
    }
  };

  onItemDeleted = (itemId) => {
    const { items } = this.state;
    const index = items.findIndex(x => x.id === itemId);
    if (index >= 0) {
      this.setState({
        items: items.slice(0, index).concat(items.slice(index + 1)),
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <ItemsContext.Provider value={{ ...this.state }}>
        {children}
      </ItemsContext.Provider>
    );
  }
}

export { ItemsContext, ItemsProvider };
