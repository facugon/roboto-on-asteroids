const radians = (degrees) => {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
const degrees = (radians) => {
  return radians * 180 / Math.PI;
};

const OrbSpeed = 5 // degrees.
const RotationSpeed = 1

function RobotoShip (opts) {
  self = this

  this.ctx = opts.ctx

  this.keyEvents()
  this.position = {
    x: opts.initialPosition.x - 24,
    y: opts.initialPosition.y - 24
  }
  this.rotation = 0
  this.orbVelocity = { x: 0.1, y: 0.1 }

  this.img = LoadImage('img/logo.png', (img) => {
    // onload
  })
}

RobotoShip.prototype = {
  draw : function () {
    const ctx = this.ctx

    this.move()

    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation * Math.PI/180)
    ctx.beginPath()
    ctx.drawImage(this.img, 0 - 24, 0 - 24, 48, 48)
    ctx.closePath()
    ctx.restore()

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

  move : function () {

    // rotate orb
    const vel = this.orbVelocity
    vel.x += OrbSpeed
    vel.y += OrbSpeed

    // moving X
    if (this.rightPressed) {
      this.rotation += RotationSpeed
    }
    else if (this.leftPressed) {
      this.rotation += -RotationSpeed
    }

    // moving Y
    //if (this.downPressed && pos.y < game.canvas.height) {
    //  pos.y += this.velocity
    //}
    if (this.upPressed) {
      this.addVelocity()
    }
  },

  addVelocity: function() {
    // length of veloctity vector estimated with pythagoras
    // theorem, i.e.
    // 		a*a + b*b = c*c
    if (this.vel.x*this.vel.x + this.vel.y*this.vel.y < 20*20) {
      this.vel.x += 0.05*Math.cos(this.angle);
      this.vel.y += 0.05*Math.sin(this.angle);
    }
  },

  keyEvents: function () {
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
