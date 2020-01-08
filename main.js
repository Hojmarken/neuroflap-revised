let bird
let pipe
let nn

function setup() {
  cnv = createCanvas(500, 700)
  bird = new Bird(50, 100, 30, 30)
  pipe = new Pipe(bird)
  let evo = new Evolution()
  while (evo.nextGeneration() < 50000) {
    console.log("Gen " + evo.generation)
  }
  nn = evo.fittestIndividual
}

function draw() {
  background(200)
  simulateEnviroment()
}

function simulateEnviroment() {
  let input = [
    bird.y,
    bird.y - (pipe.upperSection.y + pipe.upperSection.h),
    pipe.lowerSection.y - (bird.y + bird.h),
    pipe.upperSection.x - (bird.x + bird.w),
    bird.yVel
  ]
  jumpCertainty = nn.compute(input)
  if (jumpCertainty > 0.5) {
    bird.jump()
  }
  bird.update()
  bird.draw()
  pipe.update()
  pipe.draw()
  if (birdHasCrashed()) {
    console.log("Crashed")
  }
}

function birdHasCrashed() {
  return (bird.y < 0 ||
    bird.y + bird.h > height ||
    Rect.overlapping(bird, pipe.upperSection) ||
    Rect.overlapping(bird, pipe.lowerSection))
}
