import React from 'react'
import { connect } from 'react-redux'
import { cancelOrder } from '../../../actions/ordersActions'
import PropTypes from 'prop-types'
import { setAlert } from '../../../actions/alertsActions'
import { useEffect } from 'react'

const Order = ({ order, cancelOrder, setAlert, error }) => {
    const { quantity, status, _id } = order;

    useEffect(() => {
        console.log('update orders')
    }, [cancelOrder])

    const onDelete = () => {
        if (error) {
            setAlert(error.message, 'danger')
        } else {
            cancelOrder(_id)
            setAlert('Order cancelled successfuly', 'success')
        }
    }

    return (
        <div className='order'>
            <div className="order__picture">
                <img src={`/uploads/${order.product.image}`} alt="Order Image" />
            </div>
            <div className="order__details">
                <div className="order__text">
                    <p className='order__name'>{order.product.name}</p>
                    <p className='order__qty'>{quantity} * {order.product.price} </p>
                    <p className='order__total'>{quantity * +order.product.price} </p>
                    <p className='order__status'>{status}</p>
                </div>
            </div>
            <div className="order__cancel">
                <p onClick={onDelete}>X</p>
            </div>
        </div>
    )
}

Order.propTypes = {
    cancelOrder: PropTypes.func.isRequired,
}

export default connect(null, { cancelOrder, setAlert })(Order)
