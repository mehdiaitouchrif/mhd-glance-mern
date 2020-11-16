import React, { useEffect } from 'react'
import Customer from './Customer';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCustomers } from '../../../actions/customersActions'
import PropTypes from 'prop-types'
import Alert from '../../layout/Alert'


const Customers = ({ getCustomers, customers, loading, alerts }) => {
    useEffect(() => {
        getCustomers();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='customers'>
            <h2 className="secondary-heading">Customers</h2>
            {customers && customers.length <= 1 && (
                <div className="orders__empty">
                    <img src="/uploads/customers.svg" alt="Customers SVG" />
                    <p className="lead text-center my-2">You have no customers for now!</p>
                </div>
            )}
            {alerts && <Alert />}
            {loading && !customers && <Spinner />}
            {customers && customers.length > 1 && (
                <div className="customers__head">
                    <p>Customer Name</p>
                    <p>Customer Email</p>
                    <p>Date Joined</p>
                    <p>Action</p>
                </div>
            )}
            {customers && customers.length > 0 && customers.map(customer => customer.role !== 'admin' && <Customer key={customer._id} customer={customer} />)}
        </div>
    )
}

const mapStateToProps = state => ({
    customers: state.customers.customers,
    loading: state.customers.loading,
    alerts: state.alerts
})


Customers.propTypes = {
    customers: PropTypes.array,
    getCustomers: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}
export default connect(mapStateToProps, { getCustomers })(Customers)
