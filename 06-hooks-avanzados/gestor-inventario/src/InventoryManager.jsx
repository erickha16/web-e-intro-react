import { useReducer, useRef, useCallback, useEffect, useState } from "react";

const initialState = { products: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { 
        products: [...state.products, { 
          id: Date.now(), 
          name: action.name, 
          quantity: 1 
        }] 
      };
    case "increment":
      return { 
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        ) 
      };
    case "decrement":
      return { 
        products: state.products.map(p =>
          p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        ) 
      };
    case "remove":
      return { 
        products: state.products.filter(p => p.id !== action.id) 
      };
    case "clear":
      return { 
        products: [] 
      };
    case "load":
      return {
        products: action.payload || []
      };
    default:
      return state;
  }
}

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  // Cargar desde localStorage al montar
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      dispatch({ type: "load", payload: JSON.parse(savedInventory) });
    }
  }, []);

  // Guardar en localStorage cuando cambia el inventario
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(state.products));
  }, [state.products]);

  // Funciones memoizadas
  const handleAddProduct = useCallback(() => {
    if (inputRef.current.value.trim() !== "") {
      dispatch({ type: "add", name: inputRef.current.value });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, []);

  const handleIncrement = useCallback((id) => {
    dispatch({ type: "increment", id });
  }, []);

  const handleDecrement = useCallback((id) => {
    dispatch({ type: "decrement", id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: "remove", id });
  }, []);

  const handleClearInventory = useCallback(() => {
    if (window.confirm("¿Estás seguro de que quieres vaciar todo el inventario?")) {
      dispatch({ type: "clear" });
    }
  }, []);

  // Filtrar productos según búsqueda
  const filteredProducts = state.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestor de Inventario</h2>
      
      <div style={styles.controls}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nombre del producto"
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && handleAddProduct()}
        />
        <button onClick={handleAddProduct} style={styles.addButton}>
          Agregar Producto
        </button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {state.products.length > 0 && (
        <button 
          onClick={handleClearInventory} 
          style={styles.clearButton}
        >
          Vaciar Inventario
        </button>
      )}

      {filteredProducts.length > 0 ? (
        <ul style={styles.productList}>
          {filteredProducts.map((product) => (
            <li key={product.id} style={styles.productItem}>
              <span style={styles.productName}>{product.name}</span>
              <span style={styles.productQuantity}>Cantidad: {product.quantity}</span>
              
              <div style={styles.productActions}>
                <button 
                  onClick={() => handleDecrement(product.id)} 
                  style={styles.actionButton}
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <button 
                  onClick={() => handleIncrement(product.id)} 
                  style={styles.actionButton}
                >
                  +
                </button>
                <button 
                  onClick={() => handleRemove(product.id)} 
                  style={{...styles.actionButton, ...styles.removeButton}}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.emptyMessage}>
          {searchTerm ? "No hay productos que coincidan con la búsqueda" : "No hay productos en el inventario"}
        </p>
      )}
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
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#27ae60'
    }
  },
  searchContainer: {
    marginBottom: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  productList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  productName: {
    fontWeight: 'bold',
    flex: 1
  },
  productQuantity: {
    flex: 1,
    textAlign: 'center'
  },
  productActions: {
    display: 'flex',
    gap: '5px'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    },
    ':disabled': {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed'
    }
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    width: 'auto',
    padding: '0 10px',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontStyle: 'italic',
    padding: '20px'
  }
};

export default InventoryManager;