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
                
                {/* Search Form */}
                <form style={{ marginLeft: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="Search..."
                        style={{ 
                            fontSize: '18px', 
                            padding: '5px 10px',
                            border: '2px solid white',
                            borderRadius: '5px',
                            color: 'white',
                            background: 'transparent',
                            outline: 'none'
                        }}
                    />
                </form>
                <ul style={{ listStyleType: 'none', display: 'flex', margin: '0', padding: '0', fontSize: '30px' }}>
                    <li style={{ margin: '0 20px' }}><Link to="/catalog" style={{ textDecoration: 'none', color: 'white' }}>Catalog</Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/reservations" style={{ textDecoration: 'none', color: 'white' }}>Reservations</Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/account" style={{ textDecoration: 'none', color: 'white' }}>Account</Link></li>
                    <li style={{ margin: '0 20px' }}><Link to="/admin" style={{ textDecoration: 'none', color: 'white' }}>Admin</Link></li>
                   
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
