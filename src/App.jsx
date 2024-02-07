import React from 'react';

// importando o css global
import './styles/index.css';

// import Header from './components/Header/Header';
import WebRoute from './routes';

function App() {
  return (
    <div className="App">
      {/* <header /> */}
       <WebRoute/>  
    </div>
  );
}

export default App;
