import React from 'react';

const RestartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      Jugar de nuevo
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    marginTop: '20px',
    ':hover': {
      backgroundColor: '#27ae60'
    }
  }
};

export default RestartButton;