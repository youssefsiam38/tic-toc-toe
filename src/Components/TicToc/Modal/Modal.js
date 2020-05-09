import React from 'react';
import Aux from '../../../hoc/Aux'
import myClasses from './Modal.module.css';

const modal = (props) => {

    let message = props.winner === 'Draw' ? props.winner : `Player ${props.winner} wins!`

    return (
        <Aux>
            <div className={myClasses.modal}>
                <p className={myClasses.message}>
                    {message}
                </p>
                <button onClick={props.refresh} className={myClasses.btn}>replay</button>
            </div>
        </Aux>
    )

}

export default modal 