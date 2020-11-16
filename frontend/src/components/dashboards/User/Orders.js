import React, { useEffect, Fragment } from 'react'
import Order from './Order'
import { connect } from 'react-redux';
import { getUserOrders } from '../../../actions/ordersActions';
import PropTypes from 'prop-types'
import Spinner from '../../layout/Spinner'
import Alert from '../../layout/Alert'

const Orders = ({ getUserOrders, userOrders, loading, user, alerts, error }) => {
    useEffect(() => {
        getUserOrders(user.data._id)
    }, [alerts])

    return (
        <div className={`orders`}>
            <h1 className="orders__head">Orders</h1>
            {alerts && <Alert />}
            {loading && <Spinner />}
            <div className="orders__products">
                {!loading && !userOrders || userOrders && userOrders.length === 0 && (
                    <Fragment>
                        <img className='orders__picture' src="/uploads/order.svg" alt="Wishlist SVG" />
                        <h1 className='orders__message'>Your have no orders yet!</h1>
                    </Fragment>
                )}
                {userOrders && userOrders.length > 0 && (
                    <div className="order__head">
                        <p>Image</p>
                        <p>Name</p>
                        <p>Quantity * Price</p>
                        <p>Total Price</p>
                        <p>Status</p>
                    </div>
                )}
                {!loading && userOrders && userOrders.map(order => <Order error={error} order={order} key={order._id} />)}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userOrders: state.orders.userOrders,
    loading: state.orders.loading,
    user: state.auth.user,
    alerts: state.alerts,
    error: state.orders.error
})

Orders.propTypes = {
    userOrders: PropTypes.array,
    getUserOrders: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    alerts: PropTypes.array,
}

export default connect(mapStateToProps, { getUserOrders })(Orders)
