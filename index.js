// @flow weak

const fs = require('fs')

const data = fs.readFileSync("./data.txt", "utf8")

// split file into lines
const rows = data.split("\n")

// remove first two rows
rows.splice(0,2)

// regex for this usecase
const rx = /(\b[A-Z][a-z]+[\s()[a-z]+]?)(\.?\d?\.?\d+)(\s?[kg]+)(\s+)(\$)(\d?.?\d+)/

const result = rows.map((val, i) => {
  // extract values into groups
  const rxResult = rx.exec(val)

  // take values from regex groups
  const name = rxResult[1].trim()
  const unit = rxResult[3].trim().toUpperCase()
  let weight = parseFloat(rxResult[2].trim())
  if (unit === "G") {
    weight *= 0.001
  }
  const price = parseFloat(rxResult[6].trim())

  return  { name, weight, price }
})

const sumOfWeights = result.reduce((acc, val) => acc + val.weight, 0)
const sumOfPrices = result.reduce((acc, val) => acc + val.price, 0)

console.log(`Sum of weights is ${(sumOfWeights).toFixed(2)}kg and sum of prices is ${sumOfPrices.toFixed(2)}$`)

