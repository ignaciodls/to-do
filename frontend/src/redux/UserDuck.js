import axiosInstance from "../utils/axios";

const initialState = {

    loading:true,
    isAuthenticated:false,

}



const USER_REQUEST_FINISHED = 'USER_REQUEST_FINISHED';
const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';
const USER_REGISTER_SUCCESSFUL = 'USER_REGISTER_SUCCESSFUL';
const USER_LOGOUT = 'USER_LOGOUT';
const IS_AUTHENTICATED_SUCCESS = 'IS_AUTHENTICATED_SUCCESS';

export default function userReducer(state = initialState, action){

    switch(action.type){

        case IS_AUTHENTICATED_SUCCESS:
            return {...state, isAuthenticated:true}

        case USER_REQUEST_FINISHED:
            return {...state, loading:false}

        case USER_LOGIN_SUCCESSFUL:
            return {...state, isAuthenticated:true}
            
        case USER_REGISTER_SUCCESSFUL:
            return {...state, isAuthenticated:true}

        case USER_LOGOUT:
            return {...state, isAuthenticated:false}

        default:
            return state
    }

}

export const checkAuthenticatedAction = () => (dispatch) => {

    axiosInstance.post('/auth/is-authenticated/',{'token':localStorage.getItem('token')})
    .then((res) => {
        if(res.data.isAuthenticated){
            dispatch({
                type:'USER_REQUEST_FINISHED'
            })
            dispatch({
                type:'IS_AUTHENTICATED_SUCCESS'
            })
        }
        else{
            dispatch({
                type:'USER_REQUEST_FINISHED'
            })
        }
    })

}


export const loginUserAction = (e,data,setLoginData,setLoginError) => (dispatch) =>{

    e.preventDefault()
    axiosInstance.post('/auth/login/', data)
    .then((res) =>{
        localStorage.setItem('token',res.data.token)
        dispatch({
            type:'USER_LOGIN_SUCCESSFUL'
        })
    })
    .catch(()=>{
        setLoginError('*Invalid credentials')
        setLoginData({
            'username':'',
            'password':''
        })
    })

}

export const registerUserAction = (e,data) => (dispatch) =>{

    e.preventDefault()
    axiosInstance.post('/auth/register/', data)
    .then((res) =>{
        localStorage.setItem('token',res.data.token)
        dispatch({
            type:'USER_REGISTER_SUCCESSFUL'
        })
    })
}

export const logoutUserAction = () =>{

    localStorage.removeItem('token')

    return{
        type:'USER_LOGOUT'
    }
}