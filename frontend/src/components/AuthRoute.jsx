import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router'

function AuthRoute({component:Component, rest}) {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated)
    return (

        <Route {...rest}>
            {!isAuthenticated?
            <Component/>:
            <Redirect to='/'/>}

        </Route>
    )
}

export default AuthRoute