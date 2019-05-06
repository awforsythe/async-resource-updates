import React from 'react';
import io from 'socket.io-client';

import Item from './Item.jsx';

class ItemsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      items: [],
    };
    this.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  }

  componentDidMount() {
    this.fetchItems();
    this.socket.on('item_created', this.onItemUpdate);
    this.socket.on('item_changed', this.onItemUpdate);
  }

  componentWillUnmount() {
    this.socket.off('item_created', this.onItemUpdate);
    this.socket.off('item_changed', this.onItemUpdate);
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

  render() {
    const { isLoading, error, items } = this.state;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>ERROR: {error}</h2>;
    }
    return (
      <React.Fragment>
        { items.map(item => (
          <Item
            key={item.id}
            name={item.name}
            description={item.description}
            weight={item.weight}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default ItemsView;
