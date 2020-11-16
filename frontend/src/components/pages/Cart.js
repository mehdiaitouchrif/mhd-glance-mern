import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getFromCart } from '../../actions/productsActions'
import CartItem from '../products/CartItem';
import Alert from '../layout/Alert';
import Image from '../../../src/img/cart.svg'

const Cart = ({ cart, getFromCart, alerts }) => {
    useEffect(() => {
        getFromCart();
        // eslint-disable-next-line
    }, [])

    // Create an array of prices
    let ArrPrices = [];
    cart && cart.map(item => ArrPrices = [...ArrPrices, item.price]);

    // Calculate
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prices = [...ArrPrices];

    // State
    const [sum, setSum] = useState(0);

    // Set Sum & Update
    useEffect(() => {
        if (ArrPrices.length > 0) {
            const sum = prices.reduce(reducer);
            setSum(sum)
        }
    }, [ArrPrices])

    return (
        <div className='cart'>
            <div className="container">
                <div className="cart__items">
                    <h1 className='cart__head'>Items In Cart</h1>
                    {cart && cart.length === 0 && (
                        <div className="cart__empty">
                            <img src={Image} className='empty' alt="Cart Empty" />
                            <p className="lead my-2 text-center">Your cart is empty!</p>
                        </div>
                    )}
                    <div className='cart__items--container'>
                        {cart && cart.map(item => <CartItem key={item._id} item={item} />)}
                    </div>
                </div>
                {alerts && <Alert />}
                <div className="cart__summary">
                    <h1 className='cart__head'>Order Summary</h1>
                    <div className='flex-row'>
                        <p className='cart__total'>Item total</p>
                        <p className='cart__total'>${sum.toFixed(2)}</p>
                    </div>
                    <div className='flex-row'>
                        <p className='cart__shipping'>Shipping</p>
                        <p className='cart__shipping'>$0.00</p>
                    </div>
                    <div className='flex-row'>
                        <p className='cart__order-total'>Order total</p>
                        <p className='cart__order-total'>${sum.toFixed(2)}</p>
                    </div>
                    <button className='btn btn--block'>Checkout</button>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    cart: state.products.cart,
    alerts: state.alerts
});



export default connect(mapStateToProps, { getFromCart })(Cart)
