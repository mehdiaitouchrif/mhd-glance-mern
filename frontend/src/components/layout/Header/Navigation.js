import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom';
import { getFromCart, getProducts } from '../../../actions/productsActions';
import { logout } from '../../../actions/authActions';
import { connect } from 'react-redux';

const Navigation = ({ title, getFromCart, getProducts, cart, logout, auth: { isAuthenticated, loading, user } }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        getFromCart();
        // eslint-disable-next-line
    }, [])

    const history = useHistory()
    const onSearch = (e) => {
        e.preventDefault();
        if (query !== '') {
            history.push(`/search/${query}`)
            getProducts('', query)
            localStorage.setItem('search', query)
        } else {
            history.push('/')
        }
    }

    const [profile, setProfile] = useState(false)

    const onMouseOver = () => {
        setProfile(true)
    }

    const onMouseLeave = () => {
        setProfile(false)
    }

    const onClick = () => {
        if (profile) {
            setProfile(false)
        } else {
            setProfile(true)
        }
    }

    const changeComponent = (component) => {
        if (user && user.data.role === 'admin') {
            localStorage.setItem('adminComponent', component)
        }
        if (user && user.data.role === 'user') {
            localStorage.setItem('userComponent', component)
        }
    }

    const onLogout = () => {
        if (user && user.data.role === 'user') {
            localStorage.removeItem('userComponent')
        }
        if (user && user.data.role === 'admin') {
            localStorage.removeItem('adminComponent')
        }
        logout()
    }

    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleSearchBar = () => {
        if (showSearchBar) {
            setShowSearchBar(false)
        } else {
            setShowSearchBar(true)
        }
    }

    return (
        <nav className='navigation' onMouseLeave={onMouseLeave}>
            <div className="container">
                <h1 className="navigation__logo">
                    <Link className='decoration-none' to="/">
                        {title}
                    </Link>
                </h1>

                <div className={`search-bar ${showSearchBar ? 'd-block' : ''}`}>
                    <form className='search-bar__form' onSubmit={onSearch}>
                        <input
                            type='text'
                            placeholder='What do you want to find?'
                            value={query}
                            className='search-bar__input '
                            onChange={e => setQuery(e.target.value)} />
                    </form>
                    <button className='search-bar__button' onClick={handleSearchBar}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="navigation__right">
                    <div className="navigation__search">
                        <i className="fas fa-search"></i>
                        <form onSubmit={onSearch}>
                            <input
                                type='text'
                                placeholder='What do you want to find?'
                                className={`navigation__input`}
                                value={query}
                                onChange={e => setQuery(e.target.value)} />
                            <input type='submit' value='Search' className='btn navigation__btn' />
                        </form>
                    </div>

                    <ul className="navigation__links">
                        <li onMouseOver={onMouseOver} onClick={onClick}><Link to='/user' className="navigation__link"><i className="fas fa-user-circle"></i></Link></li>
                        <li><Link to='/cart' className="navigation__link decoration-none"><i className="fas fa-shopping-cart"></i>{cart && cart.length > 0 && (<span>{cart.length}</span>)}</Link></li>
                        <li onClick={handleSearchBar} className={`navigation__link navigation__link--search`}><i className="fas fa-search"></i></li>
                    </ul>

                    {isAuthenticated && user && (
                        <div className={`navigation__hover-menu d-none ${profile && 'd-block'}`}>
                            <div onMouseLeave={onMouseLeave}>
                                <ul className="navigation__list">
                                    {user.data.role === 'user' && (
                                        <Fragment>
                                            <Link to='/user' className="navigation__profile decoration-none">
                                                <p>{user && user.data.name[0]}</p>
                                                <div>
                                                    <p>{user && user.data.name}</p>
                                                    <small>Go to dashboard</small>
                                                </div>
                                            </Link>
                                            <Link onClick={() => changeComponent('wishlist')} className='decoration-none' to='/user'>
                                                <i className="fas fa-heart"></i>
                                                <li>Wishlist</li>
                                            </Link>
                                            <Link onClick={() => changeComponent('orders')} className='decoration-none' to='/user'>
                                                <i className="fas fa-clipboard-list"></i>
                                                <li>My Orders</li>
                                            </Link>
                                        </Fragment>
                                    )}
                                    {user.data.role === 'admin' && (
                                        <Fragment>
                                            <Link onClick={() => changeComponent('dashboard')} to='/admin' className="navigation__profile decoration-none">
                                                <p>{user && user.data.name[0]}</p>
                                                <div>
                                                    <p>{user && user.data.name}</p>
                                                    <small>Go to dashboard</small>
                                                </div>
                                            </Link>
                                            <Link onClick={() => changeComponent('products')} className='decoration-none' to='/admin'>
                                                <i className="fas fa-tshirt"></i>
                                                <li>Products</li>
                                            </Link>
                                            <Link onClick={() => changeComponent('orders')} className='decoration-none' to='/admin'>
                                                <i className="fas fa-cart-plus"></i>
                                                <li>Orders</li>
                                            </Link>
                                            <Link onClick={() => changeComponent('customers')} className='decoration-none' to='/admin'>
                                                <i className="fas fa-user-friends"></i>
                                                <li>Customers</li>
                                            </Link>
                                        </Fragment>
                                    )}
                                    <div onClick={onLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                        <li>Logout</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav >
    )
}

Navigation.defaultProps = {
    title: 'MHD GLANCE'
}

Navigation.propTypes = {
    title: PropTypes.string.isRequired,
    getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    cart: state.products.cart,
    auth: state.auth
})
export default connect(mapStateToProps, { getFromCart, logout, getProducts })(Navigation)
