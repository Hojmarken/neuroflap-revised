function getUltimateBird() {
  let ultimateBird = new Neuralnetwork([5, 2, 1], false)
  ultimateBird.biases[0].data = [
    [-3.6325437001005074, -7.663343577479891]
  ]
  ultimateBird.biases[1].data = [
    [-0.837967742193524]
  ]

  ultimateBird.weights[0].data = [
    [-0.055310180961417696, -1.6169468222963688],
    [0.5855991455389042, -5.128958132387634],
    [-10.339384396731727, 7.907863318100477],
    [-3.337997649524611, -1.9952045770042064],
    [1.8090715092147884, -0.4114251568416396]
  ]
  ultimateBird.weights[1].data = [
    [4.929055489947881],
    [0.12643866575752893]
  ]
  return ultimateBird
}
