import { Link } from 'react-router-dom';
import '../styles/main.css';

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido al Sistema de Gestión de Citas</h1>
      <p>Gestiona tus citas médicas de manera eficiente</p>
      <div className="actions">
        <Link to="/citas" className="btn primary">Ver todas las citas</Link>
      </div>
    </div>
  );
}

export default Home;