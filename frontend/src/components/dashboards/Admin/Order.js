import React from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { cancelOrder, updateOrder } from '../../../actions/ordersActions'

const Order = ({ order, cancelOrder, updateOrder }) => {
    const { name, size, createdAt, quantity, status, _id } = order;

    const onDelete = () => {
        cancelOrder(_id)
    }

    const onShip = () => {
        updateOrder({ _id, status: 'delivered' })
    }

    return (
        <div className='orders__order'>
            <p>{order.product.name}</p>
            <p>{size}</p>
            <p>{status}</p>
            <p>{moment(createdAt).format('MMMM Do YYYY')}</p>
            <p>{quantity} * ${order.product.price}</p>
            <p>{name}</p>
            <div className='orders__actions'>
                <div onClick={onShip} className="orders__action"><i className="fas fa-check"></i></div>
                <div onClick={onDelete} className="orders__action"><i className="fas fa-times"></i></div>
            </div>
        </div>
    )
}


export default connect(null, { cancelOrder, updateOrder })(Order)
