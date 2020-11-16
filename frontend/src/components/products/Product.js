import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ product }) => {
    const { name, price, image } = product;

    return (
        <div className='product'>
            <div className="product__picture">
                <img src={`/uploads/${image}`} />
            </div>
            <div className='product__text'>
                <p className='product__name'>{name}</p>
                <h1 className='product__price'>${price}</h1>
            </div>
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
}

export default Product
