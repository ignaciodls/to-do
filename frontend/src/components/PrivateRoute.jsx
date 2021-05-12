import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router'

function PrivateRoute({component:Component, rest}) {

    const isAuthenticated = useSelector(store => store.user.isAuthenticated)
    return (

        <Route {...rest}>
            {isAuthenticated?
            <Component/>:
            <Redirect to='/login'/>}

        </Route>
    )
}

export default PrivateRoute
