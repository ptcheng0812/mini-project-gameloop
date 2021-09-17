import Character from '../scripts/Character.js'
import Ball from '../scripts/Ball.js'

const randomColor = () => (`#${('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)}`)

function Game({ id, ballAreaId, loopInterval }) {
  const game = {
    $elem: $(id),
    $ballArea: $(ballAreaId),
    id,
    loop: null,
    character: null,
    balls: [],
    color: [randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]
  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.character.setCharacterMovement(true, e.keyCode, e)
  }

  // Handling Key Up
  const handleKeyUp = (e) => {
    game.character.setCharacterMovement(false, e.keyCode, e)
  }

  const updateMovements = () => {
    game.character.moveCharacter(game.$elem)
    const { resetPosition, growVirus } = game.character.checkCollision(game.balls, game.$ballArea)

    if (resetPosition) {
      game.character.resetPosition()
      game.character.background = this.colorToChoose()
      game.balls.forEach((ball) => {
        ball.background = this.colorToChoose()
      })
    }

    if (growVirus) {
      game.balls.push(new Ball({ initBackground: this.colorToChoose() }))
      game.balls.push(new Ball({ initBackground: this.colorToChoose() }))
    }
  }

  this.colorToChoose = () => {
    return game.color[Math.floor(Math.random() * game.color.length)]
  }

  this.addCharacter = (setting) => {
    game.character = new Character({ ...setting, initBackground: this.colorToChoose() })
  }

  this.addBall = () => {
    game.balls.push(new Ball({ initBackground: this.colorToChoose() }))
  }


  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
    game.countingTime = setInterval(this.timer, 2000)
    game.deleteBallsTimeInterval = setInterval(this.deleteBalls, 10000)
    game.scoreDeductTimeInterval = setInterval(this.scoreDeduct, 10000)
    game.areaDeductTimeInterval = setInterval(this.areaPercentageDeduct, 10000)
    game.WinLoseTimeInterval = setInterval(this.WinLose, 30000)

    this.addBall()
    this.addBall()
    this.addBall()
  }

  this.timer = () =>{
    let t = Number($("#time").text()) + 1
    $("#time").text(t)
  }

  this.deleteBalls = ()=>{
    if (game.balls.length > 0) {
      const popped = game.balls.pop()
      popped.removeSelf()
    }
  }

  this.scoreDeduct = () =>{
  let iMinus = Number($("#score").text()) - 5
  return $("#score").text(iMinus)
}

  this.areaPercentageDeduct = () =>{
  let pMinus = Number($("#area").text()) - 3
  return $("#area").text(pMinus)
}

  this.WinLose = () =>{
    if (Number($("#score").text()) <= 100) {
      $("#game-over").css("display", "block")
      return $("#time").text("-1")
    } else {
      $("#you-win").css("display", "block")
      return $("#time").text("-1")
    }
  }

}

export default Game
