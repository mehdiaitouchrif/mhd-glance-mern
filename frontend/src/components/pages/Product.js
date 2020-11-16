import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProduct, addToCart } from '../../actions/productsActions';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert'
import { setAlert } from '../../actions/alertsActions'

const Product = (props) => {
    const { loading, getProduct, product, match, addToCart, setAlert, alerts } = props;

    useEffect(() => {
        getProduct(match.params.id)
        // eslint-disable-next-line
    }, [])

    const [select, setSelect] = useState({
        size: '',
        qty: 1
    });

    // for buy button
    const [clicked, setClicked] = useState(false)

    if (loading && !product || !product) return (
        <div className='container'>
            <Spinner />
        </div>
    )

    const { name, price, description, inStock, size, _id, image } = product;

    // Create an array of quantities from inStock numbers
    let qtyArr = [];
    for (let i = 1; i <= inStock; i++) {
        qtyArr[i] = i;
    }


    const selectChange = (e) => {
        setSelect({ ...select, [e.target.name]: e.target.value })
    }

    const onAdd = () => {
        const newCartItem = {
            ...product,
            quantity: select.qty,
            size: select.size,
            price: +price * +select.qty
        }

        if (select.size === '' || select.size === 'Please select a size') {
            setAlert('Please select a size', 'danger')
        } else {
            addToCart(newCartItem)
            setAlert('Item added to cart', 'success')
        }
    }

    const onBuy = () => {
        if (select.size === '') {
            setAlert('Please select a size', 'danger')
        } else {
            setClicked(true)
        }
    }


    if (clicked) {
        return <Redirect to={`/buy/${name}/${select.size}/${select.qty}/${_id}`} />
    }
    return (
        <div className='single-product my-3'>
            <div className="container grid grid-2">
                <div className="single-product__picture">
                    <img src={`/uploads/${image}`} />
                </div>
                <div className="single-product__text">
                    {alerts && <Alert />}
                    <h1 className='single-product__title'>{name} </h1>
                    <p className="lead single-product__desc">{description}</p>
                    <p className="single-product__price">${price}</p>
                    <form className='single-product__form'>
                        <select onChange={selectChange} name='size' className='single-product__select'>
                            <option>Select A Size</option>
                            {size.map(size => (
                                <option key={size}>{size}</option>
                            ))}
                        </select>
                        <select name="qty" onChange={selectChange} className='single-product__select'>
                            {qtyArr.map(item => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </form>
                    {+select.qty === inStock && <p className='single-product__msg lead my-1'>Maximun available quantity is {inStock}</p>}
                    <div className="btn-block">
                        <p className='btn single-product__link' onClick={onAdd} >Add to cart</p>
                        <button onClick={onBuy} className='btn btn--lg single-product__link'>Buy</button>
                        <Link to='/' className='single-product__link'><i className="fas fa-heart"></i> Add to wishlist</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.products.product,
    loading: state.products.loading,
    cart: state.products.cart,
    alerts: state.alerts

})

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    product: PropTypes.object,
    cart: PropTypes.array,
    setAlert: PropTypes.func,
}

export default connect(mapStateToProps, { getProduct, addToCart, setAlert })(Product)
