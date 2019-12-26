class Matrix {
  constructor(rows, cols) {
    this.data = []
    this.rows = rows
    this.cols = cols
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0
      }
    }
  }
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = randomGaussian(0, 2)
      }
    }
  }
  get(i, j) {
    return this.data[i][j];
  }
  static multiply(m1, m2) {
    if (m1.cols == m2.rows) {
      let result = new Matrix(m1.rows, m2.cols)
      for (let i = 0; i < result.data.length; i++) {
        for (let j = 0; j < result.data[i].length; j++) {
          let sum = 0
          for (let v = 0; v < m1.data[i].length; v++) {
            sum += m1.data[i][v] * m2.data[v][j]
          }
          result.data[i][j] = sum
        }
      }
      return result
    } else {
      return undefined
    }
  }
  map(operation) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = operation(this.data[i][j])
      }
    }
  }
  add(matrix) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += matrix.data[i][j]
      }
    }
  }
  copy() {
    let output = new Matrix(this.rows, this.cols)
    for (let i = 0; i < this.rows; i++) {
      output.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        output.data[i][j] = this.data[i][j]
      }
    }
    return output
  }
  mutate(probability) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.random() < probability) {
          this.data[i][j] += randomGaussian(0, 2)
        }
      }
    }
  }
}
