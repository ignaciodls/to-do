import axiosInstance from '../utils/axios'

//------------------ State ------------------------------

const initialState = {

    loading:false,
    tasks : []

}

//------------------ Types ------------------------------

const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';



//------------------ Reducers ------------------------------

export default function tasksReducer(state = initialState, action){

    switch(action.type){

        case FETCH_TASKS_REQUEST:
            return {...state, loading:true}

        case FETCH_TASKS_SUCCESS:
            return {...state, tasks:action.payload, loading:false}
            
        case FETCH_TASKS_FAILURE:
            return {...state, loading:false}

        default:
            return state
    }

}

//------------------ Actions ------------------------------

export const fetchTasksAction = () => (dispatch) => {

    dispatch({
        type:'FETCH_TASKS_REQUEST'
    })

    axiosInstance.get('/todo/tasks/',{
        headers: {
            Authorization:`Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })
    .then(res => {
        dispatch({
            type:'FETCH_TASKS_SUCCESS',
            payload:res.data
        })
    })
    .catch(() => {
        dispatch({
            type:'FETCH_TASKS_FAILURE'
        })
    })

}