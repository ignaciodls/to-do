import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from '../utils/axios'
import {registerUserAction} from '../redux/UserDuck'
import {Link} from 'react-router-dom'

import {root, formDiv, legend, fieldDiv, fieldDivInput, submitButton, link} from '../styles/auth.module.css'


function RegisterPage() {

    const dispatch = useDispatch()

    const [registerData, setRegisterData] = useState({
        'username':'',
        'password':'',
        'password2':''
    })

    const [registerErrors, setRegisterErrors] = useState({
        'username':'',
        'password':'',
        'password2':''
    })
    

    const renderSubmitButton = () =>{
        if(Object.values(registerData).every((value) => value.length >= 1)){
            if(Object.values(registerErrors).every((value) => value.length === 0)){
                return(
                    <button type="submit" className={submitButton}>Register</button>
                )
            }
            else{
                return(
                    <button type="submit" className={submitButton} disabled>Register</button>
                )
            }
        }
        else{
            return(
                <button type="submit" className={submitButton} disabled>Register</button>
            )
        }
    }

    const validateUsername = (e) =>{

        return new Promise((resolve,reject) => {

            if(e.target.value.length < 6){
                reject('Username must contain at least 6 characters')
            }

            
            else if(e.target.value.split('').some( (char) => !(/[a-z]/.test(char)) && !(/[A-Z]/.test(char)) && !(/[0-9]/.test(char)) )){

                reject('Only alphanumeric characters')
                
            }
            else{
                resolve()
            }
        })
    }

    const validatePassword = (e) =>{

        if(e.target.value.length < 8 && e.target.value !== registerData.password2){
            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:'Password must contain at least 8 characters',
                password2:'Passwords must be the same'
            })
        }

        else if(e.target.value.length < 8){
            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:'Password must contain at least 8 characters',
                password2:''
            })
        }

        else if(e.target.value !== registerData.password2){
            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:'',
                password2:'Passwords must be the same'
            })
        }
        else{
            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:'',
                password2:''
            })
        }

    }

    const validatePassword2 = (e) =>{

        if(e.target.value !== registerData.password){

            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:'Passwords must be the same'
            })
        }
        else{
            setRegisterErrors({
                ...registerErrors,
                [e.target.name]:''
            })
        }
    }


    const validateFields = (e) =>{
        
        if(e.target.name === 'username'){
            validateUsername(e)
            .then(() => {
                return new Promise((resolve,reject) => {
                    
                    axiosInstance.post(`/auth/is-username-taken/`,{'username':e.target.value})
                    .then(res => {

                        if(res.data.isUsernameAlreadyTaken){
                            reject('Username already taken')
                        }
                        else{
                            resolve()
                        }
                    })
                })
            })
            .then(() =>{
                setRegisterErrors({
                    ...registerErrors,
                    [e.target.name]:''
                })
            })
            .catch(err => {
                setRegisterErrors({
                    ...registerErrors,
                    [e.target.name]:err
                })
            })
        }
        else if(e.target.name === 'password'){
            validatePassword(e)
        }
        else{
            validatePassword2(e)
        }

    }

    const handleChange = (e) =>{

        setRegisterData({
            ...registerData,
            [e.target.name]:e.target.value
        })

        validateFields(e)

    }

    return (

        <div className={root}>

            <div className={formDiv}>

                <form onSubmit={(e) => dispatch(registerUserAction(e,registerData))}>

                    <div className={fieldDiv}>
                        <label htmlFor="username">Username: </label>
                        <input className={fieldDivInput} type="text" name='username' placeholder='Username' onChange={handleChange} value={registerData.username}/>
                        <div className={legend}>{registerErrors.username}</div>
                    </div>
                    
                    <div className={fieldDiv}>
                        <label htmlFor="password">Password: </label>
                        <input className={fieldDivInput} type="password" name='password' placeholder='Password' onChange={handleChange} value={registerData.password}/>
                        <div className={legend}>{registerErrors.password}</div>
                    </div>

                    <div className={fieldDiv}>
                        <label htmlFor="password">Password: </label>
                        <input className={fieldDivInput} type="password" name='password2' placeholder='Password' onChange={handleChange} value={registerData.password2}/>
                        <div className={legend}>{registerErrors.password2}</div>
                    </div>

                    {renderSubmitButton()}

                </form>

                <Link to='/login' className={link}>Do you already have an account?</Link>

            </div>
        </div>
    )
}

export default RegisterPage
