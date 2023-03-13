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
      <img src="img/coins/lseth.png" alt='lseth' />
      <span>LSETH</span>
    </>
  )
}

const DisplayVeLsd = () => {
  return (
    <>
      <img src="img/wallet-pair2.png" alt="velsd" />
      <span>VELSD</span>
    </>
  )
}

const DappDisplayToken = ({ token }) => {
  return (
    <>
      {
        token === 'ETH' ?
          <DisplayEth />
          :
          <>
            {
              token === 'LS-ETH' ?
                <DisplayLsEth />
                :
                <DisplayVeLsd />
            }
          </>
      }
    </>
  )
}

export default DappDisplayToken