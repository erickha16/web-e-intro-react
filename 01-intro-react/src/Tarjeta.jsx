import { useState } from 'react';

const PerfilCard = () => {
  const perfiles = [
    {
      nombre: 'Ana García',
      profesion: 'Ingeniera de Software',
      mensaje: 'Apasionada por crear soluciones tecnológicas que impacten positivamente en la sociedad.'
    },
    {
      nombre: 'Carlos Méndez',
      profesion: 'Diseñador UX/UI',
      mensaje: 'Creo experiencias digitales intuitivas y hermosas que los usuarios aman.'
    },
    {
      nombre: 'Luisa Fernández',
      profesion: 'Científica de Datos',
      mensaje: 'Transformo datos en insights valiosos para la toma de decisiones estratégicas.'
    },
    {
      nombre: 'Pedro Sánchez',
      profesion: 'Desarrollador Frontend',
      mensaje: 'Especializado en React y TypeScript, construyendo interfaces modernas y accesibles.'
    }
  ];

  // Estado para controlar qué perfil se muestra
  const [indiceActual, setIndiceActual] = useState(0);

  // Función para cambiar al siguiente perfil
  const siguientePerfil = () => {
    setIndiceActual((prevIndice) => 
      prevIndice === perfiles.length - 1 ? 0 : prevIndice + 1
    );
  };

  // Obtener el perfil actual
  const perfilActual = perfiles[indiceActual];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.nombre}>{perfilActual.nombre}</h2>
        <p style={styles.profesion}>{perfilActual.profesion}</p>
        <p style={styles.mensaje}>"{perfilActual.mensaje}"</p>
        
        <button 
          onClick={siguientePerfil}
          style={styles.boton}
        >
          Conocer siguiente perfil
        </button>
      </div>
    </div>
  );
};

// Estilos del componente
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '400px',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  },
  nombre: {
    color: '#2c3e50',
    marginBottom: '10px'
  },
  profesion: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  mensaje: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    lineHeight: '1.6',
    marginBottom: '25px'
  },
  boton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginBottom: '15px'
  },
};

export default PerfilCard;