import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alertsActions'
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types'
import Alert from '../layout/Alert'

const Login = ({ login, isAuthenticated, user, setAlert, error, alerts }) => {
    const [endUser, setendUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = endUser;

    const onChange = e => {
        setendUser({ ...endUser, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (error) {
            setAlert(error.message, 'danger')
        } else {
            login(endUser)
        }
    }

    if (isAuthenticated && user) {
        if (user.data.role === 'user') {
            return <Redirect to='/user' />
        } else {
            return <Redirect to='/admin' />
        }
    }

    return (
        <div className="auth">
            <div className="container">
                <form className='form' onSubmit={onSubmit}>
                    <h2 className="secondary-heading text-center">Sign in</h2>
                    {/* {alerts.length > 0 && <Alert />} */}
                    {alerts && <Alert />}
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
                    <input type="submit" value='Sign in' className='btn btn--lg btn--block my-1' />
                    <Link className='decoration-none' to='/register' >Don't have an account? <span>Register Now</span></Link>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setAlert: PropTypes.func,
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts: state.alerts,
    user: state.auth.user,
    error: state.auth.error,
})
export default connect(mapStateToProps, { login, setAlert })(Login)
