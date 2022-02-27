import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Test Interactive map </h3>
      <p>
        Buurt In De Campus ヾ(•ω•`)o
      </p>
      <div className="source-link">
        <a href="https://github.com/NielsMoens/STUDIO-22-36-Campus-in-de-buurt"
          target="_new" >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
