import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSearchResults } from '../../actions/productsActions'
import Product from '../products/Product'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

const Search = ({ match, products, getSearchResults }) => {
    const [results, setResults] = useState('')

    useEffect(() => {
        getSearchResults(match.params.query)
    }, [match.params.query, results])


    const [prices, setPrices] = useState([
        [0.01, 5],
        [5.01, 10],
        [10.01, 20],
        [20.01, 50],
        [50.01, 100],
        [100.01, 200],
        [200.01, 500],
        [500.01, +100000]
    ])

    const [minMax, setMinMax] = useState({
        min: '',
        max: ''
    })

    const { min, max } = minMax;

    const onChange = e => {
        setMinMax({ ...minMax, [e.target.name]: e.target.value })
    }


    const filterByDefinedPrices = (priceInterval) => {
        products && setResults(products.filter(product => product.price >= priceInterval[0] && product.price <= priceInterval[1]))
    }

    const filterByUserPrice = (e, priceInterval) => {
        e.preventDefault()
        products && setResults(products.filter(product => product.price >= priceInterval.min && product.price <= priceInterval.max))
    }

    const [active, setActive] = useState('');
    const sort = (option) => {
        if (option === 'ascending') {
            products && setResults(products.sort((a, b) => (a.price > b.price) ? 1 : -1))
            setActive('ascending')
        } else if (option === 'descending') {
            products && setResults(products.sort((a, b) => (a.price > b.price) ? -1 : 1))
            setActive('descending')
        } else {
            products && setResults(products.sort((a, b) => (a.createdAt < b.createdAt) ? -1 : 1))
            setActive('recent')
        }
    }


    return (
        <div className='search'>
            <div className="container">
                <div className="filters">
                    <div className="filters__filter">
                        <p className="filters__title">Price:</p>
                        <div className='filters__prices'>
                            {prices.map((price, index) => (
                                <div key={uuidv4()} onClick={() => filterByDefinedPrices(price)} className='filters__price'>{'$' + price.join(' - $')} </div>
                            ))}
                            <form className='filters__form' onSubmit={(e) => filterByUserPrice(e, { min, max })}>
                                <input type="text" placeholder='Min' name='min' value={min} onChange={onChange} />
                                <span>-</span>
                                <input type="text" placeholder='Max' name='max' value={max} onChange={onChange} />
                                <input type="submit" value="OK" />
                            </form>
                        </div>
                    </div>
                    <div className="filters__filter">
                        <p className='filters__title'>Sort by:</p>
                        <div className={`filters__sort ${active === 'recent' ? 'active' : ''}`} onClick={() => sort('recent')} >Newest</div>
                        <div className={`filters__sort ${active === 'ascending' ? 'active' : ''}`} onClick={() => sort('ascending')} >Lowest to Highest</div>
                        <div className={`filters__sort ${active === 'descending' ? 'active' : ''}`} onClick={() => sort('descending')} >Highest to Lowest</div>
                    </div>
                </div>
                <div className="products">
                    <p className="lead uppercase mb-1">Results for "<strong>{match.params.query}</strong>"</p>
                    <div>
                        {products && !results && products.map(product => <Link className='decoration-none' key={product._id} to={`/products/${product.name}/${product._id}`} ><Product product={product} /></Link>)}
                        {results && results.map(product => <Link className='decoration-none' key={product._id} to={`/products/${product.name}/${product._id}`} ><Product product={product} /></Link>)}
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    products: state.products.products
})

Search.propTypes = {
    products: PropTypes.array,
    getSearchResults: PropTypes.func,
}

export default connect(mapStateToProps, { getSearchResults })(Search)
