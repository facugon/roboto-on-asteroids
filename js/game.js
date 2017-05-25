
function GameCanvas () {
  var canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  var styles = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
  ]

  canvas.style.cssText = styles.join(';')

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, false)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  return canvas
}

function Game (options) {
  var canvas = new GameCanvas()

  this.canvas = canvas
  this.ctx = canvas.getContext('2d')

  this.draw = this.draw.bind(this)
}

Game.prototype = {
  start : function () {

    // initial ship position
    var centerx = this.canvas.width / 2
    var centery = this.canvas.height / 2

    this.ship = new RobotoShip({
      ctx: this.ctx,
      initialPosition: { x: centerx, y: centery }
    })

    this.keyEvents()

    setInterval(this.draw, 10)
  },

  draw : function () {
    var ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ship.draw()
  },

  keyEvents: function () {
  }
}
