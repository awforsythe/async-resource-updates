import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function Item(props) {
  const { name, description, weight } = props;
  return (
    <Card bg="light" style={{marginTop: 16}}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {!description ? null : <Card.Subtitle>{description}</Card.Subtitle>}
        {!weight ? null : (
          <Card.Text>
            <b>Weight:</b> {weight} kg
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  weight: PropTypes.number,
};

export default Item;
