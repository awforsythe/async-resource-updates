import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar(props) {
  const { progressPct, color, height } = props;
  return (
    <div style={{
      width: '100%',
      height: height || '100%',
      borderRadius: 2,
      border: `1px solid ${color}`,
    }}>
      <div style={{
        width: `${Math.round(progressPct * 100.0)}%`,
        height: '100%',
        background: `linear-gradient(white -50%, ${color} 70%)`,
        borderRadius: 2,
      }}/>
    </div>
  );
}
ProgressBar.propTypes = {
  progressPct: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
};

export default ProgressBar;
