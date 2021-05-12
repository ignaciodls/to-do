import React from 'react'
import Todo from '../components/Todo'
import Modal from '../components/Modal'
import {root} from '../styles/todo.module.css'
import { useSelector } from 'react-redux'

function TodoPage() {

    const openModal = useSelector(store => store.modal.open);

    return (
    
        <div className={root}>
            <Todo/>

            {openModal &&<Modal/>}
        </div>
    )
}

export default TodoPage
