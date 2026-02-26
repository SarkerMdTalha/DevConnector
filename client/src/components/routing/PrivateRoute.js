import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, auth: { isAuthenticated, loading } }) => {
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return isAuthenticated ? Element : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
