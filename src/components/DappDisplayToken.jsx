const DisplayEth = () => {
  return (
    <>
      <img src="img/coins/eth.png" alt='eth' />
      <span>ETH</span>
    </>
  )
}

const DisplayLsEth = () => {
  return (
    <>
      <img src="img/coins/LS-ETH.png" alt='lseth' />
      <span>LSETH</span>
    </>
  )
}

const DisplayVeLsd = () => {
  return (
    <>
      <img src="img/coins/veLSD.png" alt="velsd" />
      <span>VELSD</span>
    </>
  )
}

const DisplayLSD = () => {
  return (
    <>
      <img src="img/coins/lseth.png" alt="lsd" />
      <span>LSD</span>
    </>
  )
}

const DappDisplayToken = ({ token }) => {
  let string
  if (token === 'ETH')
    string = (<DisplayEth />)
  else if (token === 'LS-ETH')
    string = (<DisplayLsEth />)
  else if (token === 'LSD')
    string = (<DisplayLSD />)
  else
    string = (<DisplayVeLsd />)
  return (
    string
  )
}

export default DappDisplayToken