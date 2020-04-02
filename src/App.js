import React from 'react';
import './App.css';

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const obj = this.props
    return(
      <div className={obj.name}>
        <h1>{obj.name.toUpperCase()}</h1>
        <div className="hp" style={{width: this.props.hp+"%"}}></div>
        <p>{obj.hp}</p>
      </div>
    )
  }
}

class GameContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      message: null,
      hpPlayer: 100,
      hpEnemy: 100
    }
    this.onAttackPlayer = this.onAttackPlayer.bind(this)
    this.onAttactEnemy = this.onAttactEnemy.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  onAttackPlayer() {
    const damage = Math.floor(Math.random() * 20)
    let finalHp = this.state.hpEnemy - damage
    if (finalHp <= 0) {
      finalHp = 0
      this.setState({
        done: true,
        message: "Anda Menang!"
      })
    }
    this.setState({
      hpEnemy: finalHp
    })

    this.onAttactEnemy()
  }
  onAttactEnemy() {
    const damage = Math.floor(Math.random() * 20)
    let finalHp = this.state.hpPlayer - damage
    if (finalHp <= 0) {
      finalHp = 0
      this.setState({
        done: true,
        message: "Anda Kalah!"
      })
    }

    this.setState({
      hpPlayer: finalHp,
    })
  }
  onReset() {
    this.setState({
      done: false,
      message: null,
      hpPlayer: 100,
      hpEnemy: 100
    })
  }

  render() {
    let gamePlay;

    if (this.state.done) {
    gamePlay = (
      <div onClick={this.onReset}>
        <h1>{this.state.message}</h1>
        <button className="btnCustom">Coba lagi</button>
      </div>
    )
    }else {
      gamePlay = (
        <div className="container">
          <div className="gameContainer">
            <Player name="you" hp={this.state.hpPlayer}/>
            <Player name="enemy" hp={this.state.hpEnemy}/>
          </div>
          <button className="btnCustom" onClick={this.onAttackPlayer}>Attack</button>
        </div>
      )
    }

    return gamePlay
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GameContent/>
        </header>
      </div>
    );
  }
}
