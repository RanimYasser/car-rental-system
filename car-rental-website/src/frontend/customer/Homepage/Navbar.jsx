import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000 // Ensure navbar is above other content
        }}>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '35px' }}>CarRental</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
            
                <ul style={{ listStyleType: 'none', display: 'flex', margin: '0', padding: '0', fontSize: '30px' }}>
                    <li style={{ margin: '0 20px' }}><Link to="/cars" style={{ textDecoration: 'none', color: 'white' }}>Catalog</Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/reservations" style={{ textDecoration: 'none', color: 'white' }}>Reservations</Link></li>
                   
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
