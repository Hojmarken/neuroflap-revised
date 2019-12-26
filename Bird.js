class Bird extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this.yVel = 0
    this.gravity = 0.5
    this.power = 10
  }
  update() {
    this.yVel += this.gravity
    this.y += this.yVel
  }
  jump() {
    this.yVel = -this.power;
  }
}
