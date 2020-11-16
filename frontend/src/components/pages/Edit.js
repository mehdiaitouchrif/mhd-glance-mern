import React, { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux';
import { updateProduct, getProduct, clearErr } from '../../actions/productsActions'
import PropTypes from 'prop-types'
import ProductAddEdit from '../products/ProductAddEdit';
import { setAlert } from '../../actions/alertsActions'
import Alert from '../layout/Alert'


const Edit = ({ getProduct, updateProduct, product, match, loading, uploadFile, setAlert, error, alerts, clearErr }) => {
    useEffect(() => {
        getProduct(match.params.id)
    }, [])

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        inStock: '',
        size: [],
        category: '',
        image: '',
        _id: ''
    })

    useEffect(() => {
        if (product && !loading) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price,
                inStock: product.inStock,
                size: product.size,
                category: product.category,
                image: product.image,
                _id: product._id
            })
        }

    }, [product, uploadFile])

    const { name, description, price, inStock, size, category } = form;

    const onChange = e => {
        const name = e.target.name;
        const value = name === 'size' ? [...size, e.target.value] : e.target.value;
        setForm({ ...form, [name]: value })
    }


    const onSubmit = e => {
        e.preventDefault()
        form.inStock = +inStock;
        form.price = +price

        if (error) {
            error.map(err => {
                return Object.keys(err).map(key => setAlert(err[key], 'danger'))
            })
            clearErr()
        } else {
            updateProduct(form)
            setAlert('Updated successfuly', 'success')
        }
    }

    return (
        <div className='edit'>
            <div className="container">
                {loading && !product && <Spinner />}
                <form className="form" onSubmit={onSubmit}>
                    <h2 className="secondary-heading">Edit Product #{match.params.id}</h2>
                    {alerts && <Alert />}
                    <input className='input' type="text" onChange={onChange} name='name' value={name} placeholder='Product name' />
                    <textarea className='textarea' name="description" cols="30" rows="4" onChange={onChange} value={description} placeholder='Product description'></textarea>
                    <input className='input' type="text" name='inStock' value={inStock} onChange={onChange} placeholder='Quantity in stock' />
                    <input className='input' type="text" name='price' value={price} onChange={onChange} placeholder='Product price' />
                    <input className='input' type="text" name='category' value={category} onChange={onChange} placeholder='Product category' />
                    <p className="lead my-2">Does this product have sizes? if so, Edit them all</p>
                    <div className="form__sizes">
                        <label className='form__size'>S
                            <input type='checkbox' name='size' value='S' onChange={onChange} />
                            <span className="form__checkmark"></span>
                        </label>
                        <label className='form__size'>M
                            <input type='checkbox' name='size' value='M' onChange={onChange} />
                            <span className="form__checkmark"></span>
                        </label>
                        <label className='form__size'>L
                            <input type='checkbox' name='size' value='L' onChange={onChange} />
                            <span className="form__checkmark"></span>
                        </label>
                        <label className='form__size'>XL
                            <input type='checkbox' name='size' value='XL' onChange={onChange} />
                            <span className="form__checkmark"></span>
                        </label>
                        <label className='form__size'>2XL
                            <input type='checkbox' name='size' value='2XL' onChange={onChange} />
                            <span className="form__checkmark"></span>
                        </label>
                    </div>
                    <input type='submit' value='Update' className='btn btn--lg btn--block btn--danger my-1' />
                </form>
                <ProductAddEdit disableUpload={false} data={form} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.products.product,
    loading: state.products.loading,
    alerts: state.alerts,
    error: state.products.error
})

Edit.propTypes = {
    product: PropTypes.object,
    editProduct: PropTypes.func.isRequired,
    setAlert: PropTypes.func,
    clearErr: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, { updateProduct, getProduct, setAlert, clearErr })(Edit)
