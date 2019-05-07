import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import { ItemsContext, ItemsProvider } from './contexts/ItemsContext.jsx';
import ItemsView from './components/ItemsView.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <ItemsProvider>
      <Container>
        <ItemsView />
      </Container>
    </ItemsProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#main'));
