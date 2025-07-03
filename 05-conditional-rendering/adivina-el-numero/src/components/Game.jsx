import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';
import AttemptsCounter from './AttemptsCouter';

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('¡Adivina un número entre 1 y 100!');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Inicializar el juego
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setUserGuess('');
    setMessage('¡Adivina un número entre 1 y 100!');
    setAttempts(0);
    setGameWon(false);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess);

    if (isNaN(guess)) {
      setMessage('Por favor ingresa un número válido');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      setMessage(`¡Correcto! 🎉 El número era ${targetNumber}`);
      setGameWon(true);
    } else if (guess < targetNumber) {
      setMessage('El número es mayor ⬆️');
    } else {
      setMessage('El número es menor ⬇️');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Adivina el Número</h1>
      
      <div style={styles.gameContainer}>
        <Message message={message} gameWon={gameWon} />
        
        {!gameWon && (
          <InputNumber 
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onSubmit={handleGuess}
          />
        )}
        
        <AttemptsCounter attempts={attempts} />
        
        {(gameWon || attempts > 0) && (
          <RestartButton onClick={startNewGame} />
        )}
      </div>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '30px',
    textAlign: 'center'
  },
  gameContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center'
  }
};

export default Game;