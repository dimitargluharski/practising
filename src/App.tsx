import { useState, useEffect } from 'react';

import * as footballService from './services/football.js';

import Match from './components/match-card/Match.js';
import Panel from './components/Panel/Panel.js';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    footballService.getLiveMatches().then((data: any) => {
      setMatches(data);
    })
  }, []);

  return (
    <div className='flex '>
      <Panel title='Live' button='view more'>
        {matches.map((m, i) => (
          <Match key={i} {...m} />
        ))}
      </Panel>
      <Panel title='TV'>
        list
      </Panel>
    </div>
  )
}

export default App
