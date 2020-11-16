import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__social-media">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
                <div className="footer__copy">
                    <p>&copy; Copyrights 2020 MHD GLANCE</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
