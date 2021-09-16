
function Ball({ initBackground }) {
  const ball = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: { w: 100, h: 100 },
    background: initBackground
  }

  // Create ball and appends the ball to ball-area
  const init = () => {
    const { id, dimension: { w, h }, background } = ball
    // console.log(background)
    ball.$elem = $(`<div id="${id}"class="ball"></div>`)
      .css('background', background)
      .css('width', w)
      .css('height', h)
      .appendTo('#ball-area')
  }

  init()

  this.removeSelf = () => {
    ball.$elem.remove()
  }

  Object.defineProperties(this, {
    $elem: {
      get: function() {
        return ball.$elem
      }
    },
    id: {
      get: function() {
        return ball.id
      }
    },
    dimension: {
      get: function() {
        return ball.dimension
      }
    },
    background: {
      get: function() {
        return ball.background
      },
      set: function(newBackground) {
        ball.background = newBackground
        ball.$elem.css('background', newBackground)
      }
    }
  })


}






export default Ball
