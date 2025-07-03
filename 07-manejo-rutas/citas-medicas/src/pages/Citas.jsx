import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CitaCard from '../components/CitaCard';
import { getCitas } from '../data/citas';
import '../styles/main.css';

function Citas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carga de datos asíncrona
    const fetchCitas = async () => {
      try {
        const data = await getCitas();
        setCitas(data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  if (loading) {
    return <div className="loading">Cargando citas...</div>;
  }

  return (
    <div className="citas-container">
      <h1>Listado de Citas Médicas</h1>
      <div className="citas-grid">
        {citas.map(cita => (
          <CitaCard key={cita.id} cita={cita} />
        ))}
      </div>
    </div>
  );
}

export default Citas;