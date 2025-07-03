import { Link } from 'react-router-dom';
import '../styles/main.css';

function CitaCard({ cita }) {
  return (
    <div className="cita-card">
      <h3>{cita.paciente}</h3>
      <p><strong>Doctor:</strong> {cita.doctor}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Estado:</strong> <span className={`status ${cita.estado.toLowerCase()}`}>{cita.estado}</span></p>
      <Link to={`/citas/${cita.id}`} className="btn secondary">Ver detalles</Link>
    </div>
  );
}

export default CitaCard;