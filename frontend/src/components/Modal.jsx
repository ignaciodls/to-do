import React, { useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {closeModalAction, handleChangeTitleAction, sendTaskDataAction} from '../redux/ModalDuck'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {modalBackground, modal, modalRow1, modalRow2, modalRow3} from '../styles/modal.module.css'

function Modal() {

    const modalBackgroundRef = useRef();

    const dispatch = useDispatch();
    const title = useSelector(store => store.modal.title)

    function closeModal(e){
        if (modalBackgroundRef.current === e.target){
            dispatch(closeModalAction())
        }


    }

    return (
        <div className={modalBackground} onClick={closeModal} ref={modalBackgroundRef}>
            <div className={modal}>

                <div className={modalRow1}>
                    <FontAwesomeIcon icon={faTimesCircle} className='icon' onClick={() => dispatch(closeModalAction())}/>
                </div>

                <div className={modalRow2}>
                    <label htmlFor="">Title:</label>
                    <input type="text" value={title} onChange={(e) => dispatch(handleChangeTitleAction(e))} placeholder='Task title'/>   
                </div>

                <div className={modalRow3}>
                    <button onClick={() => {dispatch(sendTaskDataAction())}}>SUBMIT</button>
                </div>
               
            </div>
        </div>
    )
}

export default Modal
