import React, { useEffect } from 'react'
import Product from './Product';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/productsActions';
import PropTypes from 'prop-types'


const Products = ({ getProducts, products, loading }) => {
    useEffect(() => {
        getProducts();
    }, [getProducts])

    return (
        <div className="products">
            <h2 className='secondary-heading'>Products</h2>
            <div className="products__head">
                <p>Product Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>In Stock</p>
                <p>Sizes</p>
                <p>Price</p>
                <p>Action</p>
            </div>
            {loading && !products || !products && <Spinner />}
            {products && products.map(product => <Product key={product._id} product={product} />)}
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading
})

Products.propTypes = {
    products: PropTypes.array,
    getProducts: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}
export default connect(mapStateToProps, { getProducts })(Products)
