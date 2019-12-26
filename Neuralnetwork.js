class Neuralnetwork {
  constructor(layers, isCopy) {
    this.layers = layers
    this.weights = []
    this.biases = []
    if (!isCopy) {
      for (let i = 1; i < layers.length; i++) {
        this.weights.push(new Matrix(layers[i - 1], layers[i]))
        this.biases.push(new Matrix(1, layers[i]))
        this.weights[i - 1].randomize()
        this.biases[i - 1].randomize()
      }
    }
  }
  compute(input) {
    let output = new Matrix(1, input.length)
    output.data = [input]
    for (let i in this.weights) {
      output = Matrix.multiply(output, this.weights[i])
      output.add(this.biases[i])
      output.map(Neuralnetwork.activation)
    }
    return output.data[0]
  }
  copy() {
    let output = new Neuralnetwork(this.layers, true)
    for (let e of this.weights) {
      output.weights.push(e.copy())
    }
    for (let e of this.biases) {
      output.biases.push(e.copy())
    }
    return output
  }
  mutate(probability) {
    for (let e of this.weights) {
      e.mutate(probability)
    }
    for (let e of this.biases) {
      e.mutate(probability)
    }
  }
  static activation(x) {
    return 1 / (1 + Math.pow(Math.E, -x))
  }
  static crossover(nn1, nn2) {
    let output = nn1.copy()
    for (let [index, w] of nn2.weights.entries()) {
      for (let [jndex, m] of w.data.entries()) {
        for (let [kndex, e] of m.entries()) {
          if (Math.random() < 0.5) {
            output.weights[index].data[jndex][kndex] = nn2.weights[index].data[jndex][kndex]
          }
        }
      }
    }
    for (let [index, w] of nn2.biases.entries()) {
      for (let [jndex, m] of w.data.entries()) {
        for (let [kndex, e] of m.entries()) {
          if (Math.random() < 0.5) {
            output.biases[index].data[jndex][kndex] = nn2.biases[index].data[jndex][kndex]
          }
        }
      }
    }
    return output
  }
}
