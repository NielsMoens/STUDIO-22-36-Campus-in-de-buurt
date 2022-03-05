import * as React from 'react';
import PinDesign from './img/PinDesign';

const pinStyle = {
  cursor: 'pointer',
  fill: '#fff',
  stroke: 'none'
};

function Pin({size = 20, onClick}: {size?: number; onClick?: () => void}) {
  return (
      // <img src="./img/partyveldeCampus.svg" alt="React Logo"  viewBox="0 0 24 24" style={pinStyle} onClick={onClick} />
      <svg style={pinStyle} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="44.64" height="44.64" viewBox="0 0 44.64 44.64">
      <g id="Group_2" data-name="Group 2" transform="translate(-335.64 -136.09)">
        <path id="Path_102" data-name="Path 102" d="M351.56,149.28a7.82,7.82,0,1,0-8.23,8.44h8.26v-8.45Zm-5.2,3.23h-2.74a2.6,2.6,0,1,1,2.73-2.8h0Z" transform="translate(8.77 8.68)" fill="none" stroke="#222221" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
        <rect id="Rectangle_58" data-name="Rectangle 58" width="5.24" height="5.24" transform="translate(365.7 150.93)" fill="none" stroke="#222221" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
        <rect id="Rectangle_59" data-name="Rectangle 59" width="5.24" height="5.24" transform="translate(365.7 161.22)" fill="none" stroke="#222221" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
        <circle id="Ellipse_28" data-name="Ellipse 28" cx="21.82" cy="21.82" r="21.82" transform="translate(336.14 136.59)" fill="none" stroke="#222221" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
        <circle id="Ellipse_29" data-name="Ellipse 29" cx="18.28" cy="18.28" r="18.28" transform="translate(339.68 140.3)" fill="none" stroke="#222221" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
      </g>
    </svg>
  );
};

export default React.memo(Pin);
