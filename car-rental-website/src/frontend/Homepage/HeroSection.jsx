import React from 'react';

function HeroSection() {
    const imageUrl = '/images/Herosection.jpg'; // Assuming the image is in the public/images folder

    return (
        <section className="hero-section" style={{
            height: '90vh',
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginTop: '0px',
            fontFamily: "'Playfair Display', serif"
        }}>
            <img src={imageUrl} alt="Car Rental Service" style={{
                width: '100%',
                height: '90%',
                objectFit: 'cover',
                position: 'fixed',
                zIndex: -10
            }} />
            {/* Overlay div */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
                zIndex: -1
            }}></div>
            <div style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: "'Playfair Display', serif",
                fontSize: '25px'
            }}>
                <h1>Welcome to Our Car Rental Service</h1>
                <p>Reserve your car today and enjoy seamless rental service worldwide.</p>
                <button style={{
                    marginTop:'20px',
                    padding: '10px 25px',
                    fontSize: '16px',
                    background: 'linear-gradient(145deg,rgb(146, 149, 150), #a4c0c9)',
                    color: 'white',
                    borderRadius: '5px',
                    fontFamily: "'Playfair Display', serif",
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                    e.target.style.background = 'linear-gradient(145deg, #a4c0c9,rgb(99, 105, 107))';
                    e.target.style.color = '#fff';
                    e.target.style.border = '2px solid #ffffff';
                }}
                onMouseOut={e => {
                    e.target.style.background = 'linear-gradient(145deg,rgb(66, 70, 71), #a4c0c9)';
                    e.target.style.color = 'white';
                    e.target.style.border = '2px solidrgb(68, 73, 74)';
                }}
                >
                    Reserve Now
                </button>
            </div>
        </section>
    );
}

export default HeroSection;
