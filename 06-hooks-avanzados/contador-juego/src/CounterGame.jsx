import { useEffect, useReducer, useRef, useCallback, useState } from "react";

const initialState = { 
  count: 0, 
  history: [],
  previousStates: [] 
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { 
        count: state.count + (action.payload || 1),
        history: [...state.history, `+${action.payload || 1} (Nuevo valor: ${state.count + (action.payload || 1)})`],
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "decrement":
      return { 
        count: state.count - (action.payload || 1),
        history: [...state.history, `-${action.payload || 1} (Nuevo valor: ${state.count - (action.payload || 1)})`],
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "reset":
      return { 
        ...initialState,
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "undo": {
      if (state.previousStates.length === 0) return state;
      const previous = state.previousStates[state.previousStates.length - 1];
      return {
        ...previous,
        previousStates: state.previousStates.slice(0, -1),
        history: [...previous.history, `Deshacer (Nuevo valor: ${previous.count})`]
      };
    }
    default:
      return state;
  }
}
function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [customValue, setCustomValue] = useState(1);
  const incrementBtnRef = useRef(null);
  const inputRef = useRef(null);

  // Cargar y guardar en localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('counterState');
    if (savedState) {
      dispatch({ type: 'reset' });
      const parsedState = JSON.parse(savedState);
      // Restaurar el estado manteniendo el historial de previousStates para el undo
      parsedState.previousStates.forEach(prevState => {
        dispatch({ type: 'increment', payload: prevState.count - initialState.count });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('counterState', JSON.stringify({
      count: state.count,
      history: state.history
    }));
  }, [state.count, state.history]);

  // Fijar el foco al cargar
  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  // Funciones memoizadas
  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", payload: Number(customValue) });
  }, [customValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement", payload: Number(customValue) });
  }, [customValue]);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleIncrement();
      inputRef.current.focus();
    }
  }, [handleIncrement]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contador Interactivo</h2>
      
      <div style={styles.counterDisplay}>
        Valor actual: <span style={styles.count}>{state.count}</span>
      </div>

      <div style={styles.controls}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Valor personalizado:</label>
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyPress={handleKeyPress}
            ref={inputRef}
            min="1"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            ref={incrementBtnRef} 
            onClick={handleIncrement}
            style={styles.button}
          >
            Incrementar (+{customValue})
          </button>
          <button 
            onClick={handleDecrement}
            style={{...styles.button, ...styles.decrementButton}}
          >
            Decrementar (-{customValue})
          </button>
          <button 
            onClick={handleReset}
            style={{...styles.button, ...styles.resetButton}}
          >
            Reset
          </button>
          <button 
            onClick={handleUndo}
            style={{...styles.button, ...styles.undoButton}}
            disabled={state.previousStates.length === 0}
          >
            Deshacer
          </button>
        </div>
      </div>

      <div style={styles.historySection}>
        <h3 style={styles.historyTitle}>Historial de cambios:</h3>
        {state.history.length > 0 ? (
          <ul style={styles.historyList}>
            {state.history.map((entry, index) => (
              <li key={index} style={styles.historyItem}>
                {entry}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.emptyHistory}>No hay acciones registradas</p>
        )}
      </div>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px'
  },
  counterDisplay: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '30px',
    color: 'Black'
  },
  count: {
    fontWeight: 'bold',
    color: '#e74c3c',
    fontSize: '32px'
  },
  controls: {
    marginBottom: '30px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#34495e'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  button: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    minWidth: '120px'
  },
  decrementButton: {
    backgroundColor: '#e74c3c',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  resetButton: {
    backgroundColor: '#7f8c8d',
    ':hover': {
      backgroundColor: '#95a5a6'
    }
  },
  undoButton: {
    backgroundColor: '#f39c12',
    ':hover': {
      backgroundColor: '#e67e22'
    },
    ':disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed'
    }
  },
  historySection: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  historyTitle: {
    color: '#2c3e50',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  historyList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    maxHeight: '300px',
    overflowY: 'auto'
  },
  historyItem: {
    padding: '8px 0',
    color:'black',
    borderBottom: '1px solid #eee',
    ':last-child': {
      borderBottom: 'none'
    }
  },
  emptyHistory: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center'
  }
};

export default CounterGame;