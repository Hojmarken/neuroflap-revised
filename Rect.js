class Rect {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  static overlapping(r1, r2) {
    if (r1.x + r1.w > r2.x && r1.x < r2.x + r2.w &&
      r1.y + r1.h > r2.y && r1.y < r2.y + r2.h) {
      return true
    } else {
      return false
    }
  }
  draw() {
    rect(this.x, this.y, this.w, this.h)
  }
}
