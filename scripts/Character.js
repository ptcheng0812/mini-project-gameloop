function Character({ id, initDimension, initVelocity, initPos, initBackground, movementKeys }) {
  const character = {
    $elem: null,
    id,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    movementKeys,
    movement: {
      left: false,
      up: false,
      right: false,
      down: false,
      shoot: false,
      back: false
    },
    shooting: false,
    backCoolDown: 200,
    lastBack: Date.now() - 200
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { x, y }, dimension: { w, h }, background } = character
    character.$elem = $(id)
      .css('left', x)
      .css('top', y)
      .css('background', background)
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

  // Toggle which direction the character is moving to
  this.setCharacterMovement = (value, keyCode, e) => {
    const { movementKeys: { left, up, right, down, shoot, back } } = character
    switch (keyCode) {
      case left:
        e.preventDefault()
        character.movement.left = value
        break
      case up:
        e.preventDefault()
        character.movement.up = value
        break
      case right:
        e.preventDefault()
        character.movement.right = value
        break
      case down:
        e.preventDefault()
        character.movement.down = value
        break
      case shoot:
        e.preventDefault()
        character.movement.shoot = value
        break
      case back:
        e.preventDefault()
        character.movement.back = value
        //
  }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = ($game) => {
    const gameH = $game.height()
    const { velocity, position: { x, y }, dimension: { h }, movement: { up,  down, shoot, back }, shooting } = character

    let newX = x
    let newY = y

    if (shooting)
      newX = x + velocity

      if (up) {
        newY = y - velocity < 0 ? 0 : newY - velocity
      }
      if (down) {
        newY = y + h + velocity > gameH ? gameH - h : newY + velocity
      }
      if (shoot) {
        character.shooting = true
      }
      if (back) {
        const timeNow = Date.now()
        const lastBackDiff = timeNow - character.lastBack
        if (lastBackDiff > character.backCoolDown) {
          const newCords = this.resetPositionCords()
          newX = newCords.newX
          newY = newCords.newY
          character.lastBack = timeNow
        }
      }


    character.position.x = newX
    character.position.y = newY
    character.$elem.css('left', newX).css('top', newY)
  }

  this.checkCollision = (balls, $ballArea) => {
    const xDiff = $ballArea.offset().left - 200
    const yDiff = $ballArea.offset().top

    const {
      position: { x: cX, y: cY },
      dimension: { w: cW, h: cH },
      background: cBackground
    } = character

    let collided = { resetPosition: false, growVirus: false }

    balls.forEach((ball) => {
      const { $elem, dimension: { w: bW, h: bH }, background: bBackground } = ball
      const { left: bX, top: bY } = $elem.offset()

      if ((cX + xDiff) < (bX + bW) &&
          (cX + xDiff + cW) > bX &&
          (cY + yDiff) < (bY + bH) &&
          (cY + yDiff + cH) > bY) {
        character.shooting = false
        collided.resetPosition = true
        if (cBackground === bBackground) {
          collided.growVirus = true
          scoreAdd()
          areaPercentageAdd()
        }
      }
    })

    return collided
  }

  this.resetPositionCords = () => {
    const newX = 0
    const newY = Math.random() * 600

    return { newX, newY }
  }

  this.resetPosition = () => {
    const { newX, newY } = this.resetPositionCords()
    character.position.x = newX
    character.position.y = newY
    character.$elem
      .css('left', newX)
      .css('top', newY)
  }

  Object.defineProperties(this, {
    background: {
      set: function(newBackground) {
        character.background = newBackground
        character.$elem.css('background', newBackground)
      }
    }
  })
}

const scoreAdd = () =>{
  let i= Number($("#score").text()) + 5
  return $("#score").text(i)
}

const areaPercentageAdd = () =>{
  let p = Number($("#area").text()) + 3
  return $("#area").text(p)
}



export default Character
