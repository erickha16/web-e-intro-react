import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  // Efectos de ciclo de vida
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`);
    
    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`);
    };
  }, [nombre]);

  return (
    <div style={planetaStyles.container}>
      <div style={planetaStyles.icono}>🪐</div>
      <h3 style={planetaStyles.nombre}>{nombre}</h3>
      <p style={planetaStyles.descripcion}>Explorado con éxito</p>
    </div>
  );
}

// Estilos del planeta
const planetaStyles = {
  container: {
    backgroundColor: '#2c3e50',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  icono: {
    fontSize: '40px',
    marginBottom: '10px'
  },
  nombre: {
    color: '#1abc9c',
    margin: '0 0 5px 0'
  },
  descripcion: {
    color: '#bdc3c7',
    margin: '0',
    fontSize: '14px'
  }
};

export default Planeta;