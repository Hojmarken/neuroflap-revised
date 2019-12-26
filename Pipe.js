class Pipe {
  constructor(bird) {
    this.bird = bird
    this.spawnX = 400
    this.gapSize = 130
    this.padding = 50
    this.width = 50
    this.speed = 5;
    this.upperSection = new Rect(0, 0, this.width, 0)
    this.lowerSection = new Rect(0, 0, this.width, 0)
    this.reset()
  }
  reset() {
    this.upperSection.x = this.spawnX
    this.lowerSection.x = this.spawnX
    let random = Math.random()
    this.upperSection.h = this.padding + random * (height - 2 * this.padding - this.gapSize)
    this.lowerSection.y = this.upperSection.h + this.gapSize
    this.lowerSection.h = height - this.lowerSection.y - 1
  }
  draw() {
    this.upperSection.draw()
    this.lowerSection.draw()
  }
  update() {
    this.upperSection.x -= this.speed
    this.lowerSection.x -= this.speed
    if (this.upperSection.x + this.width + 20 < this.bird.x) {
      this.reset()
    }
  }
}
