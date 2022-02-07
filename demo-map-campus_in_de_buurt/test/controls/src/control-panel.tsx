import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Demo Interactive map </h3>
      <p>
        Campus in de buurt meeting 07/02/2022
      </p>
      <div className="source-link">
        <a
          href="https://github.com/NielsMoens/STUDIO-22-36-Campus-in-de-buurt"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
