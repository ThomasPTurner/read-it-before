import React from 'react';
import '../styles/Footer.css'

function Footer(props) {
    return (
        <div className="footer">
            <p className='footerText'>Created by Thomas Turner</p>
            <a  href="https://github.com/ThomasPTurner/read-it-before">
                <i className="fab fa-github fa-2x"></i>
            </a>
        </div>
    );
}
export default Footer
