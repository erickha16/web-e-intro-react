const AttemptsCounter = ({ attempts }) => {
  return (
    <div style={styles.counter}>
      Intentos: <span style={styles.number}>{attempts}</span>
    </div>
  );
};

const styles = {
  counter: {
    color: '#7f8c8d',
    fontSize: '16px',
    margin: '10px 0'
  },
  number: {
    fontWeight: 'bold',
    color: '#e74c3c'
  }
};

export default AttemptsCounter;