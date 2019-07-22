import React from 'react';
import '../styles/Footer.css'

function Footer(props) {
    return (
        <div className="footer">
            <p className='footerText'>Created by Thomas Turner</p>
            <a  href="https://github.com/ThomasPTurner/read-it-before">
                <img className="gitHubIcon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github logo"></img>
            </a>
        </div>
    );
}
export default Footer
