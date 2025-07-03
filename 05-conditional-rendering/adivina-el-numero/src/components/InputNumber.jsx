import React from 'react';

const InputNumber = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        style={styles.input}
        placeholder="Ingresa tu número"
        min="1"
        max="100"
        autoFocus
      />
      <button type="submit" style={styles.button}>
        Adivinar
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  }
};

export default InputNumber;