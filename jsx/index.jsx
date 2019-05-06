import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import ItemsView from './components/ItemsView.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <Container>
      <ItemsView />
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector('#main'));
