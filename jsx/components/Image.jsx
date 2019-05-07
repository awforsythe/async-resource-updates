import React from 'react';
import PropTypes from 'prop-types';

function Image(props) {
  const { id } = props;
  return (
    <img src={`/api/images/${id}`} />
  );
}
Image.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Image;
