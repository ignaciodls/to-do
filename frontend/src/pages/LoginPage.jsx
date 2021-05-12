import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../redux/UserDuck'

import {root, formDiv, legend, fieldDiv, fieldDivInput, submitButton, link} from '../styles/auth.module.css'


function LoginPage() {
    

    const [loginError, setLoginError] = useState('')

    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        'username':'',
        'password':''
    })

    const handleChange = (e) =>{

        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }

    const renderSubmitButton = () => {
        if(loginData.password.length >= 1 && loginData.username.length >= 1){
            return(
                <button type="submit" className={submitButton}>Login</button>
            )
        }
        else{
            return(
                <button type="submit" className={submitButton} disabled>Login</button>
            )
        }
    }
    

    return (

        <div className={root}>

            <div className={formDiv}>

                <div className={legend}>{loginError}</div>

                <form onSubmit={(e) => dispatch(loginUserAction(e,loginData,setLoginData,setLoginError))}>

                    <div className={fieldDiv}>
                        <label htmlFor="username">Username: </label>
                        <input className={fieldDivInput} type="text" name='username' placeholder='Username' onChange={handleChange} value={loginData.username}/>
                    </div>
                    
                    <div className={fieldDiv}>
                        <label htmlFor="password">Password: </label>
                        <input className={fieldDivInput} type="password" name='password' placeholder='Password' onChange={handleChange} value={loginData.password}/>
                    </div>

                    {renderSubmitButton()}

                </form>

                <Link to='/register' className={link}>Do you have not an account?</Link>

            </div>
        </div>
        

    )
    
}

export default LoginPage
