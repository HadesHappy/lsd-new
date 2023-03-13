import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { INPUTTOKEN, OUTPUTTOKEN } from '../store/constants'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsdTokenLsETH, lsdTokenVeLSD } from '../utils/constants'
import { showBalance } from '../utils/common'

const ETHItem = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const trigger = useSelector(state => state.inputReducer.trigger)

  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS)

  const handleEthClick = () => {
    if (trigger === 'INPUT') {
      dispatch({ type: INPUTTOKEN, payload: 'ETH' })
      dispatch({ type: OUTPUTTOKEN, payload: 'LS-ETH' })
    }
    else {
      dispatch({ type: INPUTTOKEN, payload: 'LS-ETH' })
      dispatch({ type: OUTPUTTOKEN, payload: 'ETH' })
    }
    setIsModalVisible(false)
  }

  return (
    <li className="select-token__search-result-item" onClick={handleEthClick}>
      <img src="img/coins/eth.png" alt='eth' />
      <p className="token__info">
        <b className="token__info-name">Ethereum</b>
        <span className="token__info-abbr">ETH</span>
      </p>
      <b className="token__info-amount">{showBalance(Number(data?.displayValue))}</b>
    </li>
  )
}

const LSETHItem = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const stakeType = useSelector(state => state.inputReducer.stakeType)
  const trigger = useSelector(state => state.inputReducer.trigger)

  const { data, isLoading } = useBalance(lsdTokenLsETH)

  const handleLsEthClick = () => {
    if (stakeType === 'STAKE') {
      if (trigger === 'INPUT') {
        dispatch({ type: INPUTTOKEN, payload: 'LS-ETH' })
        dispatch({ type: OUTPUTTOKEN, payload: 'VE-LSD' })
      } else {
        dispatch({ type: INPUTTOKEN, payload: 'ETH' })
        dispatch({ type: OUTPUTTOKEN, payload: 'LS-ETH' })
      }
    } else {
      if (trigger === 'INPUT') {
        dispatch({ type: INPUTTOKEN, payload: 'LS-ETH' })
        dispatch({ type: OUTPUTTOKEN, payload: 'ETH' })
      } else {
        dispatch({ type: INPUTTOKEN, payload: 'VE-LSD' })
        dispatch({ type: OUTPUTTOKEN, payload: 'LS-ETH' })
      }
    }
    setIsModalVisible(false)
  }

  return (
    <li className="select-token__search-result-item" onClick={handleLsEthClick} >
      <img src="img/coins/lseth.png" alt='lseth' />
      <p className="token__info">
        <b className="token__info-name">LS-Eth</b>
        <span className="token__info-abbr">lsETH</span>
      </p>
      <b className="token__info-amount">{showBalance(Number(data?.displayValue))}</b>
    </li>
  )
}

const VELSDItem = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const trigger = useSelector(state => state.inputReducer.trigger)

  const { data, isLoading } = useBalance(lsdTokenVeLSD)

  const handleVeLsdClick = () => {
    if (trigger === 'INPUT') {
      dispatch({ type: INPUTTOKEN, payload: 'VE-LSD' })
      dispatch({ type: OUTPUTTOKEN, payload: 'LS-ETH' })
    }
    else {
      dispatch({ type: INPUTTOKEN, payload: 'LS-ETH' })
      dispatch({ type: OUTPUTTOKEN, payload: 'VE-LSD' })
    }
    setIsModalVisible(false)
  }

  return (
    <li className="select-token__search-result-item" onClick={handleVeLsdClick}>
      <img src="img/wallet-pair2.png" alt='velsd' />
      <p className="token__info">
        <b className="token__info-name">VE-LSD</b>
        <span className="token__info-abbr">veLSD</span>
      </p>
      <b className="token__info-amount">{showBalance(Number(data?.displayValue))}</b>
    </li>
  )
}

const SelectToken = ({ setIsModalVisible }) => {
  const stakeType = useSelector(state => state.inputReducer.stakeType)
  const trigger = useSelector(state => state.inputReducer.trigger)

  return (
    <div className="modal-window__wrapper modal-window__wrapper--select-token">
      <header className="modal-window__header">
        <h2>Select token</h2>
        <button className="modal-window__close" onClick={() => setIsModalVisible(false)}></button>
      </header>
      <ul className="select-token__search-result">
        {
          stakeType === 'STAKE' ?
            <>
              {trigger === 'INPUT' ?
                <>
                  <ETHItem setIsModalVisible={setIsModalVisible} />
                  <LSETHItem setIsModalVisible={setIsModalVisible} />
                </>
                :
                <>
                  <LSETHItem setIsModalVisible={setIsModalVisible} />
                  <VELSDItem setIsModalVisible={setIsModalVisible} />
                </>
              }
            </>
            :
            <>
              {
                trigger === 'INPUT' ?
                  <>
                    <LSETHItem setIsModalVisible={setIsModalVisible} />
                    <VELSDItem setIsModalVisible={setIsModalVisible} />
                  </>
                  :
                  <>
                    <ETHItem setIsModalVisible={setIsModalVisible} />
                    <LSETHItem setIsModalVisible={setIsModalVisible} />
                  </>
              }
            </>
        }
      </ul>
    </div>
  )
}

export default SelectToken;
