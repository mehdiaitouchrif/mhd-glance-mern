import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addProduct } from '../../actions/productsActions'
import PropTypes from 'prop-types'
import ProductAddEdit from '../products/ProductAddEdit';
import { setAlert } from '../../actions/alertsActions'
import Alert from '../layout/Alert'
import { Link } from 'react-router-dom'

const Add = ({ addProduct, currentId, setAlert, error, alerts }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        inStock: '',
        size: [],
        category: 'main',
        image: 'no-img.png'
    })

    const { name, description, price, inStock, size, category } = form;

    const onChange = e => {
        const name = e.target.name;
        const value = name === 'size' ? [...size, e.target.value] : e.target.value;
        setForm({ ...form, [name]: value })
    }

    const [success, setSuccess] = useState(false);
    const onSubmit = e => {
        e.preventDefault()
        form.inStock = +inStock;
        if (error) {
            setAlert(error, 'danger')
        } else {
            addProduct(form)
            setAlert('Product added successfuly', 'success')
            setSuccess(true)
        }
    }

    return (
        <div className='add'>
            <div className="container">
                <form className="form" onSubmit={onSubmit}>
                    <h2 className="secondary-heading">Add a new product</h2>
                    {alerts.length > 0 && <Alert />}
                    <input className='input' type="text" onChange={onChange} name='name' value={name} placeholder='Product name' />
                    <textarea className='textarea' name="description" cols="30" rows="4" onChange={onChange} value={description} placeholder='Product description'></textarea>
                    <input className='input' type="text" name='inStock' value={inStock} onChange={onChange} placeholder='Quantity in stock' />
                    <input className='input' type="text" name='price' value={price} onChange={onChange} placeholder='Product price' />
                    <input className='input' type="text" name='category' value={category} onChange={onChange} placeholder='Product category' />
                    <p className="lead my-2">Does this product have sizes? if so, Add them all</p>
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
                    <input type="submit" className='btn btn--lg btn--block' value="Add Product" />
                </form>
                <ProductAddEdit disableUpload={!success} data={{ ...form, _id: currentId }} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentId: state.products.currentId,
    alerts: state.alerts,
    error: state.products.error
})

Add.propTypes = {
    currentId: PropTypes.string,
    addProduct: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    alerts: PropTypes.array,
}
export default connect(mapStateToProps, { addProduct, setAlert })(Add)
