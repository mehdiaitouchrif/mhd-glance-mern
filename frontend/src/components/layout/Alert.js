import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {

    useEffect(() => {
        console.log('+alert')
    }, [alerts])
    return alerts && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert--${alert.type}`}>
            <i className={`fas fa-${alert.type === 'danger' ? 'exclamation-triangle' : 'check'} mx-1`}></i>
            <p>{alert.msg}</p>
        </div>
    ))
}

const mapStateToProps = state => ({
    alerts: state.alerts
})

Alert.propTypes = {
    alerts: PropTypes.array,
}
export default connect(mapStateToProps, null)(Alert)
