import React, {useRef} from 'react'
import axiosInstance from '../utils/axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {openPutModalAction} from '../redux/ModalDuck'
import {fetchTasksAction} from '../redux/TodoDuck'
import { useDispatch } from 'react-redux'

import {todoTask, todoTaskText, todoTaskCheck} from '../styles/todo.module.css'




function Task({title,id}) {

    const dispatch = useDispatch();
    const taskRef = useRef();
    
    const deleteTask = (e) => {

        axiosInstance.delete(`/todo/tasks/${id}`,{
            headers: {
                Authorization:`Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            dispatch(fetchTasksAction())
        })
    }

    return (
        <div className = {todoTask} onClick={(e)=>dispatch(openPutModalAction(e,taskRef,id))} ref={taskRef}>
            <div className={todoTaskText}>
                {title}
            </div>
            <div className={todoTaskCheck} onClick={deleteTask}>
                <FontAwesomeIcon icon={faCheck}/>
            </div>
        </div>
    )
}

export default Task
