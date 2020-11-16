import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertsActions'
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types'
import Alert from '../layout/Alert'

const Register = ({ register, isAuthenticated, setAlert, error, alerts }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        if (error) {
            error.map(err => {
                return Object.keys(err).map(key => setAlert(err[key], 'danger'))
            })
        } else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) return <Redirect to='/user' />

    return (
        <div className='auth'>
            <div className="container">
                <form className='form' onSubmit={onSubmit}>
                    <h2 className="secondary-heading text-center">Register</h2>
                    {alerts.length > 0 && <Alert />}
                    <input
                        className='input'
                        onChange={onChange}
                        name='name' type="text"
                        placeholder='Name' value={name} />
                    <input
                        className='input'
                        onChange={onChange}
                        name='email' type="email"
                        placeholder='Email' value={email} />
                    <input
                        className='input'
                        onChange={onChange}
                        name='password' type="password"
                        placeholder='Password' value={password} />
                    <input type="submit" value='Sign up' className='btn btn--lg btn--block my-1' />
                    <Link className='decoration-none' to='/login'>Already have an account? <span>Login</span></Link>
                </form>
            </div>
        </div>
    )
}


Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    alerts: PropTypes.array,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts: state.alerts,
    error: state.auth.error
})
export default connect(mapStateToProps, { register, setAlert })(Register)
