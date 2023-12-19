import { useState, useEffect } from 'react';

import * as footballService from './services/football.js';

import Match from './components/match-card/Match.js';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    footballService.getLiveMatches().then((data: any) => {
      setMatches(data);
    })
  }, []);

  return (
    <>
      {matches.map((m, i) => (
        <Match key={i} {...m} />
      ))}
    </>
  )
}

export default App
