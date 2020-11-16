import React from 'react'
import { Link } from 'react-router-dom'
import Chart from '../../layout/Chart'
import { connect } from 'react-redux'
import moment from 'moment'

const Dashboard = ({ changeDisplayedComponent, orders }) => {
    return (
        <div className="dashboard">
            <h2 className='secondary-heading'>Dashboard</h2>
            <div className='grid'>
                <Link to='/admin/add' className='dashboard__box decoration-none'>
                    <i className="fas fa-dolly-flatbed"></i>
                        Add new products
                </Link>
                <div onClick={() => changeDisplayedComponent('products')} className="dashboard__box">
                    <i className='fas fa-database'></i>
                Manage your inventory, edit products, ...etc.
            </div>
                <div onClick={() => changeDisplayedComponent('orders')} className="dashboard__box">
                    <i className='fas fa-truck'></i>
                Handle orders, ship products...
            </div>
            </div>
            <div className='dashboard__sales'>
                <div className='graph'>
                    <Chart />
                </div>
                <div>
                    <p className="lead">LATEST SALES</p>
                    {orders && orders.map((order, index) => index < 3 && (
                        <div key={order._id} className="dashboard__sale">
                            <p><strong>{order.name}</strong> ordered <strong>{order.product.name}</strong></p>
                            <small>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.orders.orders
})

export default connect(mapStateToProps)(Dashboard)
