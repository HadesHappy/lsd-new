import React, { useState, useEffect } from 'react'
import DappSectionHeader from './DappSectionHeader'
import DappSectionReceive from './DappSectionReceive'
import DappSectionWithdraw from './DappSectionWithdraw'
import { stake, unstake, deposit, withdraw } from '../contracts/stake'
import { useSelector } from 'react-redux'
import { useAddress } from '@thirdweb-dev/react'
import { toast } from 'react-hot-toast'
import { useInfo } from '../hooks/useInfo'

const DappActions = ({ setIsModalVisible, isModalVisible }) => {
  const stakeType = useSelector(state => state.inputReducer.stakeType)
  const inputToken = useSelector(state => state.inputReducer.inputToken)
  const inputValue = useSelector(state => state.inputReducer.inputValue)

  const address = useAddress()
  const { minimum } = useInfo()

  const [text, setText] = useState('Stake now')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {

    if (address) {
      if (inputValue === 0) {
        toast.error(`Enter an amount to ${stakeType}`)
      }
      else {
        if (stakeType === 'STAKE') {
          if (inputToken === 'ETH') {
            if (inputValue < minimum) {
              toast.error(`minimum deposit amount is ${minimum} ETH`)
            }
            else {
              setLoading(true)
              const response = await deposit(inputValue)
              if (response.status === 'Success') {
                toast.success('Succeed.')
              } else {
                if (response.status === 'Error')
                  toast.error(`${response.status}: ${response.error}.`)
                else
                  toast.error('Transaction failed by unknown reason.')
              }
              setLoading(false)
            }
          }
          else {
            setLoading(true)
            const response = await stake(inputValue, address)
            if (response.status === 'Success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: ${response.error}.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
        }
        else {
          if (inputToken === 'LS-ETH') {
            setLoading(true)
            const response = await withdraw(inputValue)
            if (response.status === 'Success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: ${response.error}.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
          else {
            setLoading(true)
            const response = await unstake(inputValue)
            if (response.status === 'Success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: ${response.error}.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
        }
      }
    } else {
      toast.error('Wallet is not connected')
    }
  }

  useEffect(() => {
    if (stakeType === 'STAKE')
      setText('Stake now')
    else
      setText('Unstake now')
  }, [stakeType])

  return (
    <div className='dapp-section__actions'>
      <div className="dapp-section__actions-wrapper">
        <DappSectionHeader />
        <DappSectionWithdraw setIsModalVisible={setIsModalVisible} />
        <DappSectionReceive setIsModalVisible={setIsModalVisible} />
      </div>
      <button type="button" className="dapp-section__submit" onClick={handleClick}>{text}</button>
    </div>
  )
}

export default DappActions;
