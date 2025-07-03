import { Link } from 'react-router-dom';
import '../styles/main.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Clinica Médica</Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/citas" className="nav-link">Citas</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;