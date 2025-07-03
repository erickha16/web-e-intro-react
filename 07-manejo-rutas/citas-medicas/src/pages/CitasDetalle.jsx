import { useParams } from 'react-router-dom';
import { getCitaById } from '../data/citas';
import { useState, useEffect } from 'react';
import '../styles/main.css';

function CitaDetalle() {
  const { id } = useParams();
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const data = await getCitaById(id);
        setCita(data);
      } catch (error) {
        console.error("Error al cargar la cita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCita();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando cita...</div>;
  }

  if (!cita) {
    return <div className="error">No se encontró la cita solicitada</div>;
  }

  return (
    <div className="cita-detalle">
      <h2>Detalles de la Cita #{id}</h2>
      <div className="cita-info">
        <p><strong>Paciente:</strong> {cita.paciente}</p>
        <p><strong>Doctor:</strong> {cita.doctor}</p>
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Motivo:</strong> {cita.motivo}</p>
        <p><strong>Estado:</strong> <span className={`status ${cita.estado.toLowerCase()}`}>{cita.estado}</span></p>
      </div>
    </div>
  );
}

export default CitaDetalle;