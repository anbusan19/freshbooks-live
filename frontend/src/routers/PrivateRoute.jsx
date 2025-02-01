import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();

    if(loading) {
        return <Loading />;
    }

    if(!currentUser) {
        return <Navigate to="/login" replace />;
    }
  
    return children;
}

export default PrivateRoute