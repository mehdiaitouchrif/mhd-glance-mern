import React from 'react'
import Image from '../../../img/wishlist.svg'

const Wishlist = () => {
    return (
        <div className={`wishlist`}>
            <h1 className="wishlist__head">Wishlist</h1>
            <div className="wishlist__products">
                <img className='wishlist__picture' src={Image} alt="Wishlist SVG" />
                <h1 className='wishlist__message'>Your wishlist is empty!</h1>
            </div>
        </div>
    )
}

export default Wishlist
