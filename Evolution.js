class Evolution {
  constructor() {
    this.generation = 0
    this.populationSize = 500
    this.geneMutationRate = 0.2
    this.individualMutationRate = 0.2
    this.nnArchitecture = [5, 2, 1]
    this.population = []
    this.fittestIndividual
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(new Neuralnetwork(this.nnArchitecture, false))
    }
    this.bird = new Bird(50, 100, 30, 30)
    this.pipe = new Pipe(this.bird)
  }
  nextGeneration() {
    this.generation++
    let newPopulation = []
    let totalFitness = 0
    let highestFitness = -Infinity
    for (let e of this.population) {
      e.fitness = this.evaluateFitness(e)
      totalFitness += e.fitness
      if (e.fitness > highestFitness) {
        highestFitness = e.fitness
        this.fittestIndividual = e
      }
    }
    newPopulation.push(this.fittestIndividual)
    while (newPopulation.length < this.populationSize) {
      let newIndividual = Neuralnetwork.crossover(this.pickIndividualFromPopulation(totalFitness),
        this.pickIndividualFromPopulation(totalFitness))
      if (Math.random() < this.individualMutationRate) {
        newIndividual.mutate(this.geneMutationRate)
      }
      newPopulation.push(newIndividual)
    }
    this.population = newPopulation
    return highestFitness
  }
  pickIndividualFromPopulation(totalFitness) {
    let pointer = Math.random() * totalFitness
    let sum = 0
    for (let e of this.population) {
      sum += e.fitness
      if (sum >= pointer) {
        return e
      }
    }
    return undefined
  }
  evaluateFitness(individual) {
    let fitness = 0
    while (true) {
      fitness += this.pipe.speed
      let input = [
        this.bird.y,
        this.bird.y - (this.pipe.upperSection.y + this.pipe.upperSection.h),
        this.pipe.lowerSection.y - this.bird.y,
        this.pipe.upperSection.x - (this.bird.x + this.bird.w),
        this.bird.yVel
      ]
      let jumpCertainty = individual.compute(input)
      if (jumpCertainty > 0.5) {
        this.bird.jump()
      }
      this.bird.update()
      this.pipe.update()
      // Arbitrary fitness cap at 50000 for bounding the while-loop
      if (this.birdHasCrashed() || fitness > 50000) {
        break;
      }
    }
    this.resetEnviroment()
    return fitness
  }
  birdHasCrashed() {
    return (this.bird.y < 0 ||
      this.bird.y + this.bird.h > height ||
      Rect.overlapping(this.bird, this.pipe.upperSection) ||
      Rect.overlapping(this.bird, this.pipe.lowerSection))
  }
  resetEnviroment() {
    this.pipe.reset()
    this.bird.yVel = 0
    this.bird.y = 100
  }
}
