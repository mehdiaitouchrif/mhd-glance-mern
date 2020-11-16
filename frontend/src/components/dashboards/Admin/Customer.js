import React, { useEffect } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteCustomer } from '../../../actions/customersActions';
import PropTypes from 'prop-types'
import { setAlert } from '../../../actions/alertsActions'

const Customer = ({ customer, deleteCustomer, setAlert }) => {
    const { name, email, createdAt, _id } = customer;

    const onDelete = () => {
        deleteCustomer(_id)
        setAlert('Customer deleted', 'success')
    }

    return (
        <div className='customers__customer'>
            <p>{name}</p>
            <p>{email}</p>
            <p>{moment(createdAt).format('MMMM Do YYYY')} </p>
            <p onClick={onDelete}><i className="fas fa-times"></i></p>
        </div>
    )
}

Customer.propTypes = {
    customer: PropTypes.object,
    deleteCustomer: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}


export default connect(null, { deleteCustomer, setAlert })(Customer)
