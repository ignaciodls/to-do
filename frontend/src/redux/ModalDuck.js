import axiosInstance from '../utils/axios'
import {fetchTasksAction} from './TodoDuck'

//------------------ State ------------------------------

const initialState = {
    open : false,
    id: null,
    title : '',
}

//------------------ Types ------------------------------

const OPEN_POST_MODAL = 'OPEN_POST_MODAL';
const OPEN_PUT_MODAL = 'OPEN_PUT_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const ONCHANGE_TITLE = 'ONCHANGE_TITLE'

//------------------ Reducers ------------------------------

export default function modalReducer(state = initialState, action){

    switch(action.type){

        case OPEN_POST_MODAL:
            return {...state, open:true}

        case OPEN_PUT_MODAL:
            return{...state ,open:true, title:action.payload['title'], id:action.payload['id']}

        case CLOSE_MODAL:
            return {...state, open:false, title:'',id:null}

        case ONCHANGE_TITLE:
            return {...state, title:action.payload}

        default:
            return state
    }

}

//------------------ Actions ------------------------------

export const handleChangeTitleAction = (e) => {

    return {
        type:'ONCHANGE_TITLE',
        payload:e.target.value
    }

}

export const sendTaskDataAction = () => (dispatch,getState) => {

    const id = getState().modal.id
    const title = getState().modal.title


    if(id){
        axiosInstance.put(`/todo/tasks/${id}/`,{'title':title},{
            headers: {
                Authorization:`Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            dispatch(closeModalAction())
            dispatch(fetchTasksAction())
        })
        .catch(err => {
            dispatch(closeModalAction())
        })
    }
    else{
        axiosInstance.post('/todo/tasks/',{'title':title},{
            headers: {
                Authorization:`Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            dispatch(closeModalAction())
        })
        .then(() => {
            dispatch(fetchTasksAction())
        })
        .catch(err => {
            dispatch(closeModalAction())
        })
    }
}

export const openPostModalAction = () =>{

    return{
        type:'OPEN_POST_MODAL'
    }

}

export const openPutModalAction = (e,taskRef,id) => (dispatch) => {

    if(e.target === taskRef.current){

        axiosInstance.get(`/todo/tasks/${id}`,{
            headers: {
                Authorization:`Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            dispatch({
                type:'OPEN_PUT_MODAL',
                payload:{'id':res.data.id,
                         'title':res.data.title}
            })
        })

    }
}

export const closeModalAction = ()  => {

    return {
        type:'CLOSE_MODAL',
    }

}