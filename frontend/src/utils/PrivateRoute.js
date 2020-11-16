import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    const { isAuthenticated, loading } = auth;
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated && !loading ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
}
export default connect(mapStateToProps, null)(PrivateRoute);