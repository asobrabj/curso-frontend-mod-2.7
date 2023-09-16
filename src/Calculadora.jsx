import React, { useState, useEffect } from 'react';
import './css/Calculadora2.css';


function AdvancedCalculadora() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key;

      
      if (/^[0-9+\-*/.=]$/.test(key)) {
        setInput((prevInput) => prevInput + key);
      }

      
      if (key == 'Enter' || key == '=') {
        calculateResult();
      }

      
      if (key.toLowerCase() === 'c') {
        clearInput();
      }
    }

    
    document.addEventListener('keydown', handleKeyPress);

    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleNumberClick = (number) => {
    setInput(input + number);
  };

  const handleOperatorClick = (operator) => {
    if (input !== '') {
      setInput(input + ' ' + operator + ' ');
    }
  };

  const calculateResult = () => {
    try {
      const result = eval(input);
      setOutput(result);
      setHistory([...history, `${input} = ${result}`]);
      setInput('');
    } catch (error) {
      setOutput('Erro');
    }
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
    setHistory([]); 
  };

  return (
    <div className="advanced-calculadora">
      <div className="display">
        <input className="input" type="text" value={input} readOnly />
        <div className="output">{output}</div>
      </div>
      <div className="buttons">
        <div className="numeric-buttons">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map((number) => (
            <button key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}
        </div>
        <div className="operator-buttons">
          {['+', '-', '*', '/'].map((operator) => (
            <button key={operator} onClick={() => handleOperatorClick(operator)}>
              {operator}
            </button>
          ))}
          <button onClick={calculateResult}>=</button>
          <button onClick={clearInput}>C</button>
        </div>
      </div>
      <div className="history">
        <h2>Histórico de Operações</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdvancedCalculadora;
