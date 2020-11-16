import React, { useState } from 'react'
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import Wishlist from './Wishlist';
import Orders from './Orders'
import { useEffect } from 'react';


const User = ({ loading, user }) => {
    const [displayedComponent, setDisplayedComponent] = useState('orders');
    const [active, setActive] = useState('orders');

    const changeDisplayedComponent = (componentToDisplay) => {
        setDisplayedComponent(componentToDisplay)
        setActive(componentToDisplay)
    }

    useEffect(() => {
        if (localStorage.getItem('userComponent')) {
            setDisplayedComponent(localStorage.getItem('userComponent'))
            setActive(localStorage.getItem('userComponent'))
        }
    }, [localStorage.getItem('userComponent')])

    if (user) {
        if (user.data.role === 'admin') {
            return <Redirect to='/admin' />
        }
    }

    return (
        <div className='user'>
            <div className="container">
                <div className="profile">
                    {loading && !user && <Spinner />}
                    <div className="profile__picture">{user.data.name[0]} </div>
                    <h1 className='profile__name'> {user.data.name}</h1>
                    <ul className="profile__list">
                        <li onClick={() => changeDisplayedComponent('orders')} className={`profile__item profile__item--${active === 'orders' && 'active'}`}>My Orders</li>
                        <li onClick={() => changeDisplayedComponent('wishlist')} className={`profile__item profile__item--${active === 'wishlist' && 'active'}`}>My Wishlist</li>
                    </ul>
                </div>
                {displayedComponent === 'orders' && <Orders />}
                {displayedComponent === 'wishlist' && <Wishlist />}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.auth.loading
})

User.propTypes = {
    loading: PropTypes.bool,
}

export default connect(mapStateToProps, null)(User)
