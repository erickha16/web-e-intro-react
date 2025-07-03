import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [mostrarPlanetas, setMostrarPlanetas] = useState(true);

  // Efecto para simular el vuelo
  useEffect(() => {
    console.log("¡El panel de control está listo!");

    const intervaloVuelo = setInterval(() => {
      if (combustible > 0 && estadoNave === "En órbita") {
        setDistancia(prev => prev + 1);
        setCombustible(prev => Math.max(0, prev - 0.5));
      } else if (combustible <= 0 && estadoNave === "En órbita") {
        setEstadoNave("Sin combustible");
      }
    }, 1000);

    // Limpieza al desmontar
    return () => {
      clearInterval(intervaloVuelo);
      console.log("El panel de control se ha apagado.");
    };
  }, [combustible, estadoNave]);

  // Efecto para monitorear combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Mensaje memoizado
  const mensajeEstado = useMemo(() => {
    console.log("Calculando mensaje de estado...");
    switch(estadoNave) {
      case "En órbita":
        return "🚀 Nave en órbita, todo normal";
      case "Aterrizando":
        return "🌍 Aterrizando en planeta...";
      case "Sin combustible":
        return "⛽ ¡CRÍTICO! Sin combustible";
      default:
        return "Estado desconocido";
    }
  }, [estadoNave]);

  // Función para aterrizar
  const aterrizar = () => {
    const nombrePlaneta = `Planeta-${Math.floor(Math.random() * 1000)}`;
    setEstadoNave("Aterrizando");
    setPlanetasVisitados(prev => [...prev, nombrePlaneta]);
    
    // Simular tiempo de aterrizaje
    setTimeout(() => {
      setEstadoNave("En órbita");
      setCombustible(100); // Reabastecer combustible
    }, 3000);
  };

  // Función para reiniciar viaje
  const reiniciarViaje = () => {
    setDistancia(0);
    setCombustible(100);
    setEstadoNave("En órbita");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🚀 Panel de Control de Nave Espacial</h1>
      
      <div style={styles.panel}>
        <div style={styles.metrica}>
          <h3>Distancia recorrida</h3>
          <p style={styles.valor}>{distancia} UA</p>
        </div>
        
        <div style={styles.metrica}>
          <h3>Combustible</h3>
          <div style={styles.barraCombustibleContainer}>
            <div 
              style={{
                ...styles.barraCombustible,
                width: `${combustible}%`,
                backgroundColor: combustible > 30 ? '#2ecc71' : '#e74c3c'
              }}
            />
          </div>
          <p style={styles.valor}>{combustible.toFixed(1)}%</p>
        </div>
        
        <div style={styles.metrica}>
          <h3>Estado de la nave</h3>
          <p style={styles.valor}>{mensajeEstado}</p>
        </div>
      </div>

      <div style={styles.botones}>
        <button 
          onClick={aterrizar} 
          style={styles.boton}
          disabled={estadoNave !== "En órbita"}
        >
          Aterrizar en planeta aleatorio
        </button>
        
        <button 
          onClick={reiniciarViaje} 
          style={styles.botonSecundario}
        >
          Reiniciar viaje
        </button>
        
        <button 
          onClick={() => setMostrarPlanetas(!mostrarPlanetas)} 
          style={styles.boton}
        >
          {mostrarPlanetas ? 'Ocultar planetas' : 'Mostrar planetas'}
        </button>
      </div>

      {mostrarPlanetas && planetasVisitados.length > 0 && (
        <div style={styles.planetasContainer}>
          <h2>🌌 Planetas Visitados</h2>
          <div style={styles.planetasGrid}>
            {planetasVisitados.map((planeta, index) => (
              <Planeta key={index} nombre={planeta} />
            ))}
          </div>
        </div>
      )}
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
    backgroundColor: '#0a0e17',
    color: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 150, 255, 0.3)'
  },
  titulo: {
    textAlign: 'center',
    color: '#1abc9c',
    marginBottom: '30px'
  },
  panel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  metrica: {
    flex: 1,
    minWidth: '200px',
    backgroundColor: '#1a2639',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
  },
  valor: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0 0 0'
  },
  barraCombustibleContainer: {
    height: '10px',
    backgroundColor: '#2c3e50',
    borderRadius: '5px',
    margin: '10px 0',
    overflow: 'hidden'
  },
  barraCombustible: {
    height: '100%',
    transition: 'width 0.5s, background-color 0.5s'
  },
  botones: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  boton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  botonSecundario: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#95a5a6'
    }
  },
  planetasContainer: {
    backgroundColor: '#1a2639',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
  },
  planetasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  }
};

export default App;