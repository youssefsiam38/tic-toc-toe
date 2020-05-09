import React, { Component } from 'react'
import TicToc from './Components/TicToc/TicToc';
import Aux from './hoc/Aux';

class App extends Component {


    

    render = () => {
        return (
        <Aux>
            <TicToc/>
        </Aux>    
        )
    }
}


export default App