import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const SNIPPETS = [
    'Luke, I am your father',
    'How much wood could a woodchuck chuck if a woodchuck could chuck wood',
    'Where do programmers like to hangout? The Foo Bar',
    "Don't have a cow, man",
    "Test"
  ];

  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    if(gameState.victory) document.title = 'Victory!';
  });

  const updateUserText = event => {
    setUserText(event.target.value);
    
    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: (new Date().getTime()/1000 - gameState.startTime).toFixed(4)
      });
    }
  }

  const chooseSnippet = snippetIndex => () => {
      console.log('setSnippet', snippetIndex);
      setSnippet(SNIPPETS[snippetIndex]);
      setGameState({ ...gameState, startTime: new Date().getTime()/1000 });
  }

  return (
    <div className="App">
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Finished! 🎉 Completed in ${gameState.endTime} ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0,10)}...
          </button>
        ))
      }
    </div>
  );
}

export default App;
