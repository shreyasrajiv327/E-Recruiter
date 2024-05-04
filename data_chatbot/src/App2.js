//import './App.css';
import { useState } from 'react';
import Chatbot from './Components/Chatbot2';
import GetData from './Components/getData';
//import HomePage from './Components/Homepage'; // Import the HomePage component

function App2() {
  const [page, setPage] = useState('home'); 

  const handlePageChange = () => {
    setPage(page === 'home' ? 'chatbot' : 'getData'); 
  };

  return (
    <div className="App">
      {page === 'home' ? (
        <HomePage onClickApply={handlePageChange} />
      ) : (
        <>
          <button className="switch-button" onClick={handlePageChange}>
            {page === 'chatbot' ? 'Get Data' : 'Chatbot'}
          </button>
          {page === 'chatbot' ? <Chatbot /> : <GetData />}
        </>
      )}
    </div>
  );
}

export default App2;
