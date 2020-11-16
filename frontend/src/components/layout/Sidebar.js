import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productsActions'
import { useState } from 'react'
import { useEffect } from 'react'

const Sidebar = ({ getProducts }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        getProducts(query)
    }, [query])

    const [active, setActive] = useState('popular');
    localStorage.setItem('active', active)

    const onClick = (query, category) => {
        setActive(category)
        setQuery(query)
    }

    return (
        <div className='sidebar'>
            <p className="sidebar__title">Explore? </p>
            <ul className='sidebar__list'>
                <div className={active === 'popular' ? 'active' : ''} onClick={() => onClick('', 'popular')}>
                    <i className="fas fa-star"></i>
                    <li>Popular</li>
                </div>
                <div className={active === 'recent' ? 'active' : ''} onClick={() => onClick('category=main', 'recent')} >
                    <i className="far fa-clock"></i>
                    <li>Recent</li>
                </div>
                <div className={active === 'fashion' ? 'active' : ''} onClick={() => onClick('category=fashion', 'fashion')}>
                    <i className="fas fa-tshirt"></i>
                    <li>Fashion</li>
                </div>
                <div className={active === 'electronics' ? 'active' : ''} onClick={() => onClick('category=electronics', 'electronics')}>
                    <i className="fas fa-mobile"></i>
                    <li>Electronics</li>
                </div>
                <div className={active === 'watches' ? 'active' : ''} onClick={() => onClick('category=watches', 'watches')}>
                    <i className="fas fa-clock"></i>
                    <li>Watches</li>
                </div>
                <div className={active === 'accessories' ? 'active' : ''} onClick={() => onClick('category=accessories', 'accessories')}>
                    <i className="fas fa-hat-wizard"></i>
                    <li>Accessories</li>
                </div>
                <div className={active === 'shoes' ? 'active' : ''} onClick={() => onClick('category=shoes', 'shoes')}>
                    <i className="fas fa-shoe-prints"></i>
                    <li>Shoes</li>
                </div>
            </ul >
        </div >
    )
}

export default connect(null, { getProducts })(Sidebar)
