import React, { useState, useEffect } from 'react'
import Products from './Products';
import Dashboard from './Dashboard';
import Customers from './Customers';
import Orders from './Orders';
import { connect } from 'react-redux';
import { getOrders } from '../../../actions/ordersActions'
import { getCustomers } from '../../../actions/customersActions'
import { Redirect } from 'react-router-dom';
import Spinner from '../../layout/Spinner';

const Admin = ({ auth: { isAuthenticated, user, loading }, getCustomers, getOrders }) => {
    useEffect(() => {
        getOrders();
        getCustomers()
    }, [])

    const [displayedComponent, setDisplayedComponent] = useState('dashboard');
    const [active, setActive] = useState('dashboard');

    const changeDisplayedComponent = (componentToDisplay) => {
        setDisplayedComponent(componentToDisplay)
        setActive(componentToDisplay)
    }

    useEffect(() => {
        if (localStorage.getItem('adminComponent')) {
            setDisplayedComponent(localStorage.getItem('adminComponent'))
            setActive(localStorage.getItem('adminComponent'))
        }
    }, [localStorage.getItem('adminComponent')])

    if (loading && isAuthenticated) {
        return <Spinner />
    }

    if (user && user.data.role !== 'admin') {
        return <Redirect to='/user' />
    }


    return (
        <div className='admin'>
            <div className="container">
                <div className="admin-area">
                    <ul className="admin-area__list">
                        <div className={active === 'dashboard' ? active.toString() : ''} onClick={() => changeDisplayedComponent('dashboard')}>
                            <span className='first'><i className="fas fa-table"></i></span>
                            <li>Dashboard</li>
                        </div>
                        <div className={active === 'products' ? active.toString() : ''} onClick={() => changeDisplayedComponent('products')}>
                            <span className='second'><i className="fas fa-tshirt"></i></span>
                            <li>Products</li>
                        </div>
                        <div className={active === 'orders' ? active.toString() : ''} onClick={() => changeDisplayedComponent('orders')}>
                            <span className='third'><i className="fas fa-cart-plus"></i></span>
                            <li>Orders</li>
                        </div>
                        <div className={active === 'customers' ? active.toString() : ''} onClick={() => changeDisplayedComponent('customers')}>
                            <span className='fourth'><i className="fas fa-user-friends"></i></span>
                            <li>Customers</li>
                        </div>
                    </ul>
                </div>

                {displayedComponent === 'dashboard' && <Dashboard changeDisplayedComponent={changeDisplayedComponent} />}
                {displayedComponent === 'orders' && <Orders />}
                {displayedComponent === 'products' && <Products />}
                {displayedComponent === 'customers' && <Customers />}

            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getOrders, getCustomers })(Admin)
