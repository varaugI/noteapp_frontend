import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../styles/Header.css';


const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((location.pathname === "/login" || location.pathname === "/register") && isLoggedIn) {
      navigate("/notes");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <header className="header">
      <div className="header-title">NotesApp</div>
      <nav className="nav-links">
        {isLoggedIn && <Link to="/notes">Notes</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <button onClick={onLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
