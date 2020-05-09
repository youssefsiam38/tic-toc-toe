import React, { Component } from 'react'
import Box from './Box/Box';
import Aux from '../../hoc/Aux';
import Modal from './Modal/Modal';
import myClasses from './ticToc.module.css'
import bClasses from '../../bootstrap.module.css'

class ticToc extends Component {

    constructor(props) {
        super(props)
        this.boxes = []

        this.state = {
            counter: 0,
            checkedBoxes: [],
            winner: undefined,
            player1Score: 0,
            player2Score: 0
        }

        this.Box = (boxNumber) => {
            return (
                <Box
                    key={boxNumber}
                    id={boxNumber}
                    counter={this.state.counter}
                    showSymbol={this.showSymbol} />)
        }


        for (let i = 0; i < 9; i++) {
            if (i % 3 === 0 && i !== 0) {
                this.temp = (
                    <Aux key={i}>
                        <hr style={{ width: 10000 }} className={myClasses.hr} />
                        {this.Box(i)}
                    </Aux>)
                this.boxes.push(this.temp)
            } else
                this.boxes.push(this.Box(i))
        }
    }

    $ = (id) => document.getElementsByClassName('c' + id)[0].innerHTML

    showSymbol = (id) => {
        if (this.state.checkedBoxes.includes(id)) {
            return
        } else {
            let symbol = this.state.counter % 2 === 0 ? 'x' : 'o'
            document.getElementsByClassName('c' + id)[0].innerHTML = symbol

            this.setState((prevState) => {
                let checkedBoxes = [...prevState.checkedBoxes, id]
                return { counter: prevState.counter++, checkedBoxes }
            })
            this.forceUpdate()

            if (this.checkWinner(id, symbol)) {
                let winnerNo = symbol === 'x' ? 1 : 2
                this.setState({ winner: winnerNo })
                if(winnerNo === 1)
                    this.setState((prev) => {
                        let newScore = prev.player1Score++
                        return { player1Score: newScore }
                    })
                else {
                    this.setState((prev) => {
                        let newScore = prev.player2Score++
                        return { player2Score: newScore }
                    })
                    
                }
            }
        }
    }



    checkWinner = (boxNumber, symbol) => {
        let thereIsWinner = false

        if (boxNumber === 0) {
            thereIsWinner = this.allChecked(symbol, 1, 2) || this.allChecked(symbol, 3, 6) || this.allChecked(symbol, 4, 8)
        } else if (boxNumber === 1) {
            thereIsWinner = this.allChecked(symbol, 0, 2) || this.allChecked(symbol, 4, 7)
        } else if (boxNumber === 2) {
            thereIsWinner = this.allChecked(symbol, 0, 1) || this.allChecked(symbol, 5, 8) || this.allChecked(symbol, 4, 6)
        } else if (boxNumber === 3) {
            thereIsWinner = this.allChecked(symbol, 0, 6) || this.allChecked(symbol, 4, 5)
        } else if (boxNumber === 4) {
            thereIsWinner = this.allChecked(symbol, 0, 8) || this.allChecked(symbol, 2, 6) || this.allChecked(symbol, 1, 7) || this.allChecked(symbol, 3, 5)
        } else if (boxNumber === 5) {
            thereIsWinner = this.allChecked(symbol, 2, 8) || this.allChecked(symbol, 3, 4)
        } else if (boxNumber === 6) {
            thereIsWinner = this.allChecked(symbol, 0, 3) || this.allChecked(symbol, 7, 8) || this.allChecked(symbol, 2, 4)
        } else if (boxNumber === 7) {
            thereIsWinner = this.allChecked(symbol, 1, 4) || this.allChecked(symbol, 6, 8)
        } else if (boxNumber === 8) {
            thereIsWinner = this.allChecked(symbol, 0, 4) || this.allChecked(symbol, 6, 7) || this.allChecked(symbol, 2, 5)
        }

        if(thereIsWinner)
            return thereIsWinner
        else {
            if(this.state.checkedBoxes.length >= 8){
                this.setState({
                    winner: 'Draw'
                })
                return false
            }
        }

    }

    allChecked = (symbol, ...arr) => this.$(arr[0]) === symbol && this.$(arr[1]) === symbol

    refresh = () => {
        this.setState({
            counter: 0,
            checkedBoxes: [],
            winner: undefined
        })

        let thereIsNoSymbols = this.state.checkedBoxes.length === 0

        if(!thereIsNoSymbols) {
        for(let i = 0; i < 9; i++) {
            document.getElementsByClassName('c' + i)[0].innerHTML = ''

        }

        }
    }

    replay = () => {
        this.setState({
            counter: 0,
            checkedBoxes: [],
            winner: undefined
        })
    }

    undoHandler = () => {
        console.log(2)
        let thereIsNoSymbols = this.state.checkedBoxes.length === 0
        
        if(!thereIsNoSymbols) {

            let lastIndex = this.state.checkedBoxes.length - 1
            let topOfStack = this.state.checkedBoxes[lastIndex]
            this.setState((prev) => {
                let counter = prev.counter - 1
                let checkedBoxes = prev.checkedBoxes.slice(0, lastIndex)
                document.getElementsByClassName('c' + topOfStack)[0].innerHTML = ''
                return {
                    checkedBoxes,
                    counter
                }
            })
            
            
        }

        

    }

    bootstrapConbiner = (str) => {
        let tempClasses = str.split(' ')
        
        for (let i = 0; i < tempClasses.length; i++) {
            tempClasses[i] = bClasses[tempClasses[i]]
        }

        return tempClasses.join(' ')
    }



    containerClasses = [bClasses.container, bClasses['col-8'], myClasses.ticToc].join(' ')
    boxesClasses = [bClasses.row, myClasses.row].join(' ')
    labelClasses = [this.bootstrapConbiner("row justify-content-around col-12"), myClasses.label].join(' ')


    render() {
        return (
            <Aux>
                <div className={bClasses.row}>
                    <div className={this.labelClasses}>
                        <div
                        className={this.bootstrapConbiner("col-sm-3 col-12 text-center text-light")}>
                            Player 1: {this.state.player1Score}
                        </div>
                        { !this.state.winner ?
                            <Aux>
                            <button
                            onClick={this.undoHandler}
                            className={this.bootstrapConbiner("col-2 text-light h-50 bg-danger align-self-center rounded-pill p-2 ")}>
                                Undo
                            </button>
                            <img src="./myImg.png" className={myClasses.img} style={{marginTop: 20}} alt="xo" height="60" width=""></img>
                            <button
                            onClick={this.refresh}
                            className={this.bootstrapConbiner("col-2 text-black h-50 bg-warning align-self-center rounded-pill p-2")}>
                                refresh
                            </button>
                            </Aux> : 
                            <div className="col-6" />
                        }
                        <div
                        className={this.bootstrapConbiner("col-12 text-center text-light")}>
                        Player 2: {this.state.player2Score}
                        </div>
                    </div>
                    <div
                    className={this.containerClasses}>
                        {
                            this.state.winner ?
                                <Modal
                                    winner={this.state.winner}
                                    refresh={this.replay} /> :
                                <div className={this.boxesClasses}>
                                    {this.boxes}
                                </div>
                        }
                    </div>
                </div>
            </Aux>
        )
    }

}

export default ticToc