import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [id, setId] = useState('1')
  const [models, setModels] = useState()

  useEffect(() => {
    const getModels = () => {
      fetch(`http://localhost:8000/model/${id}`)
        .then(res => res.json())
        .then(data => {
          setModels(data)
        })
    }
    getModels()
  }, [id])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ID is {id}
        </p>
        <button onClick={() => setId((parseInt(id) + 1).toString())}>Add ID</button>
        <button onClick={() => setId((parseInt(id) - 1).toString())}>Minus ID</button>
        <div style={{ display: 'flex' }}>
          {models !== undefined && models.data.image_link.map((img, index) => (
            <img key={index} src={img} height='200' width='200' alt='owo' />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
