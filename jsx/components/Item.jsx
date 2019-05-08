import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import Image from './Image.jsx';
import TasksList from './TasksList.jsx';

function Item(props) {
  const { id, name, description, weight, imageId } = props;
  return (
    <Card bg="light" style={{marginTop: 16}}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div style={{display: 'flex'}}>
          <div>
            {!imageId ? null : <Image id={imageId} />}
          </div>
          <div style={{flex: 1}}>
            <ul>
              <li><b>Description:</b> {description}</li>
              <li><b>Weight:</b> {weight} kg</li>
              <li><b>ID:</b> {id}</li>
            </ul>
          </div>
        </div>
        <TasksList itemId={id} style={{float: 'left'}} />
      </Card.Body>
    </Card>
  );
}
Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  weight: PropTypes.number,
  imageId: PropTypes.number,
};

export default Item;
