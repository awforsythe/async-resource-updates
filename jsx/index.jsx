import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import { ItemsProvider } from './contexts/ItemsContext.jsx';
import ItemsList from './components/ItemsList.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <ItemsProvider>
      <Container>
        <ItemsList />
      </Container>
    </ItemsProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#main'));
