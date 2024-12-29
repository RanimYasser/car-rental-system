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
            zIndex: 1000,
          
        }}>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '35px' }}>Admin Page</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center',marginRight:'60px' }}>
                
            
                <ul style={{ listStyleType: 'none', display: 'flex', margin: '0', padding: '0', fontSize: '30px' }}>
                    <li style={{ margin: '0 20px' }}><Link to="/addCarForm" style={{ textDecoration: 'none', color: 'white' }}>Add car</Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/report" style={{ textDecoration: 'none', color: 'white' }}>Create report </Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/update car status" style={{ textDecoration: 'none', color: 'white' }}>Update car status </Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
