import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteFromCart } from '../../actions/productsActions'
import { setAlert } from '../../actions/alertsActions'


const CartItem = ({ item, deleteFromCart, setAlert }) => {
    const { name, description, price, _id, quantity, size, image } = item;

    const onDelete = () => {
        deleteFromCart(_id)
        setAlert('Item deleted from cart', 'success');
    }

    return (
        <div className="cart-item">

            <div className="cart-item__picture">
                <Link to={`/products/${name}/${_id}`}>
                    <img src={`/uploads/${image}`} alt="Cart Item Picture" />
                </Link>
            </div>
            <div className="cart-item__text">
                <div className="flex-row">
                    <p className='cart-item__name'>{name}</p>
                    <div>
                        <span className='mx-1' onClick={onDelete}><i className="fas fa-heart fa-2x"></i> </span>
                        <span onClick={onDelete}><i className="fas fa-trash fa-2x"></i> </span>
                    </div>
                </div>
                <p className='cart-item__desc'>{description}</p>
                <p className='cart-item__price'>${price}</p>
                <p className='cart-item__desc'>Size: <strong>{size}</strong> | Qty: <strong>{quantity}</strong></p>
            </div>
        </div>
    )
}


export default connect(null, { deleteFromCart, setAlert })(CartItem)
