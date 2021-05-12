import React, { useEffect, useState } from 'react'
import Task from './Task'
import {useSelector, useDispatch} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

import {openPostModalAction} from '../redux/ModalDuck'
import {fetchTasksAction} from '../redux/TodoDuck'
import {logoutUserAction} from '../redux/UserDuck'

import {todo, todoHeader, todoHeaderRow1, taskCount, logoutButton,
    todoHeaderRow2, searchDiv, searchDivInput, searchIcon,
    addIcon, todoBody,} from '../styles/todo.module.css'


function Todo() {
    
    const dispatch = useDispatch();
    const tasks = useSelector(store => store.todo.tasks)

    const [search, setSearch] = useState('')

    const filteredTask = tasks.filter(obj => {

        if (obj.title.toLowerCase().indexOf(search.toLowerCase()) !== -1){
            return true
        }
        else{
            return false
        }
    })

    useEffect(() => {
        dispatch(fetchTasksAction())
    },[dispatch])

    return (
        <div className={todo}>

            <div className={todoHeader}>
                <div className={todoHeaderRow1}>
                    <div className={taskCount}>{`${tasks.length}/50`}</div>
                    <div className={logoutButton} onClick={() => dispatch(logoutUserAction())}>
                        Logout
                    </div>
                </div>
                <div className={todoHeaderRow2}>
                    <div className={searchDiv}>
                        <input className={searchDivInput} type="text" placeholder='Search a task by title' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <div className={searchIcon}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </div>
                    <button className={addIcon} onClick={() => dispatch(openPostModalAction())} disabled={tasks.length >= 50}>
                        <FontAwesomeIcon icon={faPlus}/> 
                    </button>
                </div>
            </div>
            <div className={todoBody}>
                {filteredTask.map(obj => {
                    return(
                        <Task
                        key={obj.id}
                        title={obj.title}
                        id={obj.id}/>
                    )
                })}
            </div>

        </div>
    )
}

export default Todo
