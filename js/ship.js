const radians = (degrees) => {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
const degrees = (radians) => {
  return radians * 180 / Math.PI;
};

const ORB_SPEED = 5 // degrees.
const ROTATION_SPEED = 3 // degress.
const ACCELERATION = 0.02
const BRAKE = 0.01
const MAX_VELOCITY = 4

function RobotoShip (opts) {
  const self = this

  this.ctx = opts.ctx

  this.attachKeyEvents()
  this.position = {
    x: opts.initialPosition.x - 24,
    y: opts.initialPosition.y - 24
  }

  this.velocity = 0
  this.rotation = 0 // degrees
  this.orbVelocity = { x: 0.1, y: 0.1 }

  this.img = LoadImage('img/logo.png', (img) => {
    // onload
  })
}

RobotoShip.prototype = {
  drawOrbs : function () {
    const ctx = this.ctx
    const R = 60
    const center = { x: this.position.x, y: this.position.y }

    // orb
    const vel = this.orbVelocity
    var pos
    pos = {
      x: R * Math.cos(radians(vel.x)),
      y: R * Math.sin(radians(vel.y))
    }

    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#FF0000"
    ctx.stroke();
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.beginPath()
    ctx.arc(-pos.x, -pos.y, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#FF0000"
    ctx.stroke();
    ctx.closePath()
    ctx.restore()

    pos = {
      x: R * Math.cos(radians(vel.x + 90)),
      y: R * Math.sin(radians(vel.y + 90))
    }

    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#FF0000"
    ctx.stroke();
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.translate(center.x, center.y)
    ctx.beginPath()
    ctx.arc(-pos.x, -pos.y, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#FF0000"
    ctx.stroke();
    ctx.closePath()
    ctx.restore()
  },
  draw : function () {
    const ctx = this.ctx

    this.move()

    ctx.save()
    ctx.translate(this.position.x, this.position.y)

    ctx.rotate(radians(this.rotation))
    ctx.rotate(radians(90))
    ctx.beginPath()
    ctx.drawImage(this.img, 0 - 24, 0 - 24, 48, 48)
    ctx.closePath()
    ctx.restore()

    this.drawOrbs()

  },

  move: function () {

    // rotate orbs
    const vel = this.orbVelocity
    vel.x += ORB_SPEED
    vel.y += ORB_SPEED

    if (this.velocity > 0) {
      const pos = this.position
      pos.x += this.velocity * Math.cos(radians(this.rotation))
      pos.y += this.velocity * Math.sin(radians(this.rotation))
    }

    // moving X
    if (this.rightPressed) {
      this.rotation += ROTATION_SPEED
    }
    else if (this.leftPressed) {
      this.rotation += -ROTATION_SPEED
    }

    if (this.upPressed) {
      this.incrementVelocity()
    } else if (this.downPressed) {
      this.reduceVelocity()
    }
  },

  incrementVelocity: function() {
    if (this.velocity < MAX_VELOCITY) {
      this.velocity += ACCELERATION
    }
  },

  reduceVelocity: function() {
    if (this.velocity > 0) {
      this.velocity -= ACCELERATION
    }
  },

  attachKeyEvents: function () {
    function keyDownHandler(e) {
      if (e.keyCode == KEYCODE_RIGHT) this.rightPressed = true
      else if (e.keyCode == KEYCODE_LEFT) this.leftPressed = true
      if (e.keyCode == KEYCODE_UP) this.upPressed = true
      else if (e.keyCode == KEYCODE_DOWN) this.downPressed = true
    }

    function keyUpHandler(e) {
      if (e.keyCode == KEYCODE_RIGHT) this.rightPressed = false
      else if (e.keyCode == KEYCODE_LEFT) this.leftPressed = false
      if (e.keyCode == KEYCODE_UP) this.upPressed = false
      else if (e.keyCode == KEYCODE_DOWN) this.downPressed = false
    }

    document.addEventListener('keydown', keyDownHandler.bind(this), false);
    document.addEventListener('keyup', keyUpHandler.bind(this), false);
  }
}
