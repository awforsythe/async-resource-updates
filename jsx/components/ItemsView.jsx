import React from 'react';

import { ItemsContext } from '../contexts/ItemsContext.jsx';
import ItemsList from './ItemsList.jsx';

function ItemsView(props) {
  return (
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
}

export default ItemsView;
