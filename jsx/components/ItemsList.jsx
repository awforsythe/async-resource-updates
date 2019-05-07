import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item.jsx';

function ItemsList(props) {
  const { isLoading, error, items } = props;
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
  );
}
ItemsList.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  items: PropTypes.array,
};

export default ItemsList;
