import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">E Grocery BD</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <Link className="nav-link active navbar-link" aria-current="page" to="/home">Home</Link>
                        <Link className="nav-link navbar-link" to="/orders">Orders</Link>
                        <Link className="nav-link navbar-link" to="/admin">Admin</Link>
                        <Link className="nav-link navbar-link disabled" to="/deals" tabIndex="-1" ariaDisabled="true">Deals</Link>
                        {
                            loggedInUser.email ? <button className=" btn btn-warning ms-3" onClick={() => setLoggedInUser({})}>LogOut</button> 
                            : <Link className=" btn btn-success ms-3" to="/login">Login</Link> 
                        }
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;