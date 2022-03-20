import React from 'react';
import {Board} from './components/Board/Board';

import tiles from './tiles.json';

import style from './style.module.css';

function App() {
  return (
      <div className={style.app}>
          <Board {...tiles} />
      </div>
  );
}

export default App;
