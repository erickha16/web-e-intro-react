import React, { useState, useEffect, useMemo } from 'react';

function App() {
  // Cargar tareas desde localStorage al iniciar
  const [tareas, setTareas] = useState(() => {
    const saved = localStorage.getItem('tareas');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [orden, setOrden] = useState('recientes');

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Actualizar título del documento
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas]);

  // Cálculo de tiempo total optimizado
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // Filtrar y ordenar tareas
  const tareasFiltradasYOrdenadas = useMemo(() => {
    let resultado = [...tareas];
    
    // Aplicar filtro por duración
    if (filtro === 'cortas') {
      resultado = resultado.filter(tarea => tarea.duracion <= 30);
    } else if (filtro === 'largas') {
      resultado = resultado.filter(tarea => tarea.duracion > 30);
    }
    
    // Aplicar orden
    if (orden === 'antiguas') {
      resultado.reverse();
    }
    
    return resultado;
  }, [tareas, filtro, orden]);

  // Agregar nueva tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        id: Date.now(),
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fecha: new Date().toISOString()
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Gestor de Tareas</h1>
      
      <form onSubmit={agregarTarea} style={styles.formulario}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
          style={styles.input}
          required
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración (min)"
          style={styles.input}
          min="1"
          required
        />
        <button type="submit" style={styles.botonAgregar}>
          Agregar tarea
        </button>
      </form>

      <div style={styles.filtros}>
        <div>
          <label style={styles.label}>Filtrar por duración: </label>
          <select 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            style={styles.select}
          >
            <option value="todas">Todas</option>
            <option value="cortas">Cortas (≤ 30 min)</option>
            <option value="largas">Largas (30 min o más)</option>
          </select>
        </div>
        
        <div>
          <label style={styles.label}>Ordenar por: </label>
          <select 
            value={orden} 
            onChange={(e) => setOrden(e.target.value)}
            style={styles.select}
          >
            <option value="recientes">Más recientes</option>
            <option value="antiguas">Más antiguas</option>
          </select>
        </div>
      </div>

      <div style={styles.listaContainer}>
        <h2 style={styles.subtitulo}>Tareas ({tareasFiltradasYOrdenadas.length})</h2>
        
        {tareasFiltradasYOrdenadas.length > 0 ? (
          <ul style={styles.lista}>
            {tareasFiltradasYOrdenadas.map((tarea) => (
              <li key={tarea.id} style={styles.item}>
                <div style={styles.tareaInfo}>
                  <span style={styles.tareaNombre}>{tarea.nombre}</span>
                  <span style={styles.tareaDuracion}>{tarea.duracion} min</span>
                  <span style={styles.tareaFecha}>
                    {new Date(tarea.fecha).toLocaleDateString()}
                  </span>
                </div>
                <button 
                  onClick={() => eliminarTarea(tarea.id)} 
                  style={styles.botonEliminar}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.mensajeVacio}>No hay tareas que coincidan con los filtros</p>
        )}
      </div>

      <div style={styles.resumen}>
        <h3 style={styles.total}>Total: {calcularTiempoTotal} minutos</h3>
        <p style={styles.contador}>{tareas.length} tareas en total</p>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  titulo: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px'
  },
  formulario: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minWidth: '150px'
  },
  botonAgregar: {
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
  },
  filtros: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '20px',
    flexWrap: 'wrap'
  },
  label: {
    marginRight: '10px',
    color: '#34495e'
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: 'white'
  },
  listaContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  subtitulo: {
    color: '#2c3e50',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  lista: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
    ':last-child': {
      borderBottom: 'none'
    }
  },
  tareaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  tareaNombre: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  tareaDuracion: {
    backgroundColor: '#e8f4fc',
    color: '#3498db',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '14px'
  },
  tareaFecha: {
    color: '#7f8c8d',
    fontSize: '14px'
  },
  botonEliminar: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  mensajeVacio: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontStyle: 'italic'
  },
  resumen: {
    textAlign: 'right',
    padding: '10px',
    backgroundColor: '#ecf0f1',
    borderRadius: '5px'
  },
  total: {
    color: '#2c3e50',
    margin: '0 0 5px 0'
  },
  contador: {
    color: '#7f8c8d',
    margin: '0',
    fontSize: '14px'
  }
};

export default App;