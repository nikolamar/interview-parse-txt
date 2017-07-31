// @flow weak

const fs = require('fs')

let data = fs.readFileSync("./data.txt", "utf8")

// split file into lines
const rows = data.split("\n")

// remove first two rows
rows.splice(0,2)

// nice regex using https://regex101.com/

const result = rows.map((val, i) => {
  // extract values into groups
  const regexResult = (/(\b[A-Z][a-z]+[\s()[a-z]+]?)(\.?\d?\.?\d+)(\s?[kg]+)(\s+)(\$)(\d?.?\d+)/g).exec(val)

  // take values from regex groups
  let mlt = 1
  const name = regexResult[1].trim()
  const unit = regexResult[3].trim().toUpperCase()
  if (unit === "KG") mlt = 1000
  const weight = parseFloat(regexResult[2].trim()) * mlt
  const currency = regexResult[5]
  const price = parseFloat(regexResult[6].trim())

  return  { name, weight, unit, currency, price }
})

const sumOfWeights = result.reduce((acc, val) => acc + val.weight, 0)
const sumOfPrices = result.reduce((acc, val) => acc + val.price, 0)

console.log(`Sum of weights is ${sumOfWeights}g or ${(sumOfWeights/1000).toFixed(2)}kg and sum of prices is ${sumOfPrices.toFixed(2)}$`)

