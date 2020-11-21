import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import { placeOrder } from '../../actions/ordersActions'
import { getProduct } from '../../actions/productsActions'
import { setAlert } from '../../actions/alertsActions'
import Alert from '../layout/Alert'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import Image from '../../img/secure.jpg'

const Buy = ({ match, user, placeOrder, getProduct, loading, product, error, setAlert, alerts }) => {
    useEffect(() => {
        getProduct(match.params.id)
    }, [])

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        email: '',
        address: '',
        zipcode: ''
    })
    const { firstName, lastName, city, email, address, zipcode, country } = form;

    // Payment method state
    const [method, setMethod] = useState('card')

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setMethod(e.target.value)
    }

    const [order, setOrder] = useState('');

    // Disable form on submit
    const disableForm = (target) => {
        const formsInputs = Array.from(target.elements);
        formsInputs.forEach(input => {
            if (input.className === 'input') {
                input.setAttribute('disabled', true)
                input.classList.add('input-success')
            }
        })
    }


    const onSubmit = e => {
        e.preventDefault();
        if (firstName !== '' && lastName !== '' && email !== '' && city !== '' && zipcode !== '' && address !== '') {
            setOrder({
                name: `${firstName} ${lastName}`,
                email,
                city,
                size: match.params.size,
                quantity: +match.params.quantity,
                product: match.params.id,
                user: user.data._id,
                zipcode,
                address
            })

            disableForm(e.target)
            setAlert('Address Saved', 'success')
        } else {
            setAlert('Please fill in all fields', 'danger')
        }
    }

    const onBuy = () => {
        if (error) {
            error.error.map(err => {
                return Object.keys(err).map(key => setAlert(err[key], 'danger'))
            })
        } else {
            placeOrder(order)
            setAlert('Order placed successfuly', 'success')
        }

    }


    return (
        <div className='buy'>
            <div className="container">
                <form className='form' onSubmit={onSubmit}>
                    <div>
                        <h2 className='secondary-heading'>Shipping Information</h2>
                        {alerts && <Alert />}
                        <div>
                            <input className='input' type="text" name='firstName' value={firstName} className="input" onChange={onChange} placeholder='First Name' />
                            <input className='input' type="text" name='lastName' value={lastName} className="input" onChange={onChange} placeholder='Last Name' />
                            <input className='input' type="email" name='email' value={email} className="input" onChange={onChange} placeholder='Email' />
                            <input className='input' type="text" name='country' value={country} className="input" onChange={onChange} placeholder='Country' />
                            <input className='input' type="text" name='city' value={city} className="input" onChange={onChange} placeholder='City' />
                            <input className='input' type="text" name='address' value={address} className="input" onChange={onChange} placeholder='Address' />
                            <input className='input' type="text" name='zipcode' value={zipcode} className="input" onChange={onChange} placeholder='Zipcode' />
                            <input type="submit" disabled={order !== ''} value="Confirm" className='btn btn--lg btn--block my-1' />
                        </div>
                    </div>
                </form>
                <div className="order-summary">
                    <h2 className="secondary-heading order-summary__heading">Review Order</h2>
                    <div className="order-summary__head">
                        <p>ITEM</p>
                        <p>Quantity</p>
                        <p>Price</p>
                    </div>
                    <div className="order-summary__item">
                        {loading && !product && <Spinner />}
                        {!loading && product && (
                            <Fragment>
                                <div>
                                    <img src={`/uploads/${product.image}`} alt="Item Picture" />
                                    <p>{product.name}</p>
                                </div>
                                <p>{match.params.quantity}</p>
                                <p>{+match.params.quantity * +product.price}</p>
                            </Fragment>
                        )}
                    </div>
                    <div className="order-summary__summary">
                        {!loading && product && (
                            <Fragment>
                                <div className='flex-row'>
                                    <p className='cart__total'>Item total</p>
                                    <p className='cart__total'>${(+match.params.quantity * +product.price).toFixed(2)}</p>
                                </div>
                                <div className='flex-row'>
                                    <p className='cart__shipping'>Shipping</p>
                                    <p className='cart__shipping'>$0.00</p>
                                </div>
                                <div className='flex-row'>
                                    <p className='cart__order-total'><strong>Grand total</strong></p>
                                    <p className='cart__order-total'>${(+match.params.quantity * +product.price).toFixed(2)}</p>
                                </div>
                                <button onClick={onBuy} disabled={order === ''} className='btn btn--lg btn--block'>Process Order</button>
                            </Fragment>
                        )}
                        <div>
                            <img src={Image} alt="Secure Payment" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


const mapStateToProps = state => ({
    user: state.auth.user,
    product: state.products.product,
    loading: state.products.loading,
    error: state.orders.error,
    alerts: state.alerts
})

Buy.propTypes = {
    user: PropTypes.object,
    getProduct: PropTypes.func.isRequired,
    placeOrder: PropTypes.func.isRequired,
    product: PropTypes.object,
    loading: PropTypes.bool,
}

export default connect(mapStateToProps, { placeOrder, getProduct, setAlert })(Buy)
