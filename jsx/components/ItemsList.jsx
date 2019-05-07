import React from 'react';
import PropTypes from 'prop-types';

import { ItemsContext } from '../contexts/ItemsContext.jsx';

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
          imageId={item.image_id}
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

export default () => (
  <ItemsContext.Consumer>
    {context => (
      <ItemsList
        isLoading={context.isLoading}
        error={context.error}
        items={context.items}
      />
    )}
  </ItemsContext.Consumer>
);
