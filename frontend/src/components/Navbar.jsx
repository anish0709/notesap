import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Notes App</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes">Notes</Link>
                    </li>
                </ul>
                {localStorage.getItem('token') ? (
                    <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>Logout</button>
                ) : (
                    <div>
                        <Link className="btn btn-outline-primary my-2 my-sm-0" to="/login">Login</Link>
                        <Link className="btn btn-outline-success my-2 my-sm-0 ml-2" to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
