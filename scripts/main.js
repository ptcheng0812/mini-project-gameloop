import Game from '../scripts/Game.js'

const $shootBall = $('#shootBall')

const CHARACTER_WIDTH = $shootBall.width()
const CHARACTER_HEIGHT = $shootBall.height()
const VELOCITY = 4.5
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)

const gameSettings = ({
  id: '#game-screen',
  ballAreaId: '#ball-area',
  loopInterval: LOOP_INTERVAL
})

const p1Settings = {
  id: '#shootBall',
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_HEIGHT
  },
  initVelocity: VELOCITY,
  initPos: { x: 0, y: 0},
  movementKeys: {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    shoot: 32,
    back: 81
  }
}

const preStartButtonClick = () =>{
    $("#start-button").click(function() {
    game.startGame()
    $("#pre-start").fadeOut()
    })
  }

const game = new Game(gameSettings)
game.addCharacter(p1Settings)
// game.startGame()
preStartButtonClick()
