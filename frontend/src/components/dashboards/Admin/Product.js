import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from '../../../actions/productsActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Product = ({ product, deleteProduct }) => {
    const { name, price, size, category, inStock, _id, image } = product;

    const onDelete = () => {
        deleteProduct(_id)
    }

    return (
        <div className='products__product'>
            <img src={`/uploads/${image}`} alt="" />
            <p>{name}</p>
            <p>{category}</p>
            <p>{inStock}</p>
            <p>{size.join(', ')}</p>
            <p><strong>${price}</strong></p>
            <div className='products__actions'>
                <Link to={`/admin/edit/${_id}`} className="products__action"><i className="fas fa-edit"></i></Link>
                <Link to={`/products/${name}/${_id}`} className="products__action"><i className="fas fa-eye"></i></Link>
                <div onClick={onDelete} className="products__action"><i className="fas fa-times"></i></div>
            </div>
        </div>
    )
}

Product.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
}

export default connect(null, { deleteProduct })(Product)
