import React, { useState } from 'react'

const Newsletter = () => {
    const [email, setEmail] = useState('');

    return (
        <div className='newsletter'>
            <div className="container">
                <h1 className='newsletter__head'><span>Subscribe to our newsletter</span></h1>
                <h2 className='newsletter__message'>Discover our latest collections, news and exclusive offers from our store MHD GLANCE</h2>
                <form className="newsletter__form">
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='newletter__email'
                        placeholder="E-mail" />
                    <input type="submit" value="Subscribe" />
                </form>
            </div>
        </div>
    )
}

export default Newsletter
