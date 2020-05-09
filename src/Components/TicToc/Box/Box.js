import React from 'react'

import myClasses from './box.module.css'

import bClasses from '../../../bootstrap.module.css'

const box = (props) => {


    const classes1 = [bClasses.col, myClasses.box].join(' ')
    const classes2 = [myClasses.symbol, 'c' + props.id].join(' ')

    return (
        <span 
        className={classes1}
        onClick={
            () => props.showSymbol(props.id)
        }
        >
            <div className={classes2}></div>
        </span>
    )

}

export default box