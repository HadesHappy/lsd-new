import React, { useState, useEffect } from 'react'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { showBalance, showPrice, showRate } from '../utils/common'
import { INPUT_CHANGE, OUTPUT_CHANGE, TRIGGER } from '../store/constants'
import { useDispatch, useSelector } from 'react-redux'
import { usePrice } from '../hooks/usePrice'
import { useExchangeRate } from '../hooks/useExchangeRate'
import { useStateInfo } from '../hooks/useStateInfo'
import { lsdTokenLsETH, lsdTokenVeLSD } from '../utils/constants'
import { useLsdBalance } from '../hooks/useLsdBalance'

import DappDisplayToken from './DappDisplayToken'

const DappSectionWithdraw = ({ setIsModalVisible }) => {
  const { inputToken, outputToken, stakeType, inputValue, outputValue } = useStateInfo()
  const { ethPrice } = usePrice()
  const exchangeRate = useExchangeRate()
  const [tokenPrice, setTokenPrice] = useState(0)
  const { rate } = useLsdBalance()

  let tokenAddress
  if (inputToken === 'ETH') {
    tokenAddress = NATIVE_TOKEN_ADDRESS
  } else if (inputToken === 'VE-LSD') {
    tokenAddress = lsdTokenVeLSD
  } else {
    tokenAddress = lsdTokenLsETH
  }

  const { data, isLoading } = useBalance(tokenAddress)
  const [amount, setAmount] = useState()

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setAmount(e.target.value)
    dispatch({ type: INPUT_CHANGE, payload: e.target.value })
    if (inputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }

  useEffect(() => {
    setAmount(outputValue / exchangeRate)
    if (inputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }, [outputValue])

  useEffect(() => {
    setAmount(0)
    dispatch({ type: INPUT_CHANGE, payload: 0 })
    if (inputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }, [inputToken])

  const handleClick = () => {
    setIsModalVisible(true)
    dispatch({ type: TRIGGER, payload: 'INPUT' })
  }

  const handleMaxClick = () => {
    setAmount(data.displayValue)
    dispatch({ type: INPUT_CHANGE, payload: data?.displayValue })
    if (inputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }

  return (
    <div className="dapp-section__withdraw">
      <header className="dapp-section__withdraw-header">
        <p className="dapp-section__withdraw-title">Stake {inputToken}</p>
        <p className="dapp-section__withdraw-balance">
          Balance: <span>{showBalance(data?.displayValue)} {inputToken}</span>
        </p>
        <button className="dapp-section__withdraw-max" onClick={handleMaxClick}>Max</button>
      </header>
      <div className="dapp-section__withdraw-actions">
        <input type="number" placeholder="0,000.000000" value={amount || 0} onChange={handleChange} />
        <div className="dapp-section__withdraw-currency">
          <button
            className="dapp-section__withdraw-currency-select currency-select"
            onClick={handleClick}
          >
            <DappDisplayToken token={inputToken} />
          </button>
        </div>
      </div>
      <p className="dapp-section__withdraw-count">${amount * tokenPrice || 0}</p>
    </div>
  )
}

export default DappSectionWithdraw;
