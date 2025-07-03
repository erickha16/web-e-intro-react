import React from 'react';

const Message = ({ message, gameWon }) => {
  return (
    <div style={{
      ...styles.message,
      color: gameWon ? '#27ae60' : '#2c3e50',
      fontSize: gameWon ? '24px' : '18px'
    }}>
      {message}
    </div>
  );
};

const styles = {
  message: {
    margin: '20px 0',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  }
};

export default Message;