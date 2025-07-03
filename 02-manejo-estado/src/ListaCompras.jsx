import { useState } from "react";

function ListaCompras() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto]);
      setNuevoProducto("");
    }
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      agregarProducto();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Lista de Compras</h2>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un producto..."
          style={styles.input}
        />
        <button onClick={agregarProducto} style={styles.botonAgregar}>
          Agregar
        </button>
      </div>
      
      {productos.length > 0 ? (
        <ul style={styles.lista}>
          {productos.map((producto, index) => (
            <li key={index} style={styles.item}>
              <span style={styles.textoProducto}>{producto}</span>
              <button 
                onClick={() => eliminarProducto(index)} 
                style={styles.botonEliminar}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.mensajeVacio}>No hay productos en la lista</p>
      )}
      
      {productos.length > 0 && (
        <p style={styles.contador}>
          Total: {productos.length} producto{productos.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

// Estilos del componente
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  titulo: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  botonAgregar: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  lista: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    marginBottom: '8px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  textoProducto: {
    flex: 1
  },
  botonEliminar: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  mensajeVacio: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontStyle: 'italic'
  },
  contador: {
    textAlign: 'right',
    color: '#7f8c8d',
    fontSize: '14px',
    marginTop: '10px'
  }
};

export default ListaCompras;