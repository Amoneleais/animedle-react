import React, { useEffect } from 'react';

// importando o css global
import './styles/index.css';

import WebRoute from './routes';

function App() {

  useEffect(() => {
    document.title = 'Animedle アニメの言葉';
  }, []);

  return (
    <div className="App">
       
        <WebRoute/>  
    </div>
  );
}

export default App;
