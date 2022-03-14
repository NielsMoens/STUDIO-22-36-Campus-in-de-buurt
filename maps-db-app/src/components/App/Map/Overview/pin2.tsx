import * as React from 'react';
import PinDesign from './img/PinDesign';

const pinStyle = {
  cursor: 'pointer',
  fill: '#fff',
  stroke: 'none'
};

function Pin2({size = 20, onClick}: {size?: number; onClick?: () => void}) {
  return (
      // <img src="./img/partyveldeCampus.svg" alt="React Logo"  viewBox="0 0 24 24" style={pinStyle} onClick={onClick} />
<svg style={pinStyle} onClick={onClick} enable-background="new 0 0 48px" stroke="black" height="24px" version="1.1" viewBox="0 0 48 48" width="48px" ><g id="Expanded"><g><g><path stroke="black" stroke-width="1px" fill="black" d="M24,47.759l-0.823-1.191C22.558,45.671,8,24.499,8,16C8,7.178,15.178,0,24,0s16,7.178,16,16     c0,8.499-14.558,29.671-15.177,30.568L24,47.759z M24,2c-7.72,0-14,6.28-14,14c0,6.787,10.885,23.555,14,28.214     C27.115,39.555,38,22.787,38,16C38,8.28,31.72,2,24,2z"/></g><g><path stroke="black" stroke-width="1px" fill="black" d="M24,23c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,23,24,23z M24,11c-2.757,0-5,2.243-5,5s2.243,5,5,5     s5-2.243,5-5S26.757,11,24,11z"/></g></g></g></svg>
  );
};

export default React.memo(Pin2);
