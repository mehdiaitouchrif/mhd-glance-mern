import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productsActions';
import PropTypes from 'prop-types'
import Product from './Product';
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner';

const Products = ({ loading, getProducts, products }) => {
    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [getProducts]);

    if (loading && !products || !products) {
        return <div className="container">
            <Spinner />
        </div>
    }

    return (
        <div className='products'>
            <p className="lead">{localStorage.getItem('active').toUpperCase()}</p>
            {products && products.length === 0 && <p>No products currently under  #<strong className='capitalize'>{localStorage.getItem('active')} category.</strong></p>}
            <div>
                {products && products.map(product => <Link className='decoration-none' key={product._id} to={`/products/${product.name}/${product._id}`} ><Product product={product} /></Link>)}
            </div>
        </div>
    )
}


Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading
})

export default connect(mapStateToProps, { getProducts })(Products)
