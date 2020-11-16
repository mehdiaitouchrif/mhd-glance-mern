import React, { useEffect } from 'react'
import Order from './Order'
import Spinner from '../../layout/Spinner'
import { connect } from 'react-redux'
import { getOrders } from '../../../actions/ordersActions'
import PropTypes from 'prop-types'


const Orders = ({ getOrders, loading, orders }) => {
    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='orders'>
            <h2 className="secondary-heading">Orders</h2>
            {!loading && orders && orders.length === 0 && (
                <div className="orders__empty">
                    <img src="" alt="Orders SVG" />
                    <p className="lead text-center my-2">You have no orders for now!</p>
                </div>
            )}
            {loading && !orders || !orders && <Spinner />}
            {orders && orders.length > 0 && (
                <div className="orders__head">
                    <p>Order Name</p>
                    <p>Size</p>
                    <p>Status</p>
                    <p>Date Ordered</p>
                    <p>Quantity * Price</p>
                    <p>Customer Name</p>
                    <p>Action</p>
                </div>
            )}
            {orders && orders.map(order => <Order key={order._id} order={order} />)}
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    loading: state.orders.loading
})

Orders.propTypes = {
    orders: PropTypes.array,
    getOrders: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}

export default connect(mapStateToProps, { getOrders })(Orders)
