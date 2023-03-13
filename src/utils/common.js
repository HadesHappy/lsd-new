const showAddress = (address) => {
  if (address)
    return address.slice(0, 5) + '...' + address.slice(-4)
  else
    return ''
}

const showBalance = (value) => {
  if (value > 0.00001) {
    const reDot = /[.]/
    const valueString = value + ''
    const dotLocation = valueString.search(reDot)
    if (dotLocation === -1)
      return value
    else {
      return valueString.slice(0, dotLocation + 1) + valueString.slice(dotLocation + 1, dotLocation + 3)
    }
  }
  else
    return '0'
}

const showPrice = (price) => {
  if (price > 0.0001) {
    const reDot = /[.]/
    const priceString = price + ''
    const dotLocation = priceString.search(reDot)
    if (dotLocation === -1)
      return price
    else {
      return priceString.slice(0, dotLocation + 1) + priceString.slice(dotLocation + 1, dotLocation + 3)
    }
  }
  else
    return 0
}

const showRate = (rate) => {
  if (rate > 0.00000001) {
    const reDot = /[.]/
    const rateString = rate + ''
    const dotLocation = rateString.search(reDot)
    if (dotLocation === -1)
      return rate
    else {
      return rateString.slice(0, dotLocation + 1) + rateString.slice(dotLocation + 1, dotLocation + 7)
    }
  }
  else
    return 0
}

const showEth = (balance) => {
  if (balance) {
    const reDot = /[.]/
    const balanceString = balance + ''
    const dotLocation = balanceString.search(reDot)
    if (dotLocation === -1)
      return balance
    else {
      return balanceString.slice(0, dotLocation)
    }
  }
  else
    return 0
}
export {
  showAddress,
  showBalance,
  showPrice,
  showRate,
  showEth,
} 